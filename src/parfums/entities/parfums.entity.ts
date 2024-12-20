import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rating } from 'src/ratings/entities/rating.entity';
import { Score } from 'src/enums/score.enum';
import { Season } from 'src/enums/season.enum';
import { EventType } from 'src/enums/event-type.enum';
import { UsageType } from 'src/enums/usage-type.enum';

@Entity('parfums')
export class Parfum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: Score, nullable: true })
  longevity: Score;

  @Column({ type: 'enum', enum: Score, nullable: true })
  sillage: Score;

  @Column({ type: 'enum', enum: Score, nullable: true })
  projection: Score;

  @Column({ type: 'enum', enum: Season, nullable: true })
  season: Season;

  @Column({ type: 'enum', enum: EventType, nullable: true })
  eventType: EventType;

  @Column({ type: 'enum', enum: UsageType, nullable: true })
  usageType: UsageType;

  @Column({ type: 'float', default: 0 })
  avgLongevity: number;

  @Column({ type: 'float', default: 0 })
  avgSillage: number;

  @Column({ type: 'float', default: 0 })
  avgProjection: number;

  @Column({ type: 'enum', enum: Season, nullable: true })
  avgSeason: Season;

  @Column({ type: 'enum', enum: EventType, nullable: true })
  avgEventType: EventType;

  @Column({ type: 'enum', enum: UsageType, nullable: true })
  avgUsageType: UsageType;

  @OneToMany(() => Rating, (rating) => rating.parfum)
  ratings: Rating[];
}
