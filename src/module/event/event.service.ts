import { Injectable } from '@nestjs/common';
import { BananaEventField, BananaEventPayload } from './type/banana.type';
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
      const bananaFIeld: BananaEventField[] =
        embed.fields as BananaEventField[];
      if (bananaFIeld && bananaFIeld.length > 0) {
        if (bananaFIeld[2].value.includes('Mythic')) {
          embed.color = 0xffd700; // Gold color for Mythic
        } else if (bananaFIeld[2].value.includes('Legendary')) {
          embed.color = 0xff8c00; // Dark orange color for Legendary
        } else if (bananaFIeld[2].value.includes('Epic')) {
          embed.color = 0x800080; // Purple color for Epic
        } else if (bananaFIeld[2].value.includes('Rare')) {
          embed.color = 0x0000ff; // Blue color for Rare
        } else if (bananaFIeld[2].value.includes('Uncommon')) {
          embed.color = 0x008000; // Green color for Uncommon
        } else {
          embed.color = 0x808080; // Gray color for Common
        }
      }
    });
    await this.logService.logEvent(payload.embeds);
  }
}
