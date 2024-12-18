import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParfumsModule } from './parfums/parfums.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ParfumsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
