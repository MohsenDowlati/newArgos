// Imports 
import { useRouter } from 'next/router';

// Page formatter function
const PageTitle = () => {

    // Get current path
    const { asPath } = useRouter();

    // Return
    return(
        asPath
            .split('/')  
            .slice(2)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' / ')
    );

}

export default PageTitle