import User from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Genre from './genre.entity';
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

  @OneToMany(() => Genre, (genre) => genre.posting)
  genre: Genre;

  @OneToMany(() => PostingInfo, (postingInfo) => postingInfo.posting)
  postingInfo: PostingInfo;

  @JoinColumn({ name: 'fk_user_idx' })
  @ManyToOne(() => User, (user) => user.posting)
  user: User;
}
