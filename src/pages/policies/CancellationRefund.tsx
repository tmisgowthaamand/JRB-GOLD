import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CancellationRefund() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-4">Cancellation & Refund Policy</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Fair, Transparent, and Customer-Centric
        </p>
        
        <p className="mb-6">
          At JRB Gold, we strive to deliver genuine, high-quality gold and silver jewelry with complete transparency. While we work hard to ensure every order meets your expectations, we recognize that occasional issues may arise. This policy outlines how cancellations, returns, and refunds are handled for retail and wholesale customers.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Order Cancellations</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Retail Orders:</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Cancellations must be requested within 2 hours of order placement.</li>
          <li>Once an order is processed, packed, or dispatched, cancellations are not possible.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Custom/Personalized Jewelry:</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Orders for engraved, made-to-order, or specially customized items cannot be cancelled once production begins.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Wholesale Orders:</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Cancellations for bulk or trade orders are subject to the agreed purchase contract.</li>
          <li>Any cancellation after procurement or production has begun may incur a restocking or processing fee.</li>
        </ul>

        <p className="mb-6">To request cancellation, contact us via phone or email with your Order ID and details.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Returns & Exchanges</h2>
        <p className="mb-4">We maintain strict quality checks before dispatch. However, if you receive:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>A damaged product</li>
          <li>A wrong item or incorrect order fulfillment</li>
          <li>A manufacturing defect</li>
        </ul>
        <p className="mb-6">You must report the issue within 48 hours of delivery.</p>
        <p className="mb-4">On verification, we will provide one of the following:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Replacement of the same product</li>
          <li>Exchange with another item of equal value</li>
          <li>Refund (where replacement is not possible)</li>
        </ul>
        <p className="mb-6 text-sm text-muted-foreground">
          Note: Minor variations in weight, finish, or design (common with handcrafted jewelry) are not considered defects.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Non-Returnable Items</h3>
        <p className="mb-4">We cannot accept returns or refunds for:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Custom-made, engraved, or personalized jewelry</li>
          <li>Items damaged due to improper handling after delivery</li>
          <li>Products returned without prior authorization</li>
          <li>Orders where tamper-proof packaging is broken or missing</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Refund Process</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Once a refund is approved, it will be initiated within 3–5 business days.</li>
          <li>Refunds are processed via the original payment method (card, UPI, bank transfer).</li>
          <li>Refund timelines depend on your bank/payment provider (usually 5–10 business days).</li>
          <li>For wholesale/export clients, refunds may be adjusted as credit notes for future orders, based on contractual terms.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Exceptions</h2>
        <p className="mb-4">Refunds or cancellations will not apply in the following cases:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Delays caused by courier/logistics partners beyond our control</li>
          <li>Daily fluctuations in gold/silver market rates affecting price differences</li>
          <li>Change of mind after dispatch or acceptance of delivery</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Need Assistance?</h2>
        <p className="mb-4">For support with cancellations, refunds, or return claims, please contact:</p>
        <address className="not-italic mb-6">
          JRB Gold<br />
          Address - No: 1539, 1st Floor,<br />
          Soundar Complex, Vellore Road<br />
          Near Anna Arch<br />
          Thiruvannamalai<br />
          Tamil Nadu - 606604<br />
          Mobile - 82204 21317<br />
          Email: contact@jrbgold.co.in<br />
          Website: https://www.jrbgold.co.in
        </address>

        <p className="mt-8 text-sm text-muted-foreground">
          Last updated: August 2025
        </p>
      </div>
    </div>
  );
}
