package com.kmunitech.backend.service;

import com.kmunitech.backend.dto.EnrollmentDTO;
import com.kmunitech.backend.entity.Course;
import com.kmunitech.backend.entity.Enrollment;
import com.kmunitech.backend.entity.User;
import com.kmunitech.backend.exception.ForbiddenException;
import com.kmunitech.backend.exception.ResourceNotFoundException;
import com.kmunitech.backend.exception.ValidationException;
import com.kmunitech.backend.repository.CourseRepository;
import com.kmunitech.backend.repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentService {
    
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final ActivityService activityService;
    
    @Transactional
    public EnrollmentDTO enrollInCourse(UUID courseId, User student) {
        if (student.getRole() != User.UserRole.STUDENT) {
            throw new ForbiddenException("Only students can enroll in courses");
        }
        
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));
        
        // Check if already enrolled
        if (enrollmentRepository.existsByStudentIdAndCourseId(student.getId(), courseId)) {
            throw new ValidationException("You are already enrolled in this course");
        }
        
        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setProgress(0);
        
        enrollment = enrollmentRepository.save(enrollment);
        
        // Update course students count
        course.setStudentsCount(course.getStudentsCount() + 1);
        courseRepository.save(course);
        
        // Create activity
        activityService.createActivity(
                student,
                "enrollment",
                "Enrolled in " + course.getTitle(),
                "Started learning " + course.getTitle()
        );
        
        return EnrollmentDTO.fromEntity(enrollment);
    }
    
    public List<EnrollmentDTO> getStudentEnrollments(UUID studentId) {
        return enrollmentRepository.findByStudentId(studentId).stream()
                .map(EnrollmentDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public EnrollmentDTO updateProgress(UUID enrollmentId, int progress, User student) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with id: " + enrollmentId));
        
        // Check if the enrollment belongs to the student
        if (!enrollment.getStudent().getId().equals(student.getId())) {
            throw new ForbiddenException("You can only update your own enrollment progress");
        }
        
        if (progress < 0 || progress > 100) {
            throw new ValidationException("Progress must be between 0 and 100");
        }
        
        enrollment.setProgress(progress);
        
        // Mark as completed if progress is 100
        if (progress == 100 && enrollment.getCompletedAt() == null) {
            enrollment.setCompletedAt(LocalDateTime.now());
            
            // Create completion activity
            activityService.createActivity(
                    student,
                    "completion",
                    "Completed " + enrollment.getCourse().getTitle(),
                    "Successfully completed the course"
            );
        }
        
        enrollment = enrollmentRepository.save(enrollment);
        return EnrollmentDTO.fromEntity(enrollment);
    }
    
    public boolean isEnrolled(UUID userId, UUID courseId) {
        return enrollmentRepository.existsByStudentIdAndCourseId(userId, courseId);
    }
}
