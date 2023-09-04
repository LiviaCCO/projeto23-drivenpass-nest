import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { CredentialsModule } from './credentials/credentials.module';
import { NotesModule } from './notes/notes.module';
import { CardsModule } from './cards/cards.module';
import { EraseModule } from './erase/erase.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [HealthModule, UsersModule, CredentialsModule, NotesModule, CardsModule, EraseModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
