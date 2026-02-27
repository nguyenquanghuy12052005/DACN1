import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne,} from "typeorm";
import { PositionEntity } from "./positions.entity";
import { UserWalletEntity } from "./user_walets.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id!: number;

  @Column({ length: 50, unique: true })
  username!: string;

  @Column({ name: "password_hash", type: "text" })
  passwordHash!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ type: "text", nullable: true })
  avatar?: string;

@Column({
  type: "varchar",
  default: "active",
})
status!: "active" | "inactive" | "suspended" | "resigned";

  @Column({ name: "department_id", type: "integer" })
  departmentId!: number;

  @Column({ name: "position_id",  type: "bigint" })
  positionId!: number;

  // Thiết lập quan hệ với Position
  @ManyToOne(() => PositionEntity, (position) => position.users, { nullable: false })
  @JoinColumn({ name: "position_id" })
  position!: PositionEntity;

  // Thiết lập quan hệ với Wallet
  @OneToOne(() => UserWalletEntity , (wallet) => wallet.user)
  wallet?: UserWalletEntity;
@CreateDateColumn({ name: "created_at" })
createdAt!: Date;

@UpdateDateColumn({ name: "updated_at" })
updatedAt!: Date;
}