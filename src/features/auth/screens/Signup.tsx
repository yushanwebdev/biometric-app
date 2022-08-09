import React, {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {setGenericPassword} from 'react-native-keychain';
import {Button, View} from 'react-native-ui-lib';
import {config} from '../../../config';
import AppTextInput from '../../core/components/AppTextInput';
import Screen from '../../core/components/Screen';
import {useToast} from '../../core/hooks/useToast';
import {useUser} from '../../core/hooks/useUser';
import {AuthNavigationProps} from '../navigation';
import {CREDENTIALS_STORAGE_OPTIONS} from './Login';
import {ISignupValues} from './types';

const Signup: FC<AuthNavigationProps<'Signup'>> = () => {
  const {control, handleSubmit} = useForm();
  const {setUser} = useUser();
  const toast = useToast();

  const signup: SubmitHandler<ISignupValues> = async ({email, password}) => {
    try {
      const res = await fetch(`${config.apiUrl}/api/signup`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.ok) {
        await setGenericPassword(email, password, CREDENTIALS_STORAGE_OPTIONS);
        setUser({isLoggedIn: true, hasSessionExpired: false});
        toast.setToast({message: 'Signup has succeeded', visible: true});
      }
    } catch (error) {
      toast.setToast({message: 'Signup failed', visible: true});
    }
  };

  return (
    <Screen>
      <View flex center>
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
        <Button label="Sign up" onPress={() => handleSubmit(signup)()} />
      </View>
    </Screen>
  );
};

export default Signup;
