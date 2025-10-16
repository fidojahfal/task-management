import { Global, Module } from '@nestjs/common';
import { ValidationService } from './validation/validation.service';
import { PrismaService } from './prisma/prisma.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error/error.filter';

@Global()
@Module({
  providers: [
    ValidationService,
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [ValidationService, PrismaService],
})
export class CommonModule {}
