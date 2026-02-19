import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Course } from './course.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  duration: number;

  @Column({ name: 'lesson_order', type: 'int' })
  order: number;

  @Column({ default: false })
  isPreview: boolean;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @ManyToOne(() => Course, (c) => c.lessons)
  course: Course;
}
