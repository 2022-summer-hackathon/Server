import Auth from 'src/auth/entity/auth.entity';
import User from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Posting from './posting.entity';

@Entity('like_user')
export default class LikeUser {
  @PrimaryGeneratedColumn({
    name: 'idx',
  })
  idx!: number;

  @Column({
    name: 'is_like',
  })
  isLike!: boolean;

  @JoinColumn({ name: 'fk_auth_idx' })
  @ManyToOne(() => Auth, (auth) => auth.likeUser)
  user: Auth;

  @JoinColumn({ name: 'fk_posting.idx' })
  @ManyToOne(() => Posting, (posting) => posting.likeUser)
  posting: Posting;
}
