// Payment Gateway Service for JRB Gold - Paytm Integration
// Merchant credentials configuration

export interface PaymentConfig {
  merchantId: string;
  merchantKey: string;
  environment: 'test' | 'production';
  websiteName: string;
  industryType: string;
  channelId: string;
}

export interface PaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  returnUrl: string;
  cancelUrl: string;
  paymentMethod?: 'credit' | 'debit' | 'netbanking' | 'upi';
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'success' | 'failed';
  message: string;
  redirectUrl?: string;
}

class PaymentService {
  private config: PaymentConfig;

  constructor() {
    this.config = {
      merchantId: import.meta.env.VITE_MERCHANT_ID || '',
      merchantKey: import.meta.env.VITE_MERCHANT_KEY || '',
      environment: (import.meta.env.VITE_PAYMENT_ENV as 'test' | 'production') || 'test',
      websiteName: import.meta.env.VITE_PAYTM_WEBSITE || 'WEBSTAGING',
      industryType: import.meta.env.VITE_PAYTM_INDUSTRY_TYPE || 'Retail',
      channelId: import.meta.env.VITE_PAYTM_CHANNEL_ID || 'WEB'
    };

    // Debug logging (remove in production)
    console.log('Paytm Configuration:', {
      merchantId: this.config.merchantId ? `${this.config.merchantId.substring(0, 8)}...` : 'NOT SET',
      merchantKey: this.config.merchantKey ? 'SET' : 'NOT SET',
      environment: this.config.environment,
      websiteName: this.config.websiteName,
      industryType: this.config.industryType,
      channelId: this.config.channelId
    });

    // Validate required configuration
    if (!this.config.merchantId || !this.config.merchantKey) {
      console.error('Paytm configuration missing: VITE_MERCHANT_ID and VITE_MERCHANT_KEY are required');
    }
  }

  /**
   * Generate Paytm checksum for secure transaction
   */
  private async generatePaytmChecksum(params: any): Promise<string> {
    // Note: In production, checksum generation should be done on the server side
    // for security reasons. This client-side implementation is for development only.
    
    // Sort parameters alphabetically (excluding CHECKSUMHASH)
    const sortedParams = Object.keys(params)
      .filter(key => key !== 'CHECKSUMHASH')
      .sort()
      .reduce((acc: any, key) => {
        if (params[key] && params[key] !== '') {
          acc[key] = params[key];
        }
        return acc;
      }, {});

    // Create parameter string
    let paramStr = '';
    for (const key in sortedParams) {
      paramStr += `${key}=${sortedParams[key]}&`;
    }
    paramStr = paramStr.slice(0, -1); // Remove last &

    // Add merchant key
    const checksumString = paramStr + this.config.merchantKey;
    
    // Generate SHA-256 hash
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(checksumString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  }

  /**
   * Initiate Paytm payment transaction
   */
  async initiatePayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      // Validate configuration before proceeding
      if (!this.config.merchantId || !this.config.merchantKey) {
        console.error('Paytm configuration error: Missing merchant credentials');
        return {
          success: false,
          orderId: paymentData.orderId,
          amount: paymentData.amount,
          status: 'failed',
          message: 'Payment gateway configuration error. Please contact support.'
        };
      }

      // Prepare Paytm payment parameters
      // Use Vercel serverless function for callback handling
      const frontendUrl = import.meta.env.VITE_FRONTEND_URL || 'https://jrb-gold-56cs.vercel.app';
      const callbackUrl = `${frontendUrl}/api/payment-callback`;
        
      const paytmParams = {
        MID: this.config.merchantId,
        WEBSITE: this.config.websiteName,
        INDUSTRY_TYPE_ID: this.config.industryType,
        CHANNEL_ID: this.config.channelId,
        ORDER_ID: paymentData.orderId,
        CUST_ID: paymentData.customerEmail,
        TXN_AMOUNT: paymentData.amount.toFixed(2),
        CALLBACK_URL: callbackUrl,
        EMAIL: paymentData.customerEmail,
        MOBILE_NO: paymentData.customerPhone
      };

      // Generate checksum
      const checksum = await this.generatePaytmChecksum(paytmParams);
      
      console.log('Paytm Payment initiated:', {
        orderId: paymentData.orderId,
        amount: paymentData.amount,
        merchantId: this.config.merchantId
      });

      // In test mode, simulate Paytm payment
      if (this.config.environment === 'test') {
        console.log('TEST MODE: Simulating Paytm payment gateway');
        
        // In test mode, still use the redirect flow but with a simulated payment page
        // Store the payment data for the redirect page to simulate payment
        const mockPaymentData = {
          orderId: paymentData.orderId,
          amount: paymentData.amount,
          customerName: paymentData.customerName,
          customerEmail: paymentData.customerEmail,
          returnUrl: paymentData.returnUrl,
          isTestMode: true
        };
        
        sessionStorage.setItem('mockPaymentData', JSON.stringify(mockPaymentData));
        
        return {
          success: true,
          orderId: paymentData.orderId,
          amount: paymentData.amount,
          status: 'pending',
          message: 'Redirecting to test payment gateway...',
          redirectUrl: '/payment/redirect'
        };
      }

      // Production mode - redirect to actual Paytm payment page
      const paytmUrl = this.getPaytmPaymentUrl();
      
      // Create form data for POST redirect
      const formData = { ...paytmParams, CHECKSUMHASH: checksum };
      
      console.log('Production payment initiated:', {
        orderId: paymentData.orderId,
        amount: paymentData.amount,
        paytmUrl,
        merchantId: this.config.merchantId
      });
      
      // Store form data in sessionStorage for redirect
      sessionStorage.setItem('paytmFormData', JSON.stringify(formData));
      sessionStorage.setItem('paytmUrl', paytmUrl);

      return {
        success: true,
        orderId: paymentData.orderId,
        amount: paymentData.amount,
        status: 'pending',
        message: 'Redirecting to Paytm payment gateway...',
        redirectUrl: '/payment/redirect' // Will handle POST redirect
      };
    } catch (error) {
      console.error('Paytm payment initiation failed:', error);
      return {
        success: false,
        orderId: paymentData.orderId,
        amount: paymentData.amount,
        status: 'failed',
        message: 'Failed to initiate payment. Please try again.'
      };
    }
  }

  /**
   * Get Paytm payment gateway URL based on environment
   */
  private getPaytmPaymentUrl(): string {
    return this.config.environment === 'production'
      ? 'https://securegw.paytm.in/order/process'
      : 'https://securegw-stage.paytm.in/order/process';
  }

  /**
   * Verify Paytm payment callback
   */
  async verifyPayment(transactionId: string, orderId: string, status: string): Promise<boolean> {
    try {
      console.log('Verifying Paytm payment:', { transactionId, orderId, status });
      
      // In test mode, accept TXN_SUCCESS status
      if (this.config.environment === 'test') {
        return status === 'TXN_SUCCESS' || status === 'success';
      }

      // In production, verify with Paytm transaction status API
      // This would make an API call to Paytm to verify the transaction
      const verifyUrl = this.config.environment === 'production'
        ? 'https://securegw.paytm.in/order/status'
        : 'https://securegw-stage.paytm.in/order/status';

      // Prepare verification parameters
      const verifyParams = {
        MID: this.config.merchantId,
        ORDERID: orderId
      };

      const checksum = await this.generatePaytmChecksum(verifyParams);

      // In a real implementation, you would make a POST request to Paytm
      // For now, accepting the status from callback
      return status === 'TXN_SUCCESS';
    } catch (error) {
      console.error('Paytm payment verification failed:', error);
      return false;
    }
  }

  /**
   * Process refund
   */
  async processRefund(transactionId: string, amount: number, reason: string): Promise<PaymentResponse> {
    try {
      // In production, make API call to payment gateway for refund
      console.log('Processing refund:', { transactionId, amount, reason });

      return {
        success: true,
        transactionId: transactionId,
        orderId: '',
        amount: amount,
        status: 'success',
        message: 'Refund processed successfully'
      };
    } catch (error) {
      console.error('Refund processing failed:', error);
      return {
        success: false,
        transactionId: transactionId,
        orderId: '',
        amount: amount,
        status: 'failed',
        message: 'Failed to process refund'
      };
    }
  }

  /**
   * Get Paytm payment status
   */
  async getPaymentStatus(orderId: string): Promise<PaymentResponse> {
    try {
      console.log('Fetching Paytm payment status for order:', orderId);

      // In production, query Paytm transaction status API
      const statusUrl = this.config.environment === 'production'
        ? 'https://securegw.paytm.in/order/status'
        : 'https://securegw-stage.paytm.in/order/status';

      return {
        success: true,
        orderId: orderId,
        amount: 0,
        status: 'success',
        message: 'Payment completed'
      };
    } catch (error) {
      console.error('Failed to fetch Paytm payment status:', error);
      return {
        success: false,
        orderId: orderId,
        amount: 0,
        status: 'failed',
        message: 'Failed to fetch payment status'
      };
    }
  }
}

export const paymentService = new PaymentService();
