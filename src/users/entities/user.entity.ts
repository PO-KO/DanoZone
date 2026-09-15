import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  type Relation,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '../../helpers/BaseEntity.js';
import { UserAddress } from '../../user-addresses/entities/user-address.entity.js';

@Entity('users')
export class User extends BaseEntity {
  @Column('varchar', { length: '30' })
  firstName: string;

  @Column('varchar', { length: '30' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', nullable: true })
  refreshToken?: string | null;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  userAddresses: Relation<UserAddress>;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
