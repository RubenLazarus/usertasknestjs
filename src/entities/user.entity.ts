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
  @Column({nullable:true,type:String})
  profileImage:string;
  @Column()
  createdAt:Date;
  @Column({nullable:true,type:'time with time zone'})
  updatedAt:Date;
}
