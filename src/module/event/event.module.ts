import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { DiscordBotModule } from '../discord-bot/discord-bot.module';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [DiscordBotModule],
})
export class EventModule {}
