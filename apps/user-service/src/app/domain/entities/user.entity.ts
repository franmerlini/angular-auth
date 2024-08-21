import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from 'class-transformer';

import { Role, RoleEnum, User } from '@angular-auth/libs/common';

import { CountryEntity } from './country.entity';

@Entity({ name: 'users' })
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  city!: string;

  @ManyToOne(() => CountryEntity, { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country!: CountryEntity;

  @Column({
    type: 'enum',
    enum: Object.values(RoleEnum),
    default: RoleEnum.USER,
  })
  role!: Role;

  @Exclude()
  @Column({ nullable: true })
  password!: string;

  @Column({ nullable: true })
  picture!: string;
}
