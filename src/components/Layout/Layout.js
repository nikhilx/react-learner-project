import React from 'react'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import classes from './Layout.module.css'

const Layout = ({ children }) => {
    return (
        <>
            <Toolbar />
            <SideDrawer />
            <main className={classes.content}>
                {children}
            </main>
        </>
    )
}

export default Layout
