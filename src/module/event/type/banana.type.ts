import { APIEmbed } from 'discord.js';

export type BananaEventPayload = {
  embeds: APIEmbed[];
  username: string;
  avatar_url: string;
};

export type BananaEventFooter = {
  text: string;
  icon_url: string;
};

export type BananaEventField = {
  name: string;
  value: string;
  inline: boolean;
};
