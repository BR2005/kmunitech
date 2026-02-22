import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('unilink_leads')
export class UnilinkLead {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  phone!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
