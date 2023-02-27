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

    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])
    return (
      <Provider store={store}>
          <Head>
              <script
                  dangerouslySetInnerHTML={{
                      __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
                  }}
              />
          </Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Component {...pageProps} />
          <ToastContainer />
      </Provider>

  )
}
