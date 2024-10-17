// pages/index.tsx or pages/page.tsx

import React from 'react';
import { cookies } from 'next/headers';
import NotLogin from '@/components/auth/NotLogin';
import Profile from '@/components/auth/Profile';

export default function Page() {
  const cookieStore = cookies(); 
  const loginCookie = cookieStore.get('customer'); 

  return (
    <div>
    
      {loginCookie ? (
        <Profile/>
      ) : (
        <NotLogin/>
      )}
    </div>
  );
}
