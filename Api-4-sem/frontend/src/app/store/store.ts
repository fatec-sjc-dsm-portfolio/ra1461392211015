import { createStore } from 'redux';
import rootReducer from './Page/Page.reducer';

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;