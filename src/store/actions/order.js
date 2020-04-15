import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

const purchaseBurgerSuccess = (id, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
})

const purchaseBurgerFail = error => ({
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
})

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START
})

export const purchaseBurger = orderData => {
    return dispatch => {
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            })
    }
}

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT
})