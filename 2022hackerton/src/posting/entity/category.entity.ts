import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Posting from './posting.entity';

@Entity('category')
export default class Category {
  @PrimaryGeneratedColumn({
    name: 'idx',
  })
  idx!: string;

  @Column({
    name: 'category',
  })
  category: string;

  @JoinColumn({ name: 'fk_posting_idx' })
  @ManyToOne(() => Posting, (posting) => posting.category)
  posting: Posting;
}
