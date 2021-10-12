import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Investigation } from './app.entity';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'investigation',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [Investigation],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Investigation]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
