import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const MainRoutes = {
  DASHBOARD: 'Dashboard',
} as const;

export type MainRoutesProp = {
  [MainRoutes.DASHBOARD]: undefined;
};

export interface MainNavigationProps<TRouteName extends keyof MainRoutesProp> {
  navigation: NativeStackNavigationProp<MainRoutesProp, TRouteName>;
  route: RouteProp<MainRoutesProp, TRouteName>;
}
