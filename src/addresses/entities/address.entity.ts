import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  type Relation,
} from 'typeorm';
import { BaseEntity } from '../../helpers/BaseEntity.js';
import { Country } from '../../countries/entities/country.entity.js';
import { UserAddress } from '../../user-addresses/entities/user-address.entity.js';

@Entity()
export class Address extends BaseEntity {
  @Column({ nullable: true })
  unitNumber?: string;

  @Column({ nullable: true })
  streetNumber?: string;

  @Column()
  addressLine1: string;

  @Column({ nullable: true })
  addressLine2?: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  region?: string;

  @Column({ length: '20', nullable: true })
  postalCode: string;

  @Column()
  companyId: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'companyId' })
  country: Country;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.address)
  userAddresses: Relation<UserAddress[]>;
}
