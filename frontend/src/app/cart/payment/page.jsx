// app/cart/payment/page.jsx
'use client';

import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();

  const placeOrder = async () => {
    // call backend to create order, return payment session, redirect to payment gateway, etc.
    alert('Place order (stub)');
    // after successful order you might router.push('/order/12345')
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Payment</h2>
      <div className="p-4 border rounded mb-4">
        {/* show payment options and order summary */}
        <button className="bg-pink-600 text-white px-6 py-3 rounded" onClick={placeOrder}>Pay Now</button>
      </div>
    </div>
  );
}
