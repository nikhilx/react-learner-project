import React from 'react'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'

const Layout = ({ children }) => {
    return (
        <>
            <Toolbar />
            <main className={classes.content}>
                {children}
            </main>
        </>
    )
}

export default Layout
