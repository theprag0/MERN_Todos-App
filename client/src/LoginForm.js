import React, {Component} from 'react';
import axios from 'axios';
import './RegisterForm.css';

class LoginForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            msg: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        const {email, password} = this.state;
        const body = {email, password};

        axios.post('/api/auth', body)
            .then(res => {
                const authState = {
                    ...res.data,
                    isAuthenticated: true,
                    userLoading: false,
                    msg: '',
                    status: res.status
                };
                this.props.setAuthState(authState);
                window.localStorage.setItem('token', res.data.token);
            }) 
            .catch(err => {
                this.setState({msg: err.response.data.msg});
                const authState = {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    isAuthenticated: false,
                    userLoading: false,
                    user: null
                };
                this.props.setAuthState(authState);
            });
    }

    render() {
        const {changeForm} = this.props;
        let error;
        if(this.state.msg) error = (
            <p className="error">
                <i class="fas fa-exclamation-circle fa-1x"></i> 
                {this.state.msg}
            </p>
        )
        return(
            <div className="RegisterForm">
                <h1>Todo List 
                    <span>A Simple React Todo List App.</span>
                </h1>
                <h2>Login</h2>
                {error}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={this.handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter a password"
                        onChange={this.handleChange}
                    />
                    <p>
                        <em>Not registered yet?</em> 
                        <span onClick={() => changeForm('register')}>SignUp</span>
                    </p>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;