import React, {ReactElement, useCallback, useEffect, useState} from 'react';

import {StatusBar, ActivityIndicator} from 'react-native';
import {InitialState, NavigationContainer} from '@react-navigation/native';
// import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${30}`;

// export type FontSource = Parameters<typeof Font.loadAsync>[0];
// const usePromiseAll = (promises: Promise<void | void[]>[], cb: () => void) =>
//   useEffect(() => {
//     (async () => {
//       await Promise.all(promises);
//       cb();
//     })();
//   });

// const useLoadAssets = (assets: number[], fonts: FontSource): boolean => {
//   const [ready, setReady] = useState(false);
//   usePromiseAll(
//     [Font.loadAsync(fonts), ...assets.map(asset => Asset.loadAsync(asset))],
//     () => setReady(true),
//   );
//   return ready;
// };

interface LoadAssetsProps {
  // fonts?: FontSource;
  // assets?: number[];
  children: ReactElement | ReactElement[];
}

const LoadAssets = ({children}: LoadAssetsProps) => {
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState<InitialState | undefined>();
  // const ready = useLoadAssets(assets || [], fonts || {});
  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(
          NAVIGATION_STATE_KEY,
        );
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;
        setInitialState(state);
      } finally {
        setIsNavigationReady(true);
      }
    };

    if (!isNavigationReady) {
      restoreState();
    }
  }, [isNavigationReady]);
  const onStateChange = useCallback(
    async state =>
      await AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    [],
  );
  if (!isNavigationReady) {
    return <ActivityIndicator />;
  }
  return (
    <NavigationContainer {...{onStateChange, initialState}}>
      <StatusBar barStyle={"light-content"}/>
      {children}
    </NavigationContainer>
  );
};

export default LoadAssets;
