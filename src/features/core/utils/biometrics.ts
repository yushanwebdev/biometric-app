import * as LocalAuthentication from 'expo-local-authentication';

const authenticate = async (
  options: LocalAuthentication.LocalAuthenticationOptions,
) => {
  // - ios in case of wrong attempts with biometrics, fallback passcode is prompted and upon success returns true boolean
  // {result: {error: user_cancel}} - when biometrics is cancelled by user (both biometrics and passcode)
  try {
    const result = await LocalAuthentication.authenticateAsync(options);
    return result.success;
  } catch (error) {
    console.error(error);
  }
};

export default {authenticate};
