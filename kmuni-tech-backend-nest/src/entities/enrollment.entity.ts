import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (u) => u.enrollments)
  student!: User;

  @ManyToOne(() => Course, (c) => c.enrollments)
  course!: Course;

  @Column({ type: 'int', default: 0 })
  progress!: number;
}
