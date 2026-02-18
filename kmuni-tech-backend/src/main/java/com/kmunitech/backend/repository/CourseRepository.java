package com.kmunitech.backend.repository;

import com.kmunitech.backend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CourseRepository extends JpaRepository<Course, UUID> {
    List<Course> findByInstructorId(UUID instructorId);
    List<Course> findByIsFeaturedTrue();
    List<Course> findByCategory(Course.CourseCategory category);
    List<Course> findByLevel(Course.CourseLevel level);
}
