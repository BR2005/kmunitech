import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique } from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';

@Entity()
@Unique(['user', 'course'])
export class Enrollment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.enrollments)
    user: User;

    @ManyToOne(() => Course, (course) => course.enrollments)
    course: Course;

    @CreateDateColumn()
    enrolledAt: Date;
}
