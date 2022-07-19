import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genre')
export default class Genre {
  @PrimaryGeneratedColumn({
    name: 'idx',
  })
  idx!: string;

  @Column({
    name: 'genre',
  })
  genre!: string;
}
