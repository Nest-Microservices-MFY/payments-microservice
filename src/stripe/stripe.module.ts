import { Module } from '@nestjs/common';
import { NatsModule } from '../transports/nats.module';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [NatsModule],
})
export class StripeModule {}
