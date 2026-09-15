import { Column, Entity, JoinColumn, ManyToOne, type Relation } from 'typeorm';
import { BaseEntity } from '../../helpers/BaseEntity.js';
import { User } from '../../users/entities/user.entity.js';
import { Address } from '../../addresses/entities/address.entity.js';

@Entity()
export class UserAddress extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  addressId: string;

  @Column({ default: false })
  isDefault: boolean;

  @ManyToOne(() => User, (user) => user.userAddresses)
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @ManyToOne(() => Address, (address) => address.userAddresses)
  @JoinColumn({ name: 'addressId' })
  address: Relation<Address>;
}
