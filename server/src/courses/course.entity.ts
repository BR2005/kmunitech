import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Lesson } from './lesson.entity';
import { Enrollment } from '../enrollments/enrollment.entity';

@Entity()
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({ nullable: true })
    thumbnail: string;

    @ManyToOne(() => User, (user) => user.courses)
    instructor: User;

    @OneToMany(() => Lesson, (lesson) => lesson.course)
    lessons: Lesson[];

    @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
    enrollments: Enrollment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
