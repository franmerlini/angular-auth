import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { Role, RoleEnum } from '../enums';
import { Country } from './country.model';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  city!: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country!: Country;

  @Column({
    type: 'enum',
    enum: Object.values(RoleEnum),
    default: RoleEnum.USER,
  })
  role!: Role;

  @Exclude()
  @Column()
  password!: string;
}
