import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = props => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.showSideDrawer) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <>
            <Backdrop
                show={props.showSideDrawer}
                modalClose={props.sideDrawerHandler}
            />
            <div className={attachedClasses.join(' ')} onClick={props.sideDrawerHandler}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </>
    )
}


export default SideDrawer
