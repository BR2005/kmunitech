package com.kmunitech.backend.service;

import com.kmunitech.backend.dto.AuthDTOs.*;
import com.kmunitech.backend.entity.User;
import com.kmunitech.backend.exception.ValidationException;
import com.kmunitech.backend.repository.UserRepository;
import com.kmunitech.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    
    @Transactional
    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception e) {
            return new AuthResponse(false, "Invalid email or password.", null, null);
        }
        
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ValidationException("User not found"));
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtUtil.generateToken(userDetails);
        
        return new AuthResponse(true, "Login successful!", UserDTO.fromEntity(user), token);
    }
    
    @Transactional
    public AuthResponse signup(SignupRequest request) {
        // Validate passwords match
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return new AuthResponse(false, "Passwords do not match.", null, null);
        }
        
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(false, "Email already registered.", null, null);
        }
        
        // Validate role (only student and instructor can signup)
        if (!request.getRole().equalsIgnoreCase("student") && 
            !request.getRole().equalsIgnoreCase("instructor")) {
            return new AuthResponse(false, "Invalid role. Only 'student' or 'instructor' allowed.", null, null);
        }
        
        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.UserRole.valueOf(request.getRole().toUpperCase()));
        
        user = userRepository.save(user);
        
        // Generate token
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails);
        
        return new AuthResponse(true, "Account created successfully!", UserDTO.fromEntity(user), token);
    }
}
