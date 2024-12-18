import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParfumsModule } from './parfums/parfums.module';
import { RatingsModule } from './ratings/ratings.module';
import { RecommendationsController } from './recommendations/recommendations.controller';
import { RecommendationsService } from './recommendations/recommendations.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ParfumsModule,
    RatingsModule,
    UsersModule,
  ],
  controllers: [AppController, RecommendationsController],
  providers: [AppService, RecommendationsService],
})
export class AppModule {}
