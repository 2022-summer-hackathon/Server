import User from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Posting from './posting.entity';

@Entity('like_user')
export default class LikeUser {
  @PrimaryGeneratedColumn({
    name: 'idx',
  })
  idx!: string;

  @Column({
    name: 'is_like',
  })
  isLike!: boolean;

  @JoinColumn({ name: 'fk_user_idx' })
  @OneToOne(() => User, (user) => user.likeUser)
  user: User;

  @JoinColumn({ name: 'fk_posting.idx' })
  @ManyToOne(() => Posting, (posting) => posting.likeUser)
  posting: Posting;
}
