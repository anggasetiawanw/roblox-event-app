import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EventService } from './event.service';
import * as bananaType from './type/banana.type';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('banana')
  @HttpCode(200)
  handleAlert(@Body() payload: bananaType.BananaEventPayload) {
    this.eventService.logEvent(payload);
    return { status: 'Ok' };
  }
}
