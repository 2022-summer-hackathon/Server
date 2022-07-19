import Auth from 'src/auth/entity/auth.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export default class User {
  @PrimaryGeneratedColumn({
    name: 'idx',
  })
  idx!: number;

  @Column({
    name: 'email',
  })
  email!: string;

  @Column({
    name: 'grade',
  })
  grade!: number;

  @Column({
    name: 'room',
  })
  room!: number;

  @Column({
    name: 'number',
  })
  number!: number;

  @JoinColumn({ name: 'fk_auth_id' })
  @OneToOne(() => Auth, (auth) => auth.user)
  auth!: Auth;
}
