import 'tailwindcss/tailwind.css';
import "@material-tailwind/react/tailwind.css";
import Head from 'next/head';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {

  return (
  <>
    <Provider>
    <Head>
       <title>Muse Docs</title>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </Head>
    <Component {...pageProps} />
    </Provider>
  </>
  )
}

export default MyApp
