import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>
            BurgerBuilder
        </NavigationItem>
        {
            props.isAuth
            &&
            <NavigationItem link='/orders'>
                Orders
            </NavigationItem>
        }
        <NavigationItem link={props.isAuth ? '/logout' : '/auth'}>
            {props.isAuth ? "Logout" : "Authenticate"}
        </NavigationItem>
    </ul>
)


export default NavigationItems
