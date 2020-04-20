import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Toolbar.module.css'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = props => (
    <header className={classes.Toolbar}>
        <DrawerToggle onClick={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
)


export default Toolbar
