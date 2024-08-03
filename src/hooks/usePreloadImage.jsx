import { useEffect, useState } from "react";

export default function usePreloadImage(images) {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const cacheImages = async (srcArray) => {
        const promises = srcArray.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        });
  
        await Promise.all(promises);
        setIsLoading(false);
      };
  
      cacheImages(images);
    }, [images]);


    return [isLoading]
}
