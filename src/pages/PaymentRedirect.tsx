import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function PaymentRedirect() {
  useEffect(() => {
    // Get form data from sessionStorage
    const formDataStr = sessionStorage.getItem('paytmFormData');
    const paytmUrl = sessionStorage.getItem('paytmUrl');

    if (formDataStr && paytmUrl) {
      const formData = JSON.parse(formDataStr);
      
      // Create a form and submit it to Paytm
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paytmUrl;
      form.style.display = 'none';

      // Add all form fields
      Object.keys(formData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = formData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      // Clean up sessionStorage
      sessionStorage.removeItem('paytmFormData');
      sessionStorage.removeItem('paytmUrl');
    } else {
      // Redirect back to checkout if no form data
      window.location.href = '/checkout';
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <Loader2 className="h-16 w-16 text-yellow-600 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Redirecting to Payment Gateway</h2>
        <p className="text-gray-600">Please wait while we redirect you to Paytm...</p>
        <p className="text-sm text-gray-500 mt-4">
          If you are not redirected automatically, please go back and try again.
        </p>
      </div>
    </div>
  );
}