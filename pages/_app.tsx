import "./styles/global.css";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './path/to/your/store';

function MyApp({ Component, pageProps }) {
  
  return <Component {...pageProps} />;
}

export default MyApp;
