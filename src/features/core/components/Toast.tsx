import React from 'react';
import {Toast} from 'react-native-ui-lib';
import {useToast} from '../hooks/useToast';

const AppToast = () => {
  const {toast, setToast} = useToast();
  return (
    <Toast
      position="bottom"
      autoDismiss={3000}
      onDismiss={() => setToast({visible: false})}
      {...toast}
    />
  );
};

export default AppToast;
