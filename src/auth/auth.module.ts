import { Global, Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from './auth.controller';
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";

@Global()
@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET
  }), UsersModule], // PrismaModule se necessário
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}