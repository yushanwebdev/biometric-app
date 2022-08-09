import React, {FC} from 'react';
import {Button, Text, View} from 'react-native-ui-lib';
import Screen from '../../core/components/Screen';
import {useUser} from '../../core/hooks/useUser';
import {MainNavigationProps} from '../navigator';

const Dashboard: FC<MainNavigationProps<'Dashboard'>> = () => {
  const {setUser} = useUser();

  const logout = () => setUser({isLoggedIn: false, hasSessionExpired: false});
  const expireSession = () =>
    setUser({isLoggedIn: false, hasSessionExpired: true});

  return (
    <Screen>
      <View flex center>
        <Text text50BO marginV-s5 center>
          Welcome
        </Text>
        <Button label="Logout" onPress={logout} marginV-s2 />
        <Button label="Expire session" onPress={expireSession} marginV-s2 />
      </View>
    </Screen>
  );
};

export default Dashboard;
