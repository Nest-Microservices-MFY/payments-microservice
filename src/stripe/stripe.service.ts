import { Request, Response } from 'express';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { envs } from '../config';
import { StripeSessionDto } from './dto';

@Injectable()
export class StripeService {
  private readonly stripe = new Stripe(envs.stripeSecret);

  /**
   *
   * Crear la session de pago con Stripe
   *
   */
  async createPaymentSession(paymentSessionDto: StripeSessionDto) {
    const { currency, items, orderId } = paymentSessionDto;

    const lineItems = items.map((item) => {
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // ==> equivale a 20 UDS, stripe no permite enviar 20.00
        },
        quantity: item.quantity,
      };
    });

    const session = await this.stripe.checkout.sessions.create({
      // colocar ID de la orden
      payment_intent_data: {
        metadata: {
          orderId: orderId,
        },
      },
      // artículos que se esta comprando
      line_items: lineItems,
      mode: 'payment',
      success_url: envs.stripeSuccessUrl,
      cancel_url: envs.stripeCancelledUrl,
    });

    return session;
  }

  /**
   *
   * Webhook de stripe para notificar cuando se realizo el pago
   *
   */
  async stripeWebhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    const endpointSecret = envs.stripeEndpointSecret;

    try {
      event = this.stripe.webhooks.constructEvent(
        req['rawBody'],
        sig,
        endpointSecret,
      );
    } catch (error) {
      res.status(400).send(`Webhook Error: ${error.message}`);
      return;
    }

    switch (event.type) {
      case 'charge.succeeded':
        const chargeSucceeded = event.data.object;
        console.log({ metadata: chargeSucceeded.metadata });
        break;

      default:
        console.log(`Event ${event.type} not handled`);
    }

    return res.status(200).json({
      status: 'ok',
      signature: sig,
    });
  }
}
