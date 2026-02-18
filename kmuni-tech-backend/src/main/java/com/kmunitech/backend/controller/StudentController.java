package com.kmunitech.backend.controller;

import com.kmunitech.backend.dto.ActivityDTO;
import com.kmunitech.backend.dto.AuthDTOs.*;
import com.kmunitech.backend.dto.EnrollmentDTO;
import com.kmunitech.backend.security.CustomUserDetailsService;
import com.kmunitech.backend.service.ActivityService;
import com.kmunitech.backend.service.EnrollmentService;
import com.kmunitech.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {
    
    private final EnrollmentService enrollmentService;
    private final ActivityService activityService;
    private final UserService userService;
    private final CustomUserDetailsService userDetailsService;
    
    @GetMapping("/courses")
    public ResponseEntity<List<EnrollmentDTO>> getEnrolledCourses(Authentication authentication) {
        var user = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(enrollmentService.getStudentEnrollments(user.getId()));
    }
    
    @GetMapping("/activities")
    public ResponseEntity<List<ActivityDTO>> getActivities(Authentication authentication) {
        var user = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(activityService.getUserActivities(user.getId()));
    }
    
    @PutMapping("/profile")
    public ResponseEntity<UserDTO> updateProfile(
            @RequestBody UpdateProfileRequest request,
            Authentication authentication) {
        var user = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(userService.updateProfile(user, request));
    }
    
    @PutMapping("/enrollments/{id}/progress")
    public ResponseEntity<EnrollmentDTO> updateProgress(
            @PathVariable UUID id,
            @RequestBody Map<String, Integer> body,
            Authentication authentication) {
        var user = userDetailsService.getUserByEmail(authentication.getName());
        int progress = body.get("progress");
        return ResponseEntity.ok(enrollmentService.updateProgress(id, progress, user));
    }
}
