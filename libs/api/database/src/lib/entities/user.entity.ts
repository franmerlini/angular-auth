import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@angular-auth/libs/common';
import { CountryEntity } from './country.entity';

@Entity({ name: 'users' })
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  city!: string;

  @ManyToOne(() => CountryEntity)
  @JoinColumn({ name: 'country_id' })
  country!: CountryEntity;

  // @Column()
  // role!: string;

  // token!: string;
}
