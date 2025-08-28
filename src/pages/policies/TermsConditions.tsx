import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsConditions() {
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
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Last Updated: August 2025
        </p>
        
        <p className="mb-6">
          Welcome to JRB Gold. By accessing and using our website, store, or services, you agree to comply with and be bound by the following Terms & Conditions. These terms govern all purchases, transactions, and interactions with JRB Gold, whether in-store, online, or via our customer support channels.
        </p>
        
        <p className="mb-8 font-medium">
          If you do not agree with these terms, we kindly ask you to discontinue use of our services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. General Use</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>By engaging with JRB Gold, you confirm that you are at least 18 years of age or acting under the supervision of a legal guardian.</li>
          <li>You agree to use our services only for lawful purposes and in compliance with all applicable regulations.</li>
          <li>We reserve the right to refuse service, restrict access, or cancel transactions at our discretion if misuse, fraud, or policy violation is suspected.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Product Listings & Pricing</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>All product images, descriptions, and weights are provided for reference. Slight variations may occur due to the handmade and natural nature of gold and silver jewelry.</li>
          <li>Prices are based on prevailing gold and silver market rates and may change daily without prior notice.</li>
          <li>Errors in pricing or descriptions may occasionally occur; JRB Gold reserves the right to correct such errors, cancel affected orders, and issue refunds where applicable.</li>
          <li>For bulk or wholesale orders, minimum quantities apply, and final quotations will be provided directly to buyers.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Orders & Payments</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Orders are confirmed only after successful payment or advance (for made-to-order/custom items).</li>
          <li>We accept major credit/debit cards, UPI, net banking, and other secure digital payment methods.</li>
          <li>JRB Gold does not store payment information; all transactions are processed via secure third-party gateways.</li>
          <li>In case of duplicate charges, errors, or unauthorized transactions, customers must report immediately for resolution.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Shipping & Delivery</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Domestic and international shipping is offered via trusted courier/logistics partners.</li>
          <li>Estimated delivery timelines will be provided at checkout or during order confirmation.</li>
          <li>Tracking details will be shared once the order is dispatched.</li>
          <li>JRB Gold is not responsible for delays caused by third-party logistics, customs clearance, or force majeure events.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Custom & Personalized Orders</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Custom-made jewelry (engraved, personalized, or made-to-specification pieces) cannot be cancelled or refunded once production has begun.</li>
          <li>Production timelines for custom orders vary and will be communicated at the time of order confirmation.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. User Conduct</h2>
        <p className="mb-2">By using our services, you agree not to:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Provide false or misleading information</li>
          <li>Resell our products without authorization</li>
          <li>Misuse our website, images, or branding for unauthorized commercial purposes</li>
          <li>Engage in fraudulent chargebacks or abusive claims</li>
        </ul>
        <p className="mb-6">Violations may result in suspension of service or legal action.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Intellectual Property</h2>
        <p className="mb-6">
          All content on this website—including logos, jewelry designs, product images, and text—is the intellectual property of JRB Gold. Unauthorized use, reproduction, or distribution is strictly prohibited without written consent.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
        <p className="mb-2">JRB Gold shall not be held liable for:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Indirect or consequential losses arising from product use</li>
          <li>Minor variations in product appearance or weight</li>
          <li>Delays or disruptions caused by third-party logistics providers</li>
          <li>Any issues arising from customer negligence in handling or storing jewelry</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Governing Law & Jurisdiction</h2>
        <p className="mb-6">
          These Terms & Conditions are governed by the laws of India. Any disputes shall fall under the exclusive jurisdiction of courts located in Tamil Nadu.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
        <p className="mb-2">For any queries, clarifications, or disputes regarding these Terms & Conditions, please reach out to:</p>
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
