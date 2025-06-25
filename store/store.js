import { todoReducr } from "./reducers/todo.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"

const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
    todoModule: todoReducr,
    userModule: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

// window.gStore = store
// console.log('store:', store.getState())

// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })
