package com.kmunitech.backend.dto;

import com.kmunitech.backend.entity.Activity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityDTO {
    private UUID id;
    private String type;
    private String title;
    private String description;
    private LocalDateTime timestamp;
    
    public static ActivityDTO fromEntity(Activity activity) {
        return new ActivityDTO(
            activity.getId(),
            activity.getType().name().toLowerCase(),
            activity.getTitle(),
            activity.getDescription(),
            activity.getTimestamp()
        );
    }
}
