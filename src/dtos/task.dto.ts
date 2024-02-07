import {IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  projectName: string;
  @IsString()
  @IsNotEmpty()
  assignedUser: string;

  @IsNotEmpty()
  @IsString()
  prioriyt: string;
  
  @IsNotEmpty()
  @IsString()
  descreption: string;
}