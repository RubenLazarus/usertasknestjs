import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  getUserCount(email: string) {
    return this.userRepository.count({
      where: {
        email: email?.toLowerCase(),
      },
    });
  }
  createUser(userDetails){
    const user: UserEntity = new UserEntity();
    user.firstName = userDetails.firstName;
    user.lastName = userDetails.lastName;
    user.email = userDetails.email?.toLowerCase();
    user.displayName = userDetails.displayName;
    user.passwordHash = userDetails.passwordHash;
    user.createdAt = new Date();
    return this.userRepository.save(user);
  }
}
