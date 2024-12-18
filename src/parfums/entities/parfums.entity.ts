import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('parfums')
export class Parfum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  longevity: number;

  @Column()
  sillage: number;

  @Column()
  projection: number;

  @Column()
  season: string;

  @Column()
  eventType: string;
}
