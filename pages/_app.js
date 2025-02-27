// pages/_app.js
import '../src/app/globals.css'; // Убедитесь, что путь правильный
import React from 'react';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;