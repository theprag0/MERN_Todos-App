import React, {Component} from 'react';
import './NewTodoForm.css';

class NewTodoForm extends Component{
    constructor(props){
        super(props);
        this.state = {todo:''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(evt){
        evt.preventDefault();
        this.props.addTodo({...this.state});
        this.setState({todo:''});
    }
    handleChange(evt){
        this.setState({
            [evt.target.name] : evt.target.value
        });
    }
    render(){
       return (
               <form onSubmit={this.handleSubmit} className="NewTodoForm">
                   <label htmlFor="todo">New Todo</label>
                    <input 
                        id="todo"
                        name="todo" 
                        onChange={this.handleChange} 
                        value={this.state.todo}
                    />
                    <button type="submit">ADD TODO</button>
               </form>
       )
    }
}

export default NewTodoForm;