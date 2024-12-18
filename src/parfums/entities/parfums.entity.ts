import { EventType } from 'src/enums/event-type.enum';
import { Score } from 'src/enums/score.enum';
import { Season } from 'src/enums/season.enum';
import { UsageType } from 'src/enums/usage-type.enum';
import { Rating } from 'src/ratings/entities/ratings.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @OneToMany(() => Rating, (rating) => rating.parfum, { cascade: true })
  ratings: Rating[];
}
