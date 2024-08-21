import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Country } from '@angular-auth/libs/common';

@Entity({ name: 'countries' })
export class CountryEntity implements Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  code!: string;
}
