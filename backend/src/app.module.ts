import { MiddlewareConsumer, Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ParkingSpotsModule } from './parking-spots/parking-spots.module';
import { ReservationsModule } from './reservations/reservations.module';
import { LoggingModule } from './logging/logging.module';
import { LoggingMiddleware } from './logging/logging.middleware';
import { LoggingService } from './logging/logging.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ParkingSpotsModule,
    ReservationsModule,
    LoggingModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly loggingService: LoggingService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
  onModuleInit() {
    process.on('uncaughtException', (err) => {
      this.loggingService.error(
        `Uncaught Exception: ${err.message}`,
        err.stack,
      );
    });

    process.on('unhandledRejection', (reason: any) => {
      if (reason instanceof Error) {
        this.loggingService.error(
          `Unhandled Rejection: ${reason.message}`,
          reason.stack,
        );
      } else {
        this.loggingService.error(`Unhandled Rejection: ${reason}`);
      }
    });
  }
}
