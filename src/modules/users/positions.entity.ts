import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("positions")
export class PositionEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id!: number;

  @Column({ type: "character varying", length: 255 })
  title!: string;

  @Column({ type: "integer" })
  level!: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp without time zone" })
  createdAt!: Date;

  // Quan hệ 1 chức vụ có thể có nhiều user
  @OneToMany(() => UserEntity, (user) => user.position)
  users?: UserEntity[];
}