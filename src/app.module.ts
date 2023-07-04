import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TicketModule } from './ticket/ticket.module';
import { SeatController } from './seat/seat.controller';
import { SeatModule } from './seat/seat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'cinema',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TicketModule,
    SeatModule
  ],
  controllers: [AppController, UserController, UserController, SeatController],
  providers: [AppService],
})
export class AppModule {}
