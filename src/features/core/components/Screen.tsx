import React from 'react';
import {View} from 'react-native-ui-lib';
import AppToast from './Toast';

const Screen: React.FC = ({children}) => (
  <View useSafeArea flex backgroundColor="white">
    {children}
    <AppToast />
  </View>
);

export default Screen;
