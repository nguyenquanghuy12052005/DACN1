import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,} from "typeorm";

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
  status?: string;

  @Column({ name: "department_id", nullable: true })
  departmentId?: number;

  @Column({ name: "position_id", nullable: true })
  positionId?: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;
}