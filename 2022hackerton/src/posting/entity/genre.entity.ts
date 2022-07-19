import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Posting from './posting.entity';

@Entity('genre')
export default class Genre {
  @PrimaryGeneratedColumn({
    name: 'idx',
  })
  idx!: string;

  @Column({
    name: 'genre',
  })
  genre: string;

  @JoinColumn({ name: 'fk_posting_idx' })
  @ManyToOne(() => Posting, (posting) => posting.genre)
  posting: Posting;
}
