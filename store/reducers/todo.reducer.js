export const SET_TODOS = 'SET_TODOS'
export const CHANGE_TXT = 'CHANGE_TXT'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'






const initialState = {
todos: []
}




export function todoReducr(state = initialState, cmd) {
    switch (cmd.type) {
        case SET_TODOS:
            return {
                ...state,
                todos: cmd.todos
            }
        
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== cmd.todoId)
            }


        case TOGGLE_TODO:
            return {
                ...state,
                // setTodos(prevTodos => prevTodos.map(currTodo => (currTodo._id !== todo._id) ? currTodo : { ...savedTodo }))
                todos: state.todos.map(todo => 
                    (todo._id !== cmd.todo._id) ? todo : { ...cmd.todo }
                )
            }

        case CHANGE_TXT:
            return {
                ...state,
                // setTodos(prevTodos => prevTodos.map(currTodo => (currTodo._id !== todo._id) ? currTodo : { ...savedTodo }))
                todos: state.todos.map(todo => 
                    (todo._id !== cmd.todo._id) ? todo : { ...cmd.todo }
                )
            }


        default:
            return state
    }
}
