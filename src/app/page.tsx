'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Редирект на новую страницу
    console.log('Redirecting to /pages/pages');
    router.push('/pages');
  }, [router]);

  return null; // Или можно вернуть какой-то индикатор загрузки
}
