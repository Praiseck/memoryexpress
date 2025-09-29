import { Redirect } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    console.log('[INDEX] Redirigiendo a /splash');
  }, []);

  return <Redirect href="/splash" />;
}