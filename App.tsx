import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { DevSettings, LogBox } from 'react-native';
import { TabNavigator } from 'src/navigation';
import { MainStackParamList } from 'src/types/navigation';
import { StoreContext } from 'src/context';
import RootStore, { TRootStore } from 'src/store/root-store';
import { movieStore } from 'src/store/movie-store';
import { networkStore } from 'src/store/network-store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from 'src/navigation/ref';
import { useAppState } from '@react-native-community/hooks';
import { clearData } from 'src/utils/storage';
import NetInfo from '@react-native-community/netinfo';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { FlashBox } from 'src/components';
import { getScreenName, getStackName } from 'src/utils/navigation';
import Reactotron from 'reactotron-react-native';
import { MovieDetail } from 'src/screens';
import { enableScreens } from 'react-native-screens';

enableScreens()

LogBox.ignoreAllLogs(true)

if (__DEV__) {
  Reactotron.configure({})
    .useReactNative()
    .connect();
}

const Stack = createNativeStackNavigator<MainStackParamList>();

export type MainStackNavigatorType = typeof Stack;

const store: TRootStore = RootStore.create({
  movie: movieStore,
  network: networkStore
});

function App(): React.JSX.Element {
  const routeNameRef = React.useRef<string>();

  const initializeStores = async () => {
    try {
      await store.movie.init();
    } catch (err) {
      // eslint-disable-next-line no-console
      __DEV__ && console.log(err);
    }
  }

  useEffect(() => {
    initializeStores()
  }, [])

  useEffect(() => {
    if (!__DEV__) return;
    DevSettings.addMenuItem('Clear Data', async () => {
      await clearData();
      DevSettings.reload();
    });
  }, []);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (state.isInternetReachable === false) {
        showMessage({ message: "Oh no! Looks like we've lost connection 😔" });
        store.network.set('isOffline', true);
        store.network.set('isShowingMessage', true);
      } else if (
        state.isInternetReachable === true &&
        store.network.isOffline
      ) {
        showMessage({
          message: "You're back online :)",
        });
        store.network.set('isOffline', false);
      }
    });
  }, [store.network]);

  const onStateChange = async () => {
    if (store.network.isOffline && !store.network.isShowingMessage) {
      const result = await NetInfo.fetch();
      if (result?.isInternetReachable === false) {
        showMessage({
          message: "Oh no! Looks like we've lost connection 😔",
          type: 'warning',
          style: { backgroundColor: 'red' },
          autoHide: false,
          onPress: () => {
            store.network.set('isShowingMessage', false);
          },
        });
        store.network.set('isShowingMessage', true);
      }
    }
    const currentRouteName = getScreenName(
      navigationRef.current.getRootState(),
    );

    const currentRouteStack = getStackName(
      navigationRef.current.getRootState(),
    );

    const previousRouteName = routeNameRef.current;

    routeNameRef.current = currentRouteName;
  };


  return <StoreContext.Provider value={{ store }}>
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          const currentRoute =
            navigationRef.current.getCurrentRoute();
          if (currentRoute)
            routeNameRef.current = currentRoute.name;
        }}
        onStateChange={onStateChange}
      >
        <Stack.Navigator
        >
          <Stack.Screen
            options={({ route, navigation }) => ({
              title: 'Mytheresa Movies'
            })}
            name="HomeTab"
            component={TabNavigator}
          />
          <Stack.Screen
            options={({ route, navigation }) => ({
              title: route.params.title
            })}
            name="MovieDetail"
            component={MovieDetail}
          />
        </Stack.Navigator>
        <FlashMessage
          MessageComponent={FlashBox}
          autoHide
        />
      </NavigationContainer>
    </SafeAreaProvider>
  </StoreContext.Provider>


}




export default App;
