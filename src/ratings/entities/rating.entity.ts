// src/ratings/entities/rating.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { Parfum } from 'src/parfums/entities/parfums.entity';
import { Score } from 'src/enums/score.enum';

@Entity('ratings')
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @ManyToOne(() => Parfum, (parfum) => parfum.ratings)
  parfum: Parfum;

  @Column({ type: 'enum', enum: Score })
  longevity: Score;

  @Column({ type: 'enum', enum: Score })
  sillage: Score;

  @Column({ type: 'enum', enum: Score })
  projection: Score;

  @Column({ type: 'text', nullable: true })
  comment: string;
}
