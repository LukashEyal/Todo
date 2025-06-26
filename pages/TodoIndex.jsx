import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, toggleTodo, setFilter } from "../store/actions/todo.actions.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {

    const todos = useSelector(state => state.todoModule.todos)
    
    

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()
    
    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    const currentFilterBy = useSelector(state => state.todoModule.currentFilterBy)

    const dispatch = useDispatch()

   

    
 

    useEffect(() => {
        setSearchParams(currentFilterBy)
        loadTodos(currentFilterBy)
            .then(todos => showSuccessMsg(`Loaded todos`))
    }, [currentFilterBy])

    function onRemoveTodo(todoId) {
        const confirmed = window.confirm("Are you sure you want to delete this todo?")
        if (confirmed) {
        removeTodo(todoId)
            .then(() => {
              
                showSuccessMsg(`Todo removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }
}

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        toggleTodo(todoToSave)
            .then(() => {
               
                showSuccessMsg(`Todo is ${(todoToSave.isDone)? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoToSave._id)
            })
    }

    if (!todos) return <div>Loading...</div>
    
    return (
        <section className="todo-index">
            <TodoFilter filterBy={currentFilterBy} onSetFilterBy={setFilter} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}