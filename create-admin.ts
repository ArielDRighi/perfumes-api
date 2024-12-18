import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { UsersService } from './src/users/users.service';
import { UserRole } from './src/enums/roles.enum';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const adminEmail = 'admin@example.com';
  const adminPassword = 'AdminPassword123!';

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  try {
    await usersService.create({
      name: 'Admin User',
      email: adminEmail,
      password: hashedPassword,
      role: UserRole.ADMIN,
    });
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    await app.close();
  }
}

bootstrap();
