import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  email:string;
  @Column()
  firstName:string;
  @Column()
  lastName:string;
  @Column()
  displayName:string;
  @Column()
  passwordHash:string;
  @Column()
  profileImage:string;
  @Column()
  createdAt:Date;
  @Column()
  updatedAt:Date;
}
