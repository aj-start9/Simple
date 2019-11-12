import React, { Component } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';

class List extends Component {
    state = {
        list: [],
        data: {
            mname: '',
            mrq: '',
            maq: '',
            price: 5,
            total: null
        },
        ctotal: null
    }

    componentDidMount() {
        console.log('123456799s')
    }

    componentDidUpdate() {
        console.log('List')
        console.log(this.props.test)
    }


    namechangeHandler = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                mname: e.target.value
            }
        })
    }
    mrqchangeHandler = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                mrq: e.target.value
            }
        })
        this.props.onAuthState(e.target.value)
    }
    maqchangeHandler = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                maq: e.target.value,
                //how to use state key value in this.setstate
                total: parseInt(e.target.value) * this.state.data.price
            }
        })
    }
    pricechangeHandler = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                price: e.target.value
            }
        })
    }
    totalchangeHandler = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                total: e.target.value
            }
        })
    }

    hold = (e) => {
        e.preventDefault();
    }

    listmedicine = () => {

        this.state.list.push({
            ...this.state.data,
            id: Math.random()
        })
        console.log(this.state.list)
        // this.setState({
        //     data: {
        //         ...this.state.data,
        //         mname: '',
        //         mrq: '',
        //         maq: '',
        //         price: '',
        //         total: ''
        //     }
        // })
    }

    render() {
        const listshow = this.state.list.map(list => (
            <div key={list.id} class="form-row">
                <div class="col-md-2">
                    <label for="validationCustom01">{list.mname}</label>
                    <div class="valid-feedback">
                        Looks good!
             </div>
                </div>
                <div class="col-md-2">
                    <label for="validationCustom02">{list.mrq}</label>
                    <div class="valid-feedback">
                        Looks good!
               </div>
                </div>
                <div class="col-md-2">
                    <label for="validationCustom02">{list.maq}</label>
                    <div class="valid-feedback">
                        Looks good!
               </div>
                </div>
                <div class="col-md-2">
                    <label for="validationCustom02">{list.price}</label>
                    <div class="valid-feedback">
                        Looks good!
               </div>
                </div>
                <div class="col-md-2">
                    <label for="validationCustom02">{list.total}</label>
                    <div class="valid-feedback">
                        Looks good!
               </div>
                </div>
            </div>
        ))

        return (
            <div>
                <form class="needs-validation" novalidate onSubmit={this.hold}>
                    <div class="form-row">
                        <div class="col-md-2">
                            <label for="validationCustom01">Medicine Name</label>
                            <input type="text" class="form-control" value={this.state.data.mname} onChange={(e) => this.namechangeHandler(e)} id="validationCustom01" placeholder="Medicine Name" required />
                            <div class="valid-feedback">
                                Looks good!
                         </div>
                        </div>
                        <div class="col-md-2">
                            <label for="validationCustom02">Medicine required Quantity</label>
                            <input type="text" class="form-control"
                                value={this.state.data.mrq}
                                onChange={(e) => this.mrqchangeHandler(e)}
                                id="validationCustom02"
                                placeholder="Medicine required Quantity" required />
                            <div class="valid-feedback">
                                Looks good!
                           </div>
                        </div>
                        <div class="col-md-2">
                            <label for="validationCustom02">Medicine available Quantity</label>
                            <input type="text" class="form-control" value={this.state.data.maq} onChange={(e) => this.maqchangeHandler(e)} id="validationCustom02" placeholder="Medicine available Quantity" required />
                            <div class="valid-feedback">
                                Looks good!
                           </div>
                        </div>
                        <div class="col-md-2">
                            <label for="validationCustom02">Price Per Unit</label>
                            <input type="text" class="form-control" value={this.state.data.price} onChange={(e) => this.pricechangeHandler(e)} id="validationCustom02" placeholder="Price Per Unit" required readOnly />
                            <div class="valid-feedback">
                                Looks good!
                           </div>
                        </div>
                        <div class="col-md-2">
                            <label for="validationCustom02">Total</label>
                            <input type="text" class="form-control" value={(this.state.data.maq) * (this.state.data.price)} onChange={(e) => this.totalchangeHandler(e)} id="validationCustom02" placeholder="Total" readOnly />
                            <div class="valid-feedback">
                                Looks good!
                           </div>
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-success" style={{ marginBottom: "10px" }} onClick={() => this.props.addmedicine(this.state.list)}>Send</button><br></br>
                            <button class="btn btn-success" onClick={this.listmedicine}>Add</button>
                        </div>
                    </div>

                    {listshow}
                </form>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        test: state.change
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuthState: ((value) => dispatch({ type: 'change', value: value }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

