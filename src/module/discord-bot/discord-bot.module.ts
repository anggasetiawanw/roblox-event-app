import { Module } from '@nestjs/common';
import { AppUpdate } from './providers/app-update.service';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';
import { RobloxEventLogService } from './providers/roblox-event-log.service';
@Module({
  imports: [
    NecordModule.forRoot({
      token: process.env.DISCORD_BOT_TOKEN || '',
      intents: [IntentsBitField.Flags.Guilds],
    }),
  ],
  exports: [RobloxEventLogService],
  providers: [AppUpdate, RobloxEventLogService],
})
export class DiscordBotModule {}
