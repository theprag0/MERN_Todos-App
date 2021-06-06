import React, {Component} from 'react';
import axios from 'axios';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import './TodoList.css'; 

class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos:[]
        }
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.toggleTodo = this.toggleTodo.bind(this);
    }

    componentDidMount() {
        axios.get('/api/todos')
            .then(res => {
                this.setState(st => ({
                    todos: [...st.todos, ...res.data]
                }));
            })
    }

    addTodo(todo){
        axios.post('/api/todos', todo)
            .then(res => {
                this.setState({
                    todos: [...this.state.todos, res.data]
                });
            });
    }
    removeTodo(id){
        axios.delete(`/api/todos/${id}`)
            .then(res => {
                this.setState({
                    todos: this.state.todos.filter(todo => todo._id !== id)
                });
            });
    }
    updateTodo(id, updatedTodo){
        const updatedTodos = this.state.todos.map(t => {
            if(t._id === id){
                axios.put(`/api/todos/${id}`, {todo: updatedTodo})
                    .then(res => res.data);
                return {...t, todo:updatedTodo}
            }
            return t;
        })
        this.setState({todos:updatedTodos});
    }
    toggleTodo(id){
        const updatedTodos = this.state.todos.map(t => {
            if(t._id === id){
                axios.put(`/api/todos/${id}`, {completed: !t.completed})
                    .then(res => res.data);
                return {...t, completed: !t.completed}
            }
            return t;
        })
        this.setState({todos:updatedTodos});
    }
    render(){
        return (
            <div className="TodoList">
                <h1>Todo List 
                    <span>A Simple React Todo List App.</span>
                </h1>
                <ul>
                    {this.state.todos.map(({todo, _id, completed}) => {
                        return <Todo 
                            key={_id} 
                            id={_id} 
                            todo={todo}
                            removeTodo={this.removeTodo}
                            updateTodo={this.updateTodo}
                            toggleTodo={this.toggleTodo}
                            completed={completed}
                        />
                    })}
                </ul>
                <NewTodoForm addTodo={this.addTodo}/>
            </div>
        )
    }
}

export default TodoList;