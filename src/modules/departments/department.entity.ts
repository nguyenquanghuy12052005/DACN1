import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn} from "typeorm";

@Entity("departments")
export class DepartmentEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id!: number;

  @Column({ length: 255 })
  name!: string;

  @Column({ name: "parent_id", nullable: true })
  parentId?: number | null;

  @ManyToOne(() => DepartmentEntity, (dept) => dept.children, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "parent_id" })
  parent?: DepartmentEntity;

  @OneToMany(() => DepartmentEntity, (dept) => dept.parent)
  children?: DepartmentEntity[];

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;
}