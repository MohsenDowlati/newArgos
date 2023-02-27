import '@/styles/tailwind.css'
import 'focus-visible'
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "../store/index";
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/router";
import {useEffect} from "react";
import Script from "next/script";
import Head from "next/head";

export default function App({ Component, pageProps }) {


    return (
      <Provider store={store}>
          <Head>
          </Head>
          <Component {...pageProps} />
          <ToastContainer />
      </Provider>

  )
}
