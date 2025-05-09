import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingService implements LoggerService {
  private logLevel: number;

  private static readonly LOG_LEVELS = {
    log: 0,
    warn: 1,
    error: 2,
    debug: 3,
    verbose: 4,
  };

  constructor(private readonly configService: ConfigService) {
    const level = this.configService.get<string>('LOG_LEVEL') || '2';
    this.logLevel = parseInt(level, 10);
  }

  log(message: string) {
    if (this.shouldLog(LoggingService.LOG_LEVELS.log)) {
      console.log(message);
    }
  }

  error(message: string, trace?: string) {
    if (this.shouldLog(LoggingService.LOG_LEVELS.error)) {
      const errorMsg = `${message}\nTrace: ${trace || 'No trace provided'}`;
      console.error(errorMsg);
    }
  }

  warn(message: string) {
    if (this.shouldLog(LoggingService.LOG_LEVELS.warn)) {
      console.warn(message);
    }
  }

  debug(message: string) {
    if (this.shouldLog(LoggingService.LOG_LEVELS.debug)) {
      console.debug(message);
    }
  }

  verbose(message: string) {
    if (this.shouldLog(LoggingService.LOG_LEVELS.verbose)) {
      console.info(message);
    }
  }

  private shouldLog(level: number): boolean {
    return level <= this.logLevel;
  }
}
