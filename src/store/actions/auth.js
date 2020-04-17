import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'

const authStart = () => ({
    type: actionTypes.AUTH_START
})

const authSuccess = (idToken, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
})

const authFail = error => ({
    type: actionTypes.AUTH_FAIL,
    error
})

const logout = () => ({
    type: actionTypes.AUTH_LOGOUT
})

const checkAuthTimeOut = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureTokn: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPIoun15yZW_8BfD37_gGWJlDml1DStHI'
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPIoun15yZW_8BfD37_gGWJlDml1DStHI'
        }
        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeOut(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error)
                dispatch(authFail(error.response.data.error))
            })
    }
}