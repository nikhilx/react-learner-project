import React from 'react'
import classes from './Layout.module.css'

const Layout = ({ children }) => {
    return (
        <>
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className={classes.content}>
                {children}
            </main>
        </>
    )
}

export default Layout
