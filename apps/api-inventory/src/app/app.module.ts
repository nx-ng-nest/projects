import { Repository } from 'typeorm';

import {
  CacheModule,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import {
  InjectRepository,
  TypeOrmModule,
} from '@nestjs/typeorm';
import {
  AuthGuard,
  AuthModule,
  User,
} from '@projects/auth';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Sample } from './sample/sample.entity';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/inventory.sqlite',
      entities: [Sample, User],
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([Sample, User]),
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 5,
    }),
    CacheModule.register({}),
    ScheduleModule.forRoot(),
    AuthModule,
    SampleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}
  async onModuleInit() {
    await this.userRepo.save({
      username: 'admin@gmail.com',
      password: 'password',
      permisison: true,
    });

    await this.userRepo.save({
      username: 'reader@gmail.com',
      password: 'password',
      permisison: {
        user: {
          get: true,
        },
        sample: {
          get: true,
        },
      },
    });
  }
}
