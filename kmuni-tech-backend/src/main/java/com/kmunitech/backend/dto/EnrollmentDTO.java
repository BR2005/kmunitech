package com.kmunitech.backend.dto;

import com.kmunitech.backend.entity.Enrollment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentDTO {
    private UUID id;
    private UUID courseId;
    private String courseTitle;
    private String courseThumbnail;
    private String instructorName;
    private Integer progress;
    private LocalDateTime enrolledAt;
    private LocalDateTime completedAt;
    
    public static EnrollmentDTO fromEntity(Enrollment enrollment) {
        return new EnrollmentDTO(
            enrollment.getId(),
            enrollment.getCourse().getId(),
            enrollment.getCourse().getTitle(),
            enrollment.getCourse().getThumbnail(),
            enrollment.getCourse().getInstructor().getName(),
            enrollment.getProgress(),
            enrollment.getEnrolledAt(),
            enrollment.getCompletedAt()
        );
    }
}
