import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, query } = req;
    const startTime = Date.now();

    this.loggingService.log(
      `Request: [${method}] ${originalUrl} - Query: ${JSON.stringify(
        query,
      )} Body: ${JSON.stringify(req.body)}`,
    );

    res.on('finish', () => {
      const statusCode = res.statusCode;
      const responseTime = Date.now() - startTime;
      this.loggingService.log(
        `Response: Status ${statusCode} - Time: ${responseTime}ms\n`,
      );
    });

    next();
  }
}
