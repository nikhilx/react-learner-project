import React, { Component } from 'react'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import classes from './Layout.module.css'
import { connect } from 'react-redux'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandler = () => {
        this.setState({ showSideDrawer: !this.state.showSideDrawer })
    }

    render() {
        return (
            <>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}

                />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    showSideDrawer={this.state.showSideDrawer}
                    sideDrawerHandler={this.sideDrawerHandler}
                />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)
