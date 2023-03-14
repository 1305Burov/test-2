import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <App />
    </Provider>
)
