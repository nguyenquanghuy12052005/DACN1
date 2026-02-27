import { Entity, Column, UpdateDateColumn, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity("user_wallets") 
export class UserWalletEntity {
  @PrimaryColumn({ name: "user_id", type: "bigint" })
  userId!: number;

  @Column({ type: "bigint", default: 0 })
  balance!: number;

  @Column({ name: "total_earned", type: "bigint", default: 0 })
  totalEarned!: number;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp without time zone" })
  updatedAt!: Date;

  // Quan hệ 1-1 với User
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;
}