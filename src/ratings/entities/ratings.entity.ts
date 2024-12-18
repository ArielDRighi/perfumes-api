import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Season } from '../enums/season.enum';
import { EventType } from '../enums/event-type.enum';
import { Score } from '../enums/score.enum';

@Entity('ratings')
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  perfumeId: number;

  @Column({ type: 'enum', enum: Score })
  longevity: Score;

  @Column({ type: 'enum', enum: Score })
  sillage: Score;

  @Column({ type: 'enum', enum: Score })
  projection: Score;

  @Column({ type: 'enum', enum: Season })
  season: Season;

  @Column({ type: 'enum', enum: EventType })
  eventType: EventType;

  @CreateDateColumn()
  createdAt: Date;
}
