import { Injectable } from '@nestjs/common';
import { BananaEventPayload } from './type/banana.type';
import { RobloxEventLogService } from '../discord-bot/providers/roblox-event-log.service';

@Injectable()
export class EventService {
  constructor(private readonly logService: RobloxEventLogService) {}
  async logEvent(payload: BananaEventPayload): Promise<void> {
    payload.embeds.forEach((embed) => {
      embed.title = `[BANANA ALERT] Got Ore`;
      embed.footer = {
        text: `Created By Angga.Dev`,
        icon_url: 'https://www.anggasw.my.id/favicon.ico',
      };
    });
    await this.logService.logEvent(payload.embeds);
  }
}
