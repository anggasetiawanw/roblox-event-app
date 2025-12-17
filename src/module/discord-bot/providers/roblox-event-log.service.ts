import { Injectable, Logger } from '@nestjs/common';
import { APIEmbed, Client } from 'discord.js';

@Injectable()
export class RobloxEventLogService {
  private readonly logger = new Logger(RobloxEventLogService.name);

  public constructor(private readonly client: Client) {}

  async logEvent(message: APIEmbed | APIEmbed[]): Promise<void> {
    const channelId = process.env.DISCORD_CHANNEL_EVENT_LOG_ID;
    if (!channelId) {
      this.logger.error(
        'DISCORD_CHANNEL_EVENT_LOG_ID is not set in environment variables.',
      );
      return;
    }
    const channel = await this.client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased()) {
      this.logger.error(
        `Channel with ID ${channelId} not found or is not text-based.`,
      );
      return;
    }
    if (!('send' in channel)) {
      this.logger.error(
        `Channel with ID ${channelId} does not support sending messages.`,
      );
      return;
    }
    await channel.send({
      embeds: Array.isArray(message) ? message : [message],
    });
    this.logger.log(`Event logged to Discord channel ${channelId}`);
  }
}
