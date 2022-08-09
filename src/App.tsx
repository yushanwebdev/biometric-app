import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ButtonProps, Colors, ThemeManager} from 'react-native-ui-lib';
import {ToastContextProvider} from '../src/features/core/hooks/useToast';
import Navigator from '../src/features/navigation/navigator';
import 'react-native-gesture-handler';
import {UserContextProvider} from './features/core/hooks/useUser';

ThemeManager.setComponentTheme('Button', (props: ButtonProps) => ({
  color: props.link ? Colors.green10 : 'white',
  backgroundColor: Colors.green10,
}));

const App = () => (
  <SafeAreaProvider>
    <UserContextProvider>
      <ToastContextProvider>
        <Navigator />
      </ToastContextProvider>
    </UserContextProvider>
  </SafeAreaProvider>
);

export default App;
