import React, {Component} from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: window.localStorage.getItem('token'),
      isAuthenticated: false,
      userLoading: false,
      user: null,
      msg: null,
      status: null,
      form: 'register'
    }
    this.changeForm = this.changeForm.bind(this);
    this.setAuthState = this.setAuthState.bind(this);
  }

  componentDidMount() {
    this.setState({userLoading: true})
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    if(this.state.token) {
      config.headers['x-auth-token'] = this.state.token;
    }
    axios.get('/api/auth/user', config)
      .then(res => {
        this.setState({
          userLoading: false,
          isAuthenticated: true,
          user: res.data
        });
      })
      .catch(err => {
        this.setState(st => ({
          ...st,
          token: null,
          isAuthenticated: false,
          userLoading: false,
          user: null,
          msg: err.response.data.msg,
          status: err.response.status
        }));
      });
  }

  setAuthState(res){
    this.setState(st => ({
      ...st,
      ...res
    }))
  }

  changeForm(formName) {
    this.setState({form: formName});
  }

  render() {
    const {isAuthenticated, form} = this.state;

    let authComponent;
    if(form === 'register') {
      authComponent = <RegisterForm changeForm={this.changeForm} setAuthState={this.setAuthState}/>
    } else if (form === 'login') {
      authComponent = <LoginForm changeForm={this.changeForm} setAuthState={this.setAuthState}/>
    }

    return (
      <div>
        {isAuthenticated 
          ? 
          <TodoList setAuthState={this.setAuthState} token={this.state.token} userId={this.state.user.id}/> 
          :
          authComponent
        }
      </div>
    );
  }
}

export default App;