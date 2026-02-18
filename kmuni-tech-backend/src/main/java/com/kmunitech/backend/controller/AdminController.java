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
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    
    private final UserService userService;
    private final CourseService courseService;
    private final CustomUserDetailsService userDetailsService;
    
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
    
    @PostMapping("/users/{id}/reset-password")
    public ResponseEntity<Map<String, String>> resetUserPassword(
            @PathVariable UUID id,
            @Valid @RequestBody ResetPasswordRequest request,
            Authentication authentication) {
        var admin = userDetailsService.getUserByEmail(authentication.getName());
        userService.resetPassword(id, request.getNewPassword(), admin);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Password reset successfully");
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(
            @PathVariable UUID id,
            Authentication authentication) {
        var admin = userDetailsService.getUserByEmail(authentication.getName());
        userService.deleteUser(id, admin);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "User deleted successfully");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/courses")
    public ResponseEntity<List<CourseListDTO>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }
    
    @PutMapping("/courses/{id}")
    public ResponseEntity<CourseDTO> updateCourse(
            @PathVariable UUID id,
            @RequestBody UpdateCourseRequest request,
            Authentication authentication) {
        var admin = userDetailsService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(courseService.updateCourse(id, request, admin));
    }
    
    @DeleteMapping("/courses/{id}")
    public ResponseEntity<Map<String, String>> deleteCourse(
            @PathVariable UUID id,
            Authentication authentication) {
        var admin = userDetailsService.getUserByEmail(authentication.getName());
        courseService.deleteCourse(id, admin);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Course deleted successfully");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        List<UserDTO> users = userService.getAllUsers();
        List<CourseListDTO> courses = courseService.getAllCourses();
        
        long studentCount = users.stream()
                .filter(u -> u.getRole().equals("student"))
                .count();
        
        long instructorCount = users.stream()
                .filter(u -> u.getRole().equals("instructor"))
                .count();
        
        int totalEnrollments = courses.stream()
                .mapToInt(CourseListDTO::getStudentsCount)
                .sum();
        
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalUsers", users.size());
        analytics.put("totalStudents", studentCount);
        analytics.put("totalInstructors", instructorCount);
        analytics.put("totalCourses", courses.size());
        analytics.put("totalEnrollments", totalEnrollments);
        
        return ResponseEntity.ok(analytics);
    }
}
