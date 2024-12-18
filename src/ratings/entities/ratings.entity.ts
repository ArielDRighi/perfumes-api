import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Season } from '../../enums/season.enum';
import { EventType } from '../../enums/event-type.enum';
import { Score } from '../../enums/score.enum';
import { UsageType } from 'src/enums/usage-type.enum';
import { Parfum } from 'src/parfums/entities/parfums.entity';

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

  @Column({ type: 'enum', enum: UsageType })
  usageType: UsageType;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Parfum, (parfum) => parfum.ratings)
  parfum: Parfum;

  // Relación con User
  // @ManyToOne(() => User, (user) => user.ratings)
  // user: User;
}
