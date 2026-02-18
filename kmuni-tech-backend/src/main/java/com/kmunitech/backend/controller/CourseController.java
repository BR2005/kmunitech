package com.kmunitech.backend.controller;

import com.kmunitech.backend.dto.CourseDTOs.*;
import com.kmunitech.backend.dto.EnrollmentDTO;
import com.kmunitech.backend.security.CustomUserDetailsService;
import com.kmunitech.backend.service.CourseService;
import com.kmunitech.backend.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {
    
    private final CourseService courseService;
    private final EnrollmentService enrollmentService;
    private final CustomUserDetailsService userDetailsService;
    
    @GetMapping
    public ResponseEntity<List<CourseListDTO>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable UUID id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }
    
    @GetMapping("/featured")
    public ResponseEntity<List<CourseListDTO>> getFeaturedCourses() {
        return ResponseEntity.ok(courseService.getFeaturedCourses());
    }
    
    @PostMapping("/{id}/enroll")
    public ResponseEntity<EnrollmentDTO> enrollInCourse(
            @PathVariable UUID id,
            Authentication authentication) {
        var user = userDetailsService.getUserByEmail(authentication.getName());
        EnrollmentDTO enrollment = enrollmentService.enrollInCourse(id, user);
        return ResponseEntity.ok(enrollment);
    }
}
