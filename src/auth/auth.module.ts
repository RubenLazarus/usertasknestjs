import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { Services } from 'src/utils/constants';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/utils/entities';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature(entities)],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
    {
      provide: Services.USERS,
      useClass: UsersService,
    },
  ],
})
export class AuthModule {}
