import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'


class Logout extends Component {

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
    }


    render() {
        return (
            <div>
                <Link to="/" style={{ cursor: "pointer" }} onClick={this.logout} >Logout</Link>
            </div>
        )
    }
}


export default Logout;