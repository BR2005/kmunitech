package com.kmunitech.backend.service;

import com.kmunitech.backend.dto.CourseDTOs.*;
import com.kmunitech.backend.entity.Course;
import com.kmunitech.backend.entity.Lesson;
import com.kmunitech.backend.entity.User;
import com.kmunitech.backend.exception.ForbiddenException;
import com.kmunitech.backend.exception.ResourceNotFoundException;
import com.kmunitech.backend.exception.ValidationException;
import com.kmunitech.backend.repository.CourseRepository;
import com.kmunitech.backend.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {
    
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    
    public List<CourseListDTO> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(CourseListDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    public CourseDTO getCourseById(UUID id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        return CourseDTO.fromEntity(course);
    }
    
    public List<CourseListDTO> getFeaturedCourses() {
        return courseRepository.findByIsFeaturedTrue().stream()
                .map(CourseListDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    public List<CourseListDTO> getInstructorCourses(UUID instructorId) {
        return courseRepository.findByInstructorId(instructorId).stream()
                .map(CourseListDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public CourseDTO createCourse(CreateCourseRequest request, User instructor) {
        if (instructor.getRole() != User.UserRole.INSTRUCTOR) {
            throw new ForbiddenException("Only instructors can create courses");
        }
        
        Course course = new Course();
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setThumbnail(request.getThumbnail());
        course.setPrice(request.getPrice());
        course.setLevel(parseCourseLevel(request.getLevel()));
        course.setCategory(parseCourseCategory(request.getCategory()));
        course.setTags(request.getTags());
        course.setInstructor(instructor);
        course.setRating(0.0);
        course.setStudentsCount(0);
        course.setIsFeatured(false);
        
        // Calculate total duration from lessons
        int totalDuration = 0;
        if (request.getLessons() != null && !request.getLessons().isEmpty()) {
            for (CreateLessonRequest lessonReq : request.getLessons()) {
                totalDuration += lessonReq.getDuration();
            }
        }
        course.setTotalDuration(totalDuration);
        
        course = courseRepository.save(course);
        
        // Create lessons
        if (request.getLessons() != null) {
            for (CreateLessonRequest lessonReq : request.getLessons()) {
                Lesson lesson = new Lesson();
                lesson.setTitle(lessonReq.getTitle());
                lesson.setDescription(lessonReq.getDescription());
                lesson.setDuration(lessonReq.getDuration());
                lesson.setOrder(lessonReq.getOrder());
                lesson.setIsPreview(lessonReq.getIsPreview() != null ? lessonReq.getIsPreview() : false);
                lesson.setVideoUrl(lessonReq.getVideoUrl());
                lesson.setContent(lessonReq.getContent());
                lesson.setCourse(course);
                lessonRepository.save(lesson);
            }
        }
        
        return CourseDTO.fromEntity(courseRepository.findById(course.getId()).get());
    }
    
    @Transactional
    public CourseDTO updateCourse(UUID id, UpdateCourseRequest request, User user) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        
        // Check permissions: instructor can only update their own courses, admin can update any
        if (user.getRole() == User.UserRole.INSTRUCTOR && !course.getInstructor().getId().equals(user.getId())) {
            throw new ForbiddenException("You can only update your own courses");
        }
        
        if (request.getTitle() != null) course.setTitle(request.getTitle());
        if (request.getDescription() != null) course.setDescription(request.getDescription());
        if (request.getThumbnail() != null) course.setThumbnail(request.getThumbnail());
        if (request.getPrice() != null) course.setPrice(request.getPrice());
        if (request.getLevel() != null) course.setLevel(parseCourseLevel(request.getLevel()));
        if (request.getCategory() != null) course.setCategory(parseCourseCategory(request.getCategory()));
        if (request.getTags() != null) course.setTags(request.getTags());
        if (request.getIsFeatured() != null && user.getRole() == User.UserRole.ADMIN) {
            course.setIsFeatured(request.getIsFeatured());
        }
        
        course = courseRepository.save(course);
        return CourseDTO.fromEntity(course);
    }
    
    @Transactional
    public void deleteCourse(UUID id, User user) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        
        // Check permissions
        if (user.getRole() == User.UserRole.INSTRUCTOR && !course.getInstructor().getId().equals(user.getId())) {
            throw new ForbiddenException("You can only delete your own courses");
        }
        
        courseRepository.delete(course);
    }
    
    private Course.CourseLevel parseCourseLevel(String level) {
        try {
            return Course.CourseLevel.valueOf(level.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ValidationException("Invalid course level: " + level);
        }
    }
    
    private Course.CourseCategory parseCourseCategory(String category) {
        try {
            String normalized = category.toUpperCase().replace("-", "_");
            return Course.CourseCategory.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            throw new ValidationException("Invalid course category: " + category);
        }
    }
}
