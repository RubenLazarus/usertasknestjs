import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { Prioriyt, Status } from 'src/utils/constants';


@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title:string;
  @Column()
  projectName:string;
  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.tasks)
  assignedUser: UserEntity[]
  @Column('text')
  prioriyt:Prioriyt;
  @Column()
  descreption:string;
  @Column('text')
  status:Status;
  @Column()
  createdAt:Date
  @Column()
  updatedAt:Date
  @Column({nullable:true,type:Number})
  timeTaken:Number
  @Column({nullable:true,type:String})
  showTimeTaken:String
  @Column({type:Boolean,default:true})
  isActive:Boolean
  @Column({type:Boolean,default:false})
  isDeleted:Boolean
}
