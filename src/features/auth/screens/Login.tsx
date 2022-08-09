import React, {FC, useCallback, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Button, View} from 'react-native-ui-lib';
import {ILoginValues} from '../screens/types';
import AppTextInput from '../../core/components/AppTextInput';
import Screen from '../../core/components/Screen';
import {AuthNavigationProps, AuthRoutes} from '../navigation';
import {
  ACCESS_CONTROL,
  getGenericPassword,
  Options,
  setGenericPassword,
} from 'react-native-keychain';
import {useUser} from '../../core/hooks/useUser';
import {useToast} from '../../core/hooks/useToast';
import {config} from '../../../config';

export const LOGIN_SERVICE = 'LOGIN_SERVICE';
export const CREDENTIALS_STORAGE_OPTIONS: Options = {
  accessControl: ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
  service: LOGIN_SERVICE,
};

const Login: FC<AuthNavigationProps<'Login'>> = ({navigation}) => {
  const {control, handleSubmit} = useForm();
  const {user, setUser} = useUser();
  const [showCredentials, setShowCredentials] = useState(false);
  const toast = useToast();

  const showSignup = () => {
    navigation.navigate(AuthRoutes.SIGNUP);
  };

  const login: SubmitHandler<ILoginValues> = async ({email, password}) => {
    try {
      await setGenericPassword(email, password, CREDENTIALS_STORAGE_OPTIONS);
      setUser({isLoggedIn: true, hasSessionExpired: false});
      toast.setToast({message: 'Login has succeeded', visible: true});
    } catch (error) {
      console.log('error', (error as Error).message);
    }
  };

  const handleBiometricsLogin = useCallback(async () => {
    if (!user?.hasSessionExpired) {
      toast.setToast({message: 'No expired session'});
      return;
    }
    try {
      const credentials = await getGenericPassword(CREDENTIALS_STORAGE_OPTIONS);
      console.log({credentials});
      if (!credentials) {
        return;
      }
      const res = await fetch(`${config.apiUrl}/api/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: credentials.username,
          password: credentials.password,
        }),
      });
      if (res.ok) {
        setUser({isLoggedIn: true, hasSessionExpired: false});
        toast.setToast({
          message: 'Login with biometrics has succeeded',
          visible: true,
        });
      }
    } catch (error) {
      toast.setToast({message: 'Login with biometrics failed'});
    }
  }, [setUser, toast, user?.hasSessionExpired]);

  return (
    <Screen>
      <View flex center>
        {user?.hasSessionExpired && (
          <>
            <Button
              label="Login With Biometrics"
              onPress={handleBiometricsLogin}
              green10
              marginV-s2
            />

            <Button
              label="Login With Credentials"
              onPress={() => setShowCredentials(val => !val)}
              green10
              marginV-s2
              link
            />
          </>
        )}

        {(!user?.hasSessionExpired || showCredentials) && (
          <>
            <AppTextInput
              control={control}
              name="email"
              label="Email"
              inputProps={{keyboardType: 'email-address', autoCorrect: false}}
            />
            <AppTextInput
              control={control}
              name="password"
              label="Password"
              inputProps={{secureTextEntry: true}}
            />
            <Button
              link={user?.hasSessionExpired}
              label="Login"
              onPress={() => handleSubmit(login)()}
              marginV-s2
            />
          </>
        )}

        <Button link label="Signup" onPress={showSignup} green10 marginV-s2 />

        {/* <Button
          link
          label="Set Generic"
          onPress={async () => {
            const set = await setGenericPassword(
              'email',
              'password',
              CREDENTIALS_STORAGE_OPTIONS,
            );
            console.log({set});
          }}
          green10
          marginV-s1
        />
        <Button
          link
          label="Retrieve Generic"
          onPress={async () => {
            const credentials = await getGenericPassword(
              CREDENTIALS_STORAGE_OPTIONS,
            );
            console.log({credentials});
          }}
          green10
          marginV-s1
        />
        <Button
          link
          label="Reset Generic"
          onPress={async () => {
            const result = await resetGenericPassword({
              service: LOGIN_SERVICE,
            });
            console.log({result});
          }}
          green10
          marginV-s1
        /> */}
      </View>
    </Screen>
  );
};

export default Login;
