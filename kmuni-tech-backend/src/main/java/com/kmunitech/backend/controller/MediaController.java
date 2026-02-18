package com.kmunitech.backend.controller;

import com.kmunitech.backend.entity.Lesson;
import com.kmunitech.backend.entity.User;
import com.kmunitech.backend.exception.ForbiddenException;
import com.kmunitech.backend.exception.ResourceNotFoundException;
import com.kmunitech.backend.exception.ValidationException;
import com.kmunitech.backend.repository.EnrollmentRepository;
import com.kmunitech.backend.repository.LessonRepository;
import com.kmunitech.backend.security.CustomUserDetailsService;
import com.kmunitech.backend.service.MediaSigningService;
import com.kmunitech.backend.service.VideoStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.bind.annotation.*;

import org.springframework.core.io.support.ResourceRegion;

import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/media")
@RequiredArgsConstructor
public class MediaController {

    private final LessonRepository lessonRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CustomUserDetailsService userDetailsService;
    private final VideoStorageService videoStorageService;
    private final MediaSigningService mediaSigningService;

    @Value("${media.playback-ttl-seconds:600}")
    private long playbackTtlSeconds;

    @GetMapping("/lessons/{lessonId}/playback")
    public ResponseEntity<Map<String, String>> getLessonPlaybackUrl(
            @PathVariable UUID lessonId,
            org.springframework.security.core.Authentication authentication) {

        var user = userDetailsService.getUserByEmail(authentication.getName());
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));

        authorizeLessonAccess(user, lesson);

        String videoUrl = lesson.getVideoUrl();
        if (videoUrl == null || videoUrl.isBlank()) {
            throw new ValidationException("Lesson has no video");
        }

        // External URL: return directly
        if (videoUrl.startsWith("http://") || videoUrl.startsWith("https://")) {
            return ResponseEntity.ok(Map.of("url", videoUrl));
        }

        // Local key stored as "local:<key>"
        if (!videoUrl.startsWith("local:")) {
            throw new ValidationException("Invalid lesson video URL");
        }

        String key = videoUrl.substring("local:".length());
        long exp = Instant.now().getEpochSecond() + playbackTtlSeconds;
        String payload = lessonId + ":" + exp + ":" + key;
        String sig = mediaSigningService.sign(payload);

        String url = String.format("/api/media/lessons/%s/stream?exp=%d&sig=%s&key=%s", lessonId, exp, sig, key);
        return ResponseEntity.ok(Map.of("url", url));
    }

    @GetMapping("/lessons/{lessonId}/stream")
    public ResponseEntity<ResourceRegion> streamLessonVideo(
            @PathVariable UUID lessonId,
            @RequestParam("exp") long exp,
            @RequestParam("sig") String sig,
            @RequestParam("key") String key,
            HttpServletRequest request) throws IOException {

        long now = Instant.now().getEpochSecond();
        if (exp <= now) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        String payload = lessonId + ":" + exp + ":" + key;
        if (!mediaSigningService.verify(payload, sig)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Path path = videoStorageService.resolveKey(key);
        if (!Files.exists(path)) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(path);
        MediaType mediaType = MediaTypeFactory.getMediaType(resource).orElse(MediaType.APPLICATION_OCTET_STREAM);

        ServletServerHttpRequest serverRequest = new ServletServerHttpRequest(request);
        List<HttpRange> ranges = serverRequest.getHeaders().getRange();
        long contentLength = resource.contentLength();

        ResourceRegion region;
        HttpStatus status;

        if (ranges != null && !ranges.isEmpty()) {
            HttpRange range = ranges.get(0);
            long start = range.getRangeStart(contentLength);
            long end = range.getRangeEnd(contentLength);
            long rangeLength = Math.min(1024 * 1024, end - start + 1);
            region = new ResourceRegion(resource, start, rangeLength);
            status = HttpStatus.PARTIAL_CONTENT;
        } else {
            long rangeLength = Math.min(1024 * 1024, contentLength);
            region = new ResourceRegion(resource, 0, rangeLength);
            status = HttpStatus.OK;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        headers.setCacheControl(CacheControl.noStore());
        headers.set("Accept-Ranges", "bytes");

        return ResponseEntity.status(status).headers(headers).body(region);
    }

    private void authorizeLessonAccess(User user, Lesson lesson) {
        if (user.getRole() == User.UserRole.ADMIN) return;

        var course = lesson.getCourse();

        if (user.getRole() == User.UserRole.INSTRUCTOR) {
            if (course.getInstructor() != null && course.getInstructor().getId().equals(user.getId())) return;
            throw new ForbiddenException("You can only access your own course videos");
        }

        if (user.getRole() == User.UserRole.STUDENT) {
            boolean enrolled = enrollmentRepository.existsByStudentIdAndCourseId(user.getId(), course.getId());
            if (enrolled) return;
            throw new ForbiddenException("You must be enrolled to access this video");
        }

        throw new ForbiddenException("Access denied");
    }
}
