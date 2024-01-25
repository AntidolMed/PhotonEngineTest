'use client'

import { useEffect, useState, useMemo, Fragment } from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import { PulseLoader } from 'react-spinners';
import styles from '@/components/PEPunTest.module.scss'

export default function PEPunTest() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "UnityBuild/pun-build-web.loader.js",
    dataUrl: "UnityBuild/pun-build-web.data",
    frameworkUrl: "UnityBuild/pun-build-web.framework.js",
    codeUrl: "UnityBuild/pun-build-web.wasm",
  });

  const [windowSize, setWindowSize] = useState({
    width: 600,
    height: 800,
  });

  const diff = useMemo(() => {
    return 20
  }, [])

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth - diff,
        height: window.innerHeight - diff,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
     
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [diff]);

  return (
    <Fragment>
      { !isLoaded && (
        <div className={styles.container}>
          <div className={styles.item}>
            <PulseLoader color="#fff600"/>
          </div>
          <div className={styles.item}>Cargando, ya se inicia, rey...</div>
          <div className={styles.item}>Progreso: {Math.round(loadingProgression * 100)}%</div>
        </div>
      )}
      <Unity unityProvider={unityProvider} style={{ height: windowSize.height, width: windowSize.width, visibility: isLoaded ? "visible" : "hidden"}} />
    </Fragment>
  )
}
