import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Lesson } from './lesson.entity';
import { Enrollment } from './enrollment.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'text', nullable: true })
  thumbnail?: string | null;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column({ type: 'text', nullable: true })
  level?: string | null;

  @Column({ type: 'text', nullable: true })
  category?: string | null;

  @Column('simple-array', { nullable: true })
  tags?: string[] | null;

  @Column({ type: 'int', nullable: true })
  totalDuration?: number | null;

  @Column({ type: 'double precision', default: 0 })
  rating!: number;

  @Column({ type: 'int', default: 0 })
  studentsCount!: number;

  @Column({ default: false })
  isFeatured!: boolean;

  @ManyToOne(() => User, (u) => u.coursesCreated)
  instructor!: User;

  @OneToMany(() => Lesson, (l) => l.course)
  lessons?: Lesson[];

  @OneToMany(() => Enrollment, (e) => e.course)
  enrollments?: Enrollment[];
}
