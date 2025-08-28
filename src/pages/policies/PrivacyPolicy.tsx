import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your Privacy, Our Promise of Transparency
        </p>
        
        <p className="mb-6">
          At JRB Gold, your trust is our most valuable asset. Since our founding in 2016, we've built our reputation on offering genuine, high-quality gold and silver jewelry at fair prices—with honesty and transparency at the heart of every transaction. Protecting your privacy and safeguarding the information you share with us is an extension of these values.
        </p>

        <p className="mb-6">
          This Privacy Policy explains what data we collect, how we use it, how it's protected, and your rights as a valued customer.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
        <p className="mb-4">
          When you interact with our website, store, or customer service team, we may collect:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Full Name</li>
          <li>Contact details (email, phone number)</li>
          <li>Billing & shipping address</li>
          <li>Payment details (processed via secure third-party gateways – we do not store card details)</li>
          <li>Order history & jewelry preferences</li>
          <li>Business details (for wholesale/B2B clients)</li>
          <li>Device, browser, and cookie data (for website analytics)</li>
        </ul>
        <p className="mb-6">We only collect the information necessary to provide you with seamless shopping, customization, and support experiences.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why We Collect Your Information</h2>
        <p className="mb-4">Your information helps us to:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Process orders, invoices, and payments securely</li>
          <li>Provide shipping and delivery updates</li>
          <li>Offer customer service and after-sales support</li>
          <li>Customize offers or savings schemes (with your consent)</li>
          <li>Share promotions, updates, or newsletters (optional opt-in)</li>
          <li>Improve our website and in-store experience</li>
          <li>Comply with legal, tax, and regulatory requirements</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Protect Your Information</h2>
        <p className="mb-4">We follow strict security protocols to ensure your information is safe:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>SSL Encryption on all website interactions</li>
          <li>PCI-compliant payment gateways (we never store payment data)</li>
          <li>Firewall & server protections for data storage</li>
          <li>Limited access to sensitive customer information (only authorized staff)</li>
          <li>Regular monitoring and audits of our systems</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights & Choices</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Request access to the data we hold about you</li>
          <li>Update or correct your personal details</li>
          <li>Request deletion of your information (subject to legal obligations)</li>
          <li>Opt out of marketing emails or WhatsApp updates at any time</li>
          <li>Raise privacy concerns directly with our team</li>
        </ul>
        <p className="mb-6">We aim to respond to all verified requests within 30 days.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Sharing</h2>
        <p className="mb-6">We do not sell or rent your information. Data may be shared only with:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Courier/logistics partners (for order deliveries)</li>
          <li>Payment processors (for secure transaction handling)</li>
          <li>Regulatory authorities, if legally required</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Policy Updates</h2>
        <p className="mb-6">
          From time to time, we may update this Privacy Policy to reflect new services, technology, or legal requirements. The revised policy will always be published on our website with the "Last Updated" date.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p className="mb-2">If you have questions or concerns about your data, please contact:</p>
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
          Last updated: August 28, 2024
        </p>
      </div>
    </div>
  );
}
