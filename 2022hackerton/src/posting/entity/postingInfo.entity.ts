import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Posting from './posting.entity';

@Entity('posting_info')
export default class PostingInfo {
  @PrimaryGeneratedColumn({
    name: 'idx',
  })
  idx!: string;

  @Column({
    name: 'text',
    type: 'text',
    nullable: true,
  })
  text: string;

  @Column({
    name: 'image',
    default: null,
  })
  image: string;

  @JoinColumn({ name: 'fk_posting_idx' })
  @ManyToOne(() => Posting, (posting) => posting.idx)
  posting: Posting;
}
