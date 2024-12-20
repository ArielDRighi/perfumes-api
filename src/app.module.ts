import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParfumsModule } from './parfums/parfums.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RatingsService } from './ratings/ratings.service';
import { RatingsController } from './ratings/ratings.controller';
import { RecommendationsService } from './recommendations/recommendations.service';
import { RecommendationsController } from './recommendations/recommendations.controller';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ParfumsModule,
    RatingsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, RatingsController, RecommendationsController],
  providers: [AppService, RatingsService, RecommendationsService],
})
export class AppModule {}
