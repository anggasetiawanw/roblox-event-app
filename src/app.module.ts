import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './module/event/event.module';
import { DiscordBotModule } from './module/discord-bot/discord-bot.module';

@Module({
  imports: [EventModule, DiscordBotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
