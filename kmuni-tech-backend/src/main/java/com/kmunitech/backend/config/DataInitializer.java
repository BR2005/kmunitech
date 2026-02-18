package com.kmunitech.backend.config;

import com.kmunitech.backend.entity.*;
import com.kmunitech.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already initialized. Skipping data seeding.");
            return;
        }
        
        log.info("Initializing database with seed data...");
        
        // Create users
        User admin = createUser("Admin User", "admin@isquare.com", "password123", User.UserRole.ADMIN);
        User instructor = createUser("Dr. Sarah Chen", "instructor@kmuni.com", "password123", User.UserRole.INSTRUCTOR);
        User student = createUser("Alex Johnson", "student@kmuni.com", "password123", User.UserRole.STUDENT);
        
        // Create courses
        createReactCourse(instructor);
        createSpringBootCourse(instructor);
        createMachineLearningCourse(instructor);
        createDevOpsCourse(instructor);
        createUIUXCourse(instructor);
        createFlutterCourse(instructor);
        
        log.info("Database initialization completed successfully!");
    }
    
    private User createUser(String name, String email, String password, User.UserRole role) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        return userRepository.save(user);
    }
    
    private void createReactCourse(User instructor) {
        Course course = new Course();
        course.setTitle("Complete React & TypeScript Masterclass");
        course.setDescription("Build production-ready applications with React 18, TypeScript, and modern tools. From fundamentals to advanced patterns.");
        course.setThumbnail("");
        course.setPrice(BigDecimal.ZERO);
        course.setLevel(Course.CourseLevel.BEGINNER);
        course.setCategory(Course.CourseCategory.WEB_DEV);
        course.setTags(Arrays.asList("React", "TypeScript", "Frontend"));
        course.setTotalDuration(110);
        course.setRating(4.9);
        course.setStudentsCount(3240);
        course.setIsFeatured(true);
        course.setInstructor(instructor);
        course = courseRepository.save(course);
        
        createLesson(course, "Introduction to React", "Overview and setup", 15, 1, true);
        createLesson(course, "TypeScript Basics", "Types and interfaces", 25, 2, true);
        createLesson(course, "Components & Props", "Building blocks", 30, 3, false);
        createLesson(course, "State Management", "useState and useReducer", 40, 4, false);
    }
    
    private void createSpringBootCourse(User instructor) {
        Course course = new Course();
        course.setTitle("Spring Boot Microservices");
        course.setDescription("Design and build scalable microservices with Java Spring Boot, Docker, and Kubernetes.");
        course.setThumbnail("");
        course.setPrice(new BigDecimal("49.99"));
        course.setLevel(Course.CourseLevel.INTERMEDIATE);
        course.setCategory(Course.CourseCategory.WEB_DEV);
        course.setTags(Arrays.asList("Java", "Spring Boot", "Microservices"));
        course.setTotalDuration(100);
        course.setRating(4.7);
        course.setStudentsCount(1850);
        course.setIsFeatured(true);
        course.setInstructor(instructor);
        course = courseRepository.save(course);
        
        createLesson(course, "Spring Boot Intro", "Getting started", 20, 1, true);
        createLesson(course, "REST APIs", "Building REST endpoints", 35, 2, false);
        createLesson(course, "Database Integration", "JPA and Hibernate", 45, 3, false);
    }
    
    private void createMachineLearningCourse(User instructor) {
        Course course = new Course();
        course.setTitle("Machine Learning with Python");
        course.setDescription("Master ML algorithms from scratch. NumPy, Pandas, Scikit-learn, and deep neural networks.");
        course.setThumbnail("");
        course.setPrice(new BigDecimal("79.99"));
        course.setLevel(Course.CourseLevel.ADVANCED);
        course.setCategory(Course.CourseCategory.AI_ML);
        course.setTags(Arrays.asList("Python", "Machine Learning", "AI"));
        course.setTotalDuration(80);
        course.setRating(4.8);
        course.setStudentsCount(2100);
        course.setIsFeatured(true);
        course.setInstructor(instructor);
        course = courseRepository.save(course);
        
        createLesson(course, "Python for Data Science", "NumPy & Pandas", 30, 1, true);
        createLesson(course, "Supervised Learning", "Classification & Regression", 50, 2, false);
    }
    
    private void createDevOpsCourse(User instructor) {
        Course course = new Course();
        course.setTitle("DevOps & CI/CD Pipeline");
        course.setDescription("Automate your deployments with Docker, Jenkins, GitHub Actions, and cloud platforms.");
        course.setThumbnail("");
        course.setPrice(BigDecimal.ZERO);
        course.setLevel(Course.CourseLevel.INTERMEDIATE);
        course.setCategory(Course.CourseCategory.DEVOPS);
        course.setTags(Arrays.asList("Docker", "CI/CD", "DevOps"));
        course.setTotalDuration(60);
        course.setRating(4.6);
        course.setStudentsCount(980);
        course.setIsFeatured(false);
        course.setInstructor(instructor);
        course = courseRepository.save(course);
        
        createLesson(course, "Docker Fundamentals", "Containers", 25, 1, true);
        createLesson(course, "GitHub Actions", "Automating workflows", 35, 2, false);
    }
    
    private void createUIUXCourse(User instructor) {
        Course course = new Course();
        course.setTitle("UI/UX Design Fundamentals");
        course.setDescription("Design beautiful interfaces. Figma, user research, wireframing, and prototyping.");
        course.setThumbnail("");
        course.setPrice(new BigDecimal("39.99"));
        course.setLevel(Course.CourseLevel.BEGINNER);
        course.setCategory(Course.CourseCategory.DESIGN);
        course.setTags(Arrays.asList("Figma", "UX", "Design"));
        course.setTotalDuration(50);
        course.setRating(4.5);
        course.setStudentsCount(1200);
        course.setIsFeatured(false);
        course.setInstructor(instructor);
        course = courseRepository.save(course);
        
        createLesson(course, "Design Principles", "Core concepts", 20, 1, true);
        createLesson(course, "Figma Basics", "Tool introduction", 30, 2, false);
    }
    
    private void createFlutterCourse(User instructor) {
        Course course = new Course();
        course.setTitle("Flutter Mobile Development");
        course.setDescription("Build cross-platform iOS and Android apps with Flutter and Dart from zero to hero.");
        course.setThumbnail("");
        course.setPrice(new BigDecimal("59.99"));
        course.setLevel(Course.CourseLevel.INTERMEDIATE);
        course.setCategory(Course.CourseCategory.MOBILE);
        course.setTags(Arrays.asList("Flutter", "Dart", "Mobile"));
        course.setTotalDuration(90);
        course.setRating(4.7);
        course.setStudentsCount(750);
        course.setIsFeatured(false);
        course.setInstructor(instructor);
        course = courseRepository.save(course);
        
        createLesson(course, "Flutter Setup", "Environment setup", 15, 1, true);
        createLesson(course, "Widgets", "Flutter widget tree", 40, 2, false);
    }
    
    private void createLesson(Course course, String title, String description, int duration, int order, boolean isPreview) {
        Lesson lesson = new Lesson();
        lesson.setTitle(title);
        lesson.setDescription(description);
        lesson.setDuration(duration);
        lesson.setOrder(order);
        lesson.setIsPreview(isPreview);
        lesson.setCourse(course);
        lessonRepository.save(lesson);
    }
}
