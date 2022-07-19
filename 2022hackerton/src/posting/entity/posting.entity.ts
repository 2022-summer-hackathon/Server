import User from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
    name: 'text',
    type: 'text',
  })
  text: string;

  @Column({
    name: 'star',
  })
  star!: number;

  @Column({})
  @Column({
    name: 'image',
    default: '',
    nullable: true,
  })
  image: string;

  @Column({
    name: 'category',
  })
  category!: string;

  @JoinColumn({ name: 'fk_user_idx' })
  @ManyToOne(() => User, (user) => user.posting)
  user: User;
}
