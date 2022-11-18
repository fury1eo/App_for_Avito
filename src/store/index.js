import thunk from 'redux-thunk';
import { storyReducer } from './storyReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({ 
    reducer: storyReducer,
    middleware: [thunk],
    devTools: composeWithDevTools
});