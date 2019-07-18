import React, { Component } from 'react';
import Axios from 'axios';
import classes from './auth.css'
import { Redirect, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';


class Auth extends Component {

    state = {
        email: '',
        password: '',
        isSignup: true,
        isAuthenticated: false
    }

    onSignup = () => {
        this.setState({
            isSignup: !this.state.isSignup
        })
    }

    emailchangehandler = (e) => {
        this.setState({ email: e.target.value })
    }
    passswordchangehandler = (e) => {
        this.setState({ password: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault();
        let url;

        if (this.state.isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDYITZ-jtuH88qB1Vn6tmDYb8BDDoryq0M'
        }
        else {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDYITZ-jtuH88qB1Vn6tmDYb8BDDoryq0M'
        }

        const userdata = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        }

        Axios.post(url, userdata)
            .then(res => {
                console.log(res.data);
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId)
                this.setState({ isAuthenticated: true })
                const localtoken = localStorage.getItem('token');
                console.log(localtoken);
                if (this.state.isAuthenticated) {
                    this.props.onAuth(localtoken)
                    this.props.history.push('/orders')
                }
            })
            .catch(err => alert('Email and Password are Wrong'))
    }




    render() {
        return (
            <div>
                <div className={classes.Auth} >
                    <form onSubmit={this.submitHandler} className={classes.formdesign} style={{ width: "30%", margin: "auto", boxShadow: "2px 2px 2px 2px #ccc", padding: "20px" }}>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" value={this.state.email} onChange={this.emailchangehandler} placeholder="email" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" value={this.state.password} onChange={this.passswordchangehandler} placeholder="password" />
                        </div>
                        <button style={{ width: "100px", margin: "auto" }} class="btn btn-success" type="submit">SUBMIT</button>
                        <p style={{ color: "green", marginTop: "20px", cursor: "pointer" }} onClick={this.onSignup}> SWITCH TO {this.state.isSignup ? 'SIGNUP' : 'LOGIN'}</p>
                    </form>

                </div>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: ((token) => dispatch({ type: 'login', value: token }))
    };
};






export default connect(null, mapDispatchToProps)(Auth);