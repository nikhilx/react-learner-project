import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import classes from './ContactData.module.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = event => {
        event.preventDefault()

        this.setState( { loading: true } )
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Nikhil',
                address: {
                    city: 'Pune',
                    zipCode: '411038',
                    country: 'India'
                },
                email: 'nikhil@idx9.com',
                deliveryMethod: 'fastest'
            },
        }
        axios.post( '/orders', order )
            .then( response => {
                this.setState( { loading: false, purchasing: false } )
                console.log( response )
            } )
            .catch( error => {
                console.log( error )
                this.setState( { loading: false, purchasing: false } )
            } )
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={classes.Input} type='text' name='name' placeholder="Your Name" />
                    <input className={classes.Input} type='email' name='email' placeholder="Your Email" />
                    <input className={classes.Input} type='text' name='street' placeholder="Street" />
                    <input className={classes.Input} type='text' name='postal' placeholder="Postal Code" />
                    <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData
