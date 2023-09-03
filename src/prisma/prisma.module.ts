import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //torna o prisma global, disponivel para todos
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
