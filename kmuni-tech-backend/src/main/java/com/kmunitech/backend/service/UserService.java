package com.kmunitech.backend.service;

import com.kmunitech.backend.dto.AuthDTOs.*;
import com.kmunitech.backend.entity.User;
import com.kmunitech.backend.exception.ForbiddenException;
import com.kmunitech.backend.exception.ResourceNotFoundException;
import com.kmunitech.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    public UserDTO getUserById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return UserDTO.fromEntity(user);
    }
    
    @Transactional
    public UserDTO updateProfile(User user, UpdateProfileRequest request) {
        if (request.getName() != null) {
            user.setName(request.getName());
        }
        if (request.getAvatar() != null) {
            user.setAvatar(request.getAvatar());
        }
        if (request.getBio() != null) {
            user.setBio(request.getBio());
        }
        
        user = userRepository.save(user);
        return UserDTO.fromEntity(user);
    }
    
    @Transactional
    public void resetPassword(UUID userId, String newPassword, User admin) {
        if (admin.getRole() != User.UserRole.ADMIN) {
            throw new ForbiddenException("Only admins can reset passwords");
        }
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
    
    @Transactional
    public void deleteUser(UUID userId, User admin) {
        if (admin.getRole() != User.UserRole.ADMIN) {
            throw new ForbiddenException("Only admins can delete users");
        }
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        userRepository.delete(user);
    }
}
