import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const AuthRoutes = {
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

export type AuthRoutesProp = {
  [AuthRoutes.LOGIN]: undefined;
  [AuthRoutes.SIGNUP]: undefined;
};

export interface AuthNavigationProps<TRouteName extends keyof AuthRoutesProp> {
  navigation: NativeStackNavigationProp<AuthRoutesProp, TRouteName>;
  route: RouteProp<AuthRoutesProp, TRouteName>;
}
