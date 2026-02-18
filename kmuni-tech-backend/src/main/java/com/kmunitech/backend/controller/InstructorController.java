package com.kmunitech.backend.controller;

import com.kmunitech.backend.dto.AuthDTOs.*;
import com.kmunitech.backend.dto.CourseDTOs.*;
import com.kmunitech.backend.security.CustomUserDetailsService;
import com.kmunitech.backend.service.CourseService;
import com.kmunitech.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/instructor")
@RequiredArgsConstructor
public class InstructorController {
    
    private final CourseService courseService;
    private final UserService userService;
    private final CustomUserDetailsService userDetailsService;
    
    @GetMapping("/courses")
    public ResponseEntity<List<CourseListDTO>> getInstructorCourses(Authentication authentication) {
        var user = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(courseService.getInstructorCourses(user.getId()));
    }
    
    @PostMapping("/courses")
    public ResponseEntity<CourseDTO> createCourse(
            @Valid @RequestBody CreateCourseRequest request,
            Authentication authentication) {
        var user = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(courseService.createCourse(request, user));
    }
    
    @PutMapping("/courses/{id}")
    public ResponseEntity<CourseDTO> updateCourse(
            @PathVariable UUID id,
            @RequestBody UpdateCourseRequest request,
            Authentication authentication) {
        var user = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(courseService.updateCourse(id, request, user));
    }
    
    @DeleteMapping("/courses/{id}")
    public ResponseEntity<Map<String, String>> deleteCourse(
            @PathVariable UUID id,
            Authentication authentication) {
        var user = userDetailsService.getUserByEmail(authentication.getName());
        courseService.deleteCourse(id, user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Course deleted successfully");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics(Authentication authentication) {
        var user = userDetailsService.getUserByEmail(authentication.getName());
        List<CourseListDTO> courses = courseService.getInstructorCourses(user.getId());
        
        int totalStudents = courses.stream()
                .mapToInt(CourseListDTO::getStudentsCount)
                .sum();
        
        double avgRating = courses.stream()
                .mapToDouble(CourseListDTO::getRating)
                .average()
                .orElse(0.0);
        
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalCourses", courses.size());
        analytics.put("totalStudents", totalStudents);
        analytics.put("averageRating", Math.round(avgRating * 10.0) / 10.0);
        
        return ResponseEntity.ok(analytics);
    }
    
    @PutMapping("/profile")
    public ResponseEntity<UserDTO> updateProfile(
            @RequestBody UpdateProfileRequest request,
            Authentication authentication) {
        var user = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(userService.updateProfile(user, request));
    }
}
