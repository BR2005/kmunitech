import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Course } from '../courses/course.entity';
import { Enrollment } from '../enrollments/enrollment.entity';

export enum UserRole {
    ADMIN = 'admin',
    STAFF = 'staff',
    STUDENT = 'student',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({
        type: 'simple-enum',
        enum: UserRole,
        default: UserRole.STUDENT,
    })
    role: UserRole;

    @OneToMany(() => Course, (course) => course.instructor)
    courses: Course[];

    @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
    enrollments: Enrollment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
