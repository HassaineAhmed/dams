import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import Navbar from "./_components/navbar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }


  return (
    <div className='bg-white'>
      <Navbar />
      {children}
    </div>
  );
};

