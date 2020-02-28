import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actionType from '../../store/actions'

class BurgerBuilder extends Component {

    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount = () => {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => {
        //         this.setState({ error: true })
        //     })
    }

    updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients).map(ingredient => {
            return ingredients[ingredient]
        })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    purchaseHandler = () => this.setState({ purchasing: true })

    purchaseCancelHandler = () => this.setState({ purchasing: false })

    purchaseContinueHandler = () => this.props.history.push('/checkout')

    render() {

        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <>
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                    {
                        this.state.loading
                            ?
                            <Spinner />
                            :
                            this.props.ings
                                ?
                                <OrderSummary
                                    ingredients={this.props.ings}
                                    totalPrice={this.props.price}
                                    purchaseCancelHandler={this.purchaseCancelHandler}
                                    purchaseContinueHandler={this.purchaseContinueHandler}
                                />
                                :
                                null
                    }
                </Modal>
                {this.props.ings
                    ?
                    <>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls
                            addIngredient={this.props.onIngredientAdded}
                            removeIngredient={this.props.onIngredientRemoved}
                            disabledInfo={disabledInfo}
                            price={this.props.price}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler}
                        />
                    </>
                    :
                    this.state.error ? 'This state can\'t be loaded' : <Spinner />
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName => dispatch({ type: actionType.ADD_INGREDIENT, payload: { ingredientName: ingName } }),
        onIngredientRemoved: ingName => dispatch({ type: actionType.REMOVE_INGREDIENT, payload: { ingredientName: ingName } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
