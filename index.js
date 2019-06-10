import {
    bootstrap
} from './src/bootstrap';
import { Client } from 'bugsnag-react-native';
import { config } from '@app/config';
const bugsnag = new Client(config.bugsnagAPIKey);
bootstrap();