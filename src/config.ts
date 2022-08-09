import Config from 'react-native-config';

interface IConfig {
  apiUrl: string;
}

export const config: IConfig = {
  apiUrl: Config.API_URL,
};
