package com.kmunitech.backend.service;

import com.kmunitech.backend.exception.ValidationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.UUID;

@Service
public class VideoStorageService {

    private final Path storageRoot;

    public VideoStorageService(@Value("${media.storage-dir:./uploads}") String storageDir) {
        this.storageRoot = Paths.get(storageDir).toAbsolutePath().normalize();
    }

    public String saveLessonVideo(UUID lessonId, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ValidationException("Video file is required");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.toLowerCase().startsWith("video/")) {
            throw new ValidationException("Only video files are allowed");
        }

        String original = StringUtils.cleanPath(file.getOriginalFilename() == null ? "video" : file.getOriginalFilename());
        original = original.replaceAll("[^a-zA-Z0-9._-]", "_");

        String filename = UUID.randomUUID() + "-" + original;
        Path lessonDir = storageRoot.resolve(Paths.get("lessons", lessonId.toString())).normalize();

        try {
            Files.createDirectories(lessonDir);
            Path target = lessonDir.resolve(filename).normalize();

            // Prevent path traversal
            if (!target.startsWith(lessonDir)) {
                throw new ValidationException("Invalid file path");
            }

            try (InputStream in = file.getInputStream()) {
                Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
            }

            // Store a relative key (not an absolute path)
            return Paths.get("lessons", lessonId.toString(), filename).toString().replace('\\', '/');
        } catch (IOException e) {
            throw new RuntimeException("Failed to store video file", e);
        }
    }

    public Path resolveKey(String key) {
        if (key == null || key.isBlank()) {
            throw new ValidationException("Video not available");
        }

        Path resolved = storageRoot.resolve(key).normalize();
        if (!resolved.startsWith(storageRoot)) {
            throw new ValidationException("Invalid media key");
        }

        return resolved;
    }
}
