import '../styles/globals.css';
import { builder } from '@builder.io/react';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
