import {Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 320 })
  email: string;

  @Column({name: 'password_hash', type: 'varchar', select: false })
  passwordHash: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  username: string;

  @CreateDateColumn({ name:'created_at',type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at',type: 'timestamptz' })
  updatedAt: Date;
}
