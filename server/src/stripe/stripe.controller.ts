import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';

@Controller()
export class StripeController {
  
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() createPaymentIntentDto: CreatePaymentIntentDto) {
    console.log('Received payment intent request:', createPaymentIntentDto);
    
    try {
      const { clientSecret } = await this.stripeService.createPaymentIntent(
        createPaymentIntentDto.items,
        createPaymentIntentDto.currency || 'usd'
      );
      
      console.log('Payment intent created successfully');
      return { clientSecret };
    } catch (error) {
      console.error('Error in payment intent controller:', error);
      throw new HttpException(
        'Failed to create payment intent',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('confirm-payment')
  async confirmPayment(@Body() body: { paymentIntentId: string }) {
    try {
      const paymentIntent = await this.stripeService.confirmPayment(body.paymentIntentId);
      return { success: true, paymentIntent };
    } catch (error) {
      throw new HttpException(
        'Failed to confirm payment',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
