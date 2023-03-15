// Imports
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/tailwind.css'
import 'focus-visible'

// Function to run App
export default function App({ Component, pageProps }) {

    // Default loading
    return (
        <Component {...pageProps} />
    )
}