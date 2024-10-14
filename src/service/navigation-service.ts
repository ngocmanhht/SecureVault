import * as React from 'react';
import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';

const navigationRef = React.createRef<NavigationContainerRef<any>>();

function reset(routeName: string, params?: object) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    }),
  );
}
function navigate(routeName: string, params?: object) {
  navigationRef.current?.navigate(routeName);
}
export const navigationService = {
  navigationRef,
  reset,
  navigate,
};
