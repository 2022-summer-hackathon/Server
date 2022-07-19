import User from 'src/user/entity/user.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('posting')
export default class Posting {
  @PrimaryColumn({
    name: 'idx',
  })
  id!: string;

  @Column({
    name: 'title',
  })
  title: string;

  @Column({
    name: 'text',
    type: 'text',
  })
  text: string;

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

  @OneToOne(() => User, (user) => user.posting)
  user: User;
}
