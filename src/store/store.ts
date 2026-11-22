import { createStore, compose, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { dataReducer } from './reducers/DataReducer'


export const store = createStore(
    dataReducer,
    compose (
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)