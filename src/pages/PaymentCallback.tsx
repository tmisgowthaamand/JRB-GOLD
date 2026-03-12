import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { paymentService } from '@/services/paymentService';

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing');
  const [message, setMessage] = useState('Processing your payment...');

  // Add error boundary
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Debug: Log all search params
        const allParams = Object.fromEntries(searchParams.entries());
        console.log('Payment callback received with params:', allParams);
        console.log('All URL params:', window.location.search);
        
        // Check if this is a POST callback (Paytm sends form data)
        // In this case, we'll handle it as GET parameters
        let transactionId = searchParams.get('TXNID') || searchParams.get('txnid') || searchParams.get('TXNID');
        let orderId = searchParams.get('ORDERID') || searchParams.get('orderid') || searchParams.get('ORDER_ID');
        let paymentStatus = searchParams.get('STATUS') || searchParams.get('status');
        let responseCode = searchParams.get('RESPCODE') || searchParams.get('respcode');
        let responseMsg = searchParams.get('RESPMSG') || searchParams.get('respmsg');
        let txnAmount = searchParams.get('TXNAMOUNT') || searchParams.get('txnamount');

        console.log('Extracted params:', {
          transactionId,
          orderId,
          paymentStatus,
          responseCode,
          responseMsg,
          txnAmount
        });

        // If no URL parameters, check if data was passed via sessionStorage (from POST)
        if (!transactionId && !orderId && !paymentStatus) {
          const postData = sessionStorage.getItem('paytmCallbackData');
          if (postData) {
            const data = JSON.parse(postData);
            transactionId = data.TXNID;
            orderId = data.ORDERID;
            paymentStatus = data.STATUS;
            responseCode = data.RESPCODE;
            responseMsg = data.RESPMSG;
            sessionStorage.removeItem('paytmCallbackData');
          }
        }

        // If still no parameters, this might be a direct access
        if (!orderId || !paymentStatus) {
          setStatus('failed');
          setMessage(`Missing required parameters. OrderID: ${orderId || 'missing'}, Status: ${paymentStatus || 'missing'}`);
          console.error('Missing payment parameters:', { 
            transactionId, 
            orderId, 
            paymentStatus,
            allParams 
          });
          return;
        }

        // Transaction ID is optional for some payment methods
        if (!transactionId) {
          console.warn('Transaction ID missing, using order ID as fallback');
          transactionId = orderId;
        }

        const isValid = await paymentService.verifyPayment(
          transactionId,
          orderId,
          paymentStatus
        );

        // Paytm success status is 'TXN_SUCCESS'
        if (isValid && (paymentStatus === 'TXN_SUCCESS' || paymentStatus === 'success')) {
          setStatus('success');
          setMessage(responseMsg || 'Payment completed successfully!');
          
          // Update order status in localStorage
          const userEmail = localStorage.getItem('userEmail');
          if (userEmail) {
            const userOrdersKey = `orders_${userEmail}`;
            const orders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
            const updatedOrders = orders.map((order: any) => 
              order.id === orderId 
                ? { ...order, paymentStatus: 'completed', transactionId, paymentGateway: 'Paytm' }
                : order
            );
            localStorage.setItem(userOrdersKey, JSON.stringify(updatedOrders));
          }

          // Redirect to order details after 2 seconds
          setTimeout(() => {
            navigate(`/order/${orderId}`);
          }, 2000);
        } else {
          setStatus('failed');
          setMessage(responseMsg || 'Payment verification failed. Please contact support.');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setHasError(true);
        setStatus('failed');
        setMessage('An error occurred while verifying payment.');
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  // If there's an error, show a simple error page
  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">There was an error processing the payment callback.</p>
          <p className="text-sm text-gray-500 mb-4">URL: {window.location.href}</p>
          <button 
            onClick={() => navigate('/checkout')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Return to Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {status === 'processing' && (
          <>
            <Loader2 className="h-16 w-16 text-yellow-600 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to order details...</p>
          </>
        )}

        {status === 'failed' && (
          <>
            <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/cart')}
                className="w-full"
              >
                Return to Cart
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                variant="outline"
                className="w-full"
              >
                Contact Support
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
