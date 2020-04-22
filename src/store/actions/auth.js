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

export const logout = () => {
    localStorage.clear()
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

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
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPIoun15yZW_8BfD37_gGWJlDml1DStHI'
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPIoun15yZW_8BfD37_gGWJlDml1DStHI'
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeOut(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error)
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const setAuthRedirectPath = path => ({
    type: actionTypes.SET_AUTH_REDIRECT,
    path: path
})

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime() / 1000)))
            }
        }
    }
}