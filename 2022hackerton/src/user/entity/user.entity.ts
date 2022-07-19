import Auth from 'src/auth/entity/auth.entity';
import Posting from 'src/posting/entity/posting.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
    name: 'name',
  })
  name!: string;

  @Column({})
  @Column({
    name: 'level',
    default: 0,
  })
  level!: number;

  @Column({
    name: 'exp',
    default: '0',
  })
  exp!: number;

  @JoinColumn({ name: 'fk_auth_id' })
  @OneToOne(() => Auth, (auth) => auth.user)
  auth!: Auth;

  @JoinColumn({ name: 'fk_positng_idx' })
  @ManyToOne(() => Posting, (posting) => posting.user)
  posting: Posting;
}
