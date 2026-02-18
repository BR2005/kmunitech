package com.kmunitech.backend.service;

import com.kmunitech.backend.entity.Activity;
import com.kmunitech.backend.entity.User;
import com.kmunitech.backend.repository.ActivityRepository;
import com.kmunitech.backend.dto.ActivityDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {
    
    private final ActivityRepository activityRepository;
    
    @Transactional
    public void createActivity(User user, String type, String title, String description) {
        Activity activity = new Activity();
        activity.setUser(user);
        activity.setType(Activity.ActivityType.valueOf(type.toUpperCase()));
        activity.setTitle(title);
        activity.setDescription(description);
        activityRepository.save(activity);
    }
    
    public List<ActivityDTO> getUserActivities(UUID userId) {
        return activityRepository.findByUserIdOrderByTimestampDesc(userId).stream()
                .map(ActivityDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
