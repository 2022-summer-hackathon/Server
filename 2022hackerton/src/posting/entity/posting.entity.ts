import User from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
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

  @JoinColumn({ name: 'fk_genre_idx' })
  @ManyToOne(() => Genre, (genre) => genre.idx)
  genre: Genre;

  @OneToMany(() => PostingInfo, (postingInfo) => postingInfo.idx)
  postingInfo: PostingInfo;

  @JoinColumn({ name: 'fk_user_idx' })
  @ManyToOne(() => User, (user) => user.posting)
  user: User;
}
