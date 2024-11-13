import { useState, useEffect } from 'react';
const useLoading = (): { isLoading: boolean; startLoading: () => void; stopLoading: () => void } => {
    const [isLoading, setIsLoading] = useState(false);
  
    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);
  
    return { isLoading, startLoading, stopLoading };
  };
  export default useLoading;
    