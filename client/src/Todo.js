import React, {Component} from 'react';
import './Todo.css';

class Todo extends Component{
    constructor(props){
        super(props);
        this.state = {
            isEditting:false,
            todo:this.props.todo
        }
        this.handleRemove = this.handleRemove.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleRemove(){
        this.props.removeTodo(this.props.id);
    }
    toggleForm(){
        this.setState({isEditting: !this.state.isEditting});
    }
    handleChange(evt){
        this.setState({
            [evt.target.name] : evt.target.value
        });
    }
    handleUpdate(evt){
        evt.preventDefault();
        this.props.updateTodo(this.props.id, this.state.todo);
        this.toggleForm();
    }
    handleToggle(){
        this.props.toggleTodo(this.props.id);
    }
    render(){
       let result;
       if (this.state.isEditting){
           result = 
            <div className="Todo">
                <form onSubmit={this.handleUpdate} className="Todo-edit-form">
                    <input 
                        type="text"
                        name="todo"
                        value={this.state.todo}
                        placeholder="Update Todo"
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <button type="submit">Save</button>
                </form>
            </div>
       } else {
           result =  
                <div className="Todo">
                    <li 
                        className={this.props.completed ? "Todo-task completed" : 'Todo-task'}
                        onClick={this.handleToggle}
                        style={{cursor:"pointer"}}
                    >
                        {this.props.todo}
                    </li>
                    <div className="Todo-buttons">
                        <button onClick={this.toggleForm}><i className="fas fa-pen"></i></button>
                        <button onClick={this.handleRemove}><i className="fas fa-trash"></i></button>
                    </div>
                </div>
       }
        return result;
    }
}

export default Todo;