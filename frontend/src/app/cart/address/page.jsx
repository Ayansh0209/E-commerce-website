// app/cart/address/page.jsx
'use client';


import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DeliveryAdd from '@/app/components/cartpage/deliveryAdd';
export default function AddressPage() {
  

  return (
   <div>
    <DeliveryAdd />
    
    </div>
  );
}
