import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { Course } from './course.entity';

export enum UserRole {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  // Store role as text to remain compatible with SQLite (enum type not supported)
  @Column({ type: 'text', default: UserRole.STUDENT })
  role!: UserRole;

  @OneToMany(() => Enrollment, (e) => e.student)
  enrollments?: Enrollment[];

  @OneToMany(() => Course, (c) => c.instructor)
  coursesCreated?: Course[];
}
