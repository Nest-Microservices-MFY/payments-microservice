import { Request, Response } from 'express';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeSessionDto } from './dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-session')
  createPaymentSession(@Body() stripeSessionDto: StripeSessionDto) {
    return this.stripeService.createPaymentSession(stripeSessionDto);
  }

  @Post('webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    return this.stripeService.stripeWebhook(req, res);
  }

  @Get('success')
  success() {
    return {
      ok: true,
      message: 'Payment successful',
    };
  }

  @Get('cancelled')
  cancel() {
    return {
      ok: false,
      message: 'Payment cancelled',
    };
  }
}
