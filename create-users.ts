import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { UsersService } from './src/users/users.service';
import { CreateUserDto } from './src/users/dto/create-user.dto';
import { UserRole } from './src/enums/roles.enum';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const users: CreateUserDto[] = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: await bcrypt.hash('AdminPassword123!', 10),
      role: UserRole.ADMIN,
    },
    {
      name: 'User One',
      email: 'user1@example.com',
      password: await bcrypt.hash('UserPassword123!', 10),
      role: UserRole.USER,
    },
    {
      name: 'User Two',
      email: 'user2@example.com',
      password: await bcrypt.hash('UserPassword123!', 10),
      role: UserRole.USER,
    },
    {
      name: 'User Three',
      email: 'user3@example.com',
      password: await bcrypt.hash('UserPassword123!', 10),
      role: UserRole.USER,
    },
    {
      name: 'User Four',
      email: 'user4@example.com',
      password: await bcrypt.hash('UserPassword123!', 10),
      role: UserRole.USER,
    },
    {
      name: 'User Five',
      email: 'user5@example.com',
      password: await bcrypt.hash('UserPassword123!', 10),
      role: UserRole.USER,
    },
  ];

  try {
    for (const user of users) {
      try {
        const existingUser = await usersService.findByEmail(user.email);
        if (!existingUser) {
          await usersService.create(user);
        } else {
          console.log(`User with email ${user.email} already exists`);
        }
      } catch (error) {
        if (error.status === 404) {
          await usersService.create(user);
        } else {
          throw error;
        }
      }
    }
    console.log('Users created successfully');
  } catch (error) {
    console.error('Error creating users:', error.message);
  } finally {
    await app.close();
  }
}

bootstrap();
