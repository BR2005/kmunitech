package com.kmunitech.backend.dto;

import com.kmunitech.backend.entity.Course;
import com.kmunitech.backend.entity.Lesson;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class CourseDTOs {
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CourseDTO {
        private UUID id;
        private String title;
        private String description;
        private String thumbnail;
        private UUID instructorId;
        private String instructorName;
        private BigDecimal price;
        private String level;
        private String category;
        private List<String> tags;
        private List<LessonDTO> lessons;
        private Integer totalDuration;
        private Double rating;
        private Integer studentsCount;
        private Boolean isFeatured;
        private LocalDateTime createdAt;
        
        public static CourseDTO fromEntity(Course course) {
            return new CourseDTO(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getThumbnail(),
                course.getInstructor().getId(),
                course.getInstructor().getName(),
                course.getPrice(),
                course.getLevel().name().toLowerCase(),
                course.getCategory().name().toLowerCase().replace("_", "-"),
                course.getTags(),
                course.getLessons().stream()
                    .map(LessonDTO::fromEntity)
                    .collect(Collectors.toList()),
                course.getTotalDuration(),
                course.getRating(),
                course.getStudentsCount(),
                course.getIsFeatured(),
                course.getCreatedAt()
            );
        }
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CourseListDTO {
        private UUID id;
        private String title;
        private String description;
        private String thumbnail;
        private String instructorName;
        private BigDecimal price;
        private String level;
        private String category;
        private List<String> tags;
        private Integer totalDuration;
        private Double rating;
        private Integer studentsCount;
        private Boolean isFeatured;
        
        public static CourseListDTO fromEntity(Course course) {
            return new CourseListDTO(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getThumbnail(),
                course.getInstructor().getName(),
                course.getPrice(),
                course.getLevel().name().toLowerCase(),
                course.getCategory().name().toLowerCase().replace("_", "-"),
                course.getTags(),
                course.getTotalDuration(),
                course.getRating(),
                course.getStudentsCount(),
                course.getIsFeatured()
            );
        }
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LessonDTO {
        private UUID id;
        private String title;
        private String description;
        private Integer duration;
        private Integer order;
        private Boolean isPreview;
        
        public static LessonDTO fromEntity(Lesson lesson) {
            return new LessonDTO(
                lesson.getId(),
                lesson.getTitle(),
                lesson.getDescription(),
                lesson.getDuration(),
                lesson.getOrder(),
                lesson.getIsPreview()
            );
        }
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateCourseRequest {
        @NotBlank(message = "Title is required")
        @Size(min = 5, max = 200, message = "Title must be between 5 and 200 characters")
        private String title;
        
        @NotBlank(message = "Description is required")
        @Size(min = 20, max = 2000, message = "Description must be between 20 and 2000 characters")
        private String description;
        
        private String thumbnail;
        
        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.0", message = "Price must be non-negative")
        private BigDecimal price;
        
        @NotBlank(message = "Level is required")
        private String level; // "beginner", "intermediate", "advanced"
        
        @NotBlank(message = "Category is required")
        private String category;
        
        private List<String> tags;
        private List<CreateLessonRequest> lessons;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateLessonRequest {
        @NotBlank(message = "Lesson title is required")
        private String title;
        
        private String description;
        
        @NotNull(message = "Duration is required")
        @Min(value = 1, message = "Duration must be at least 1 minute")
        private Integer duration;
        
        @NotNull(message = "Order is required")
        private Integer order;
        
        private Boolean isPreview = false;
        private String videoUrl;
        private String content;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateCourseRequest {
        private String title;
        private String description;
        private String thumbnail;
        private BigDecimal price;
        private String level;
        private String category;
        private List<String> tags;
        private Boolean isFeatured;
    }
}
