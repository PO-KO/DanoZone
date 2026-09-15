import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../helpers/BaseEntity.js';

@Entity()
export class Country extends BaseEntity {
  @Column({ unique: true })
  name: string;
}
