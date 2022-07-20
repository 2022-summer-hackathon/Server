import User from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Category from './category.entity';
import LikeUser from './likeUser.entity';
import PostingInfo from './postingInfo.entity';

@Entity('posting')
export default class Posting {
  @PrimaryGeneratedColumn({
    name: 'idx',
  })
  idx!: string;

  @Column({
    name: 'movie',
  })
  movie: string;

  @Column({
    name: 'star',
  })
  star!: number;

  @Column({
    name: 'like_cound',
    default: 0,
  })
  likeCount!: number;

  @CreateDateColumn({
    name: 'create_at',
  })
  createAt!: Date;

  @OneToMany(() => Category, (category) => category.posting)
  category: Category;

  @OneToMany(() => PostingInfo, (postingInfo) => postingInfo.posting)
  postingInfo: PostingInfo;

  @JoinColumn({ name: 'fk_user_idx' })
  @ManyToOne(() => User, (user) => user.posting)
  user: User;

  @OneToMany(() => LikeUser, (likeUser) => likeUser.user)
  likeUser: LikeUser;
}
