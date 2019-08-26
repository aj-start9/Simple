import React, { Component } from 'react';
import Axios from 'axios';
// import * as firebase from 'firebase';
import firebase1 from './firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './order.css';
import List from './List.js';
import { connect } from 'react-redux';
import Logout from './Logout';
import { Redirect } from 'react-router-dom'





class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            rowid: null,
            rowexpand: true


        }
        this.itemsRef = firebase1.database().ref('users')
        // this.itemsRef.on('value', data => {
        //     const fetchedorders = [];
        //     console.log(data.val());
        //     // console.log(data.val()['-LjzhjgJJr1-YbIeAzon']['medicineList'])
        //     for (let key in data.val()) {
        //         fetchedorders.push({
        //             ...data.val()[key],
        //             id: key
        //         })
        //     }
        //     this.setState({
        //         orders: fetchedorders
        //     })
        // })
    }


    componentDidMount() {
        console.log(this.props.token)
        Axios.get('https://simple-30744.firebaseio.com/users.json?orderBy="name"&equalTo="Vgvg"')
            .then(res => {
                console.log(Object.keys(res.data)[0]);
                const fetchedorders = [];
                for (let key in res.data) {
                    fetchedorders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({ orders: fetchedorders })
                console.log(this.state.orders)
            })
            .catch(err => alert('No Valid Token'));
    }


    rowExpandHandler = (order) => {
     

        // (!this.state.rowexpand)?this.setState({ rowexpand: true }):this.setState({ rowexpand: false });

        // if (!this.state.rowexpand) {
        //     this.setState({ rowexpand: true })
        // }
        // else {
        //     this.setState({ rowexpand: false })
        // }
        this.setState({ rowid: order.id })
    }

    removeorders = (e, order) => {
        e.preventDefault();
        Axios.delete('https://simple-30744.firebaseio.com/users/' + order.id + '.json?auth=' + this.props.token)
            .then(res => console.log(res))
            .catch((err) => {
                console.log(err);
            })
    }

    fullavailable = (order) => {
        console.log(this.props.token)
        const data = {
            isAvailable: 'All Medicine are available',
        }

        Axios.patch('https://simple-30744.firebaseio.com/users/' + order.id + '.json?auth=' + this.props.token, data)
            .then(res => {
                return console.log(res)
            })
            .catch(err => console.log(err))
    }

    partialyyavailable = (order) => {

        const data = {
            isAvailable: 'Medicine are Partially available',
        }

        Axios.patch('https://simple-30744.firebaseio.com/users/' + order.id + '.json?auth=' + this.props.token, data)
            .then(res => {
                return console.log(res)
            })
            .catch(err => console.log(err))
    }

    notavailable = (order) => {
        const data = {
            isAvailable: 'Medicine are not available',
        }

        Axios.patch('https://simple-30744.firebaseio.com/users/' + order.id + '.json?auth=' + this.props.token, data)
            .then(res => {
                return console.log(res)
            })
            .catch(err => console.log(err))
    }

    addmedicine = (order, medicine) => {

        let medicineList = {};
        for (var i = 0; i < medicine.length; ++i) {
            medicineList[i] = medicine[i];
        }

        const data = { medicineList }
        Axios.patch('https://simple-30744.firebaseio.com/users/' + order.id + '.json?auth=' + this.props.token, data)
            .then(res => {
                return console.log(res)
            })
            .catch(err => console.log(err))
    }



    render() {
        let i = 1;
        console.log(this.props.token)
        let orders = this.state.orders.map(order => (
            <tbody key={order.id} onClick={() => this.rowExpandHandler(order)} >
                <tr style={{ height: "50px" }} >
                    <td scope="row">{order.name}</td>
                    <td>{order.userid}</td>
                    <td><a href={order.image} target="_blank">Image</a></td>
                    <td>{order.isConfirm}</td>
                    <td>
                        <button class="btn btn-danger" type="submit" onClick={e => this.removeorders(e, order)}>Delete</button>
                        {/* <button class="btn btn-danger" style={{ marginLeft: "10px" }} type="submit" onClick={e => this.removeorders(e, order)}>List</button> */}
                    </td>
                </tr>

                {((this.state.rowid === order.id) && (this.state.rowexpand)) ? (<tr>
                    <td colSpan="2" style={{ borderTop: "none" }}>
                        <img style={{ width: "500px", height: "500px" }} src={order.image} />
                    </td>
                    <td colSpan="2" style={{ borderTop: "none" }}>
                        <div style={{ marginBottom: "30px" }}>
                            <button class="btn btn-primary" onClick={() => this.fullavailable(order)}>
                                Fully Available
                            </button>
                        </div >

                        <div style={{ marginBottom: "30px" }} >
                            <button class="btn btn-primary" onClick={() => this.partialyyavailable(order)}>
                                Partially Available
                        </button>
                        </div>
                        <div class="btn btn-primary">
                            <button class="btn btn-primary" onClick={() => this.notavailable(order)}>
                                Not Available
                        </button>
                        </div>
                    </td>
                </tr>) : null}
                {((this.state.rowid === order.id) && this.state.rowexpand) ? (<tr>
                    <td colspan="4" style={{ borderTop: "none" }}>
                        <List addmedicine={(list) => this.addmedicine(order, list)} />
                    </td>

                </tr>) : null}

            </tbody>


            // <li key={order.id} style={{ color: 'green' }}>
            //     <div>{order.name}</div>
            //     <div>{order.userid}</div>
            //     <div><a href={order.image} target="_blank">Image</a></div>
            //     <button>Send</button>
            //     <button type="submit" onClick={e => this.removeorders(e, order)}>Delete</button>
            // </li>
        ))
        return (
            <div>
                <Logout />
                <div style={{ fontSize: "50px", marginBottom: "50px", marginTop: "20px" }}>Order Details</div>
                <table class="table">
                    <thead>
                        <tr>
                            <th class="td1" scope="col">Name</th>
                            <th class="td2" scope="col">UserId</th>
                            <th class="td3" scope="col">Prescription</th>
                            <th>Confirm</th>
                            <th class="td4" scope="col">Delete</th>
                        </tr>
                    </thead>
                    {orders}
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}







export default connect(mapStateToProps)(Order);