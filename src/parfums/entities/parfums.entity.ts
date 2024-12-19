import { EventType } from 'src/enums/event-type.enum';
import { Score } from 'src/enums/score.enum';
import { Season } from 'src/enums/season.enum';
import { UsageType } from 'src/enums/usage-type.enum';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rating } from 'src/ratings/entities/rating.entity';

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

  @OneToMany(() => Rating, (rating) => rating.parfum)
  ratings: Rating[];

  @Column({ type: 'float', default: 0 })
  avgLongevity: number;

  @Column({ type: 'float', default: 0 })
  avgSillage: number;

  @Column({ type: 'float', default: 0 })
  avgProjection: number;
}
