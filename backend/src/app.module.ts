import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ParkingSpotsModule } from './parking-spots/parking-spots.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ParkingSpotsModule,
  ],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    process.on('uncaughtException', (err) => {
      console.error(`Uncaught Exception: ${err.message}\n`, err.stack);
    });

    process.on('unhandledRejection', (reason: any) => {
      if (reason instanceof Error) {
        console.error(`Unhandled Rejection: ${reason.message}\n`, reason.stack);
      } else {
        console.error(`Unhandled Rejection: ${JSON.stringify(reason)}`);
      }
    });
  }
}
