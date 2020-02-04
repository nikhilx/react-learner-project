import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount = () => {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    addIngredient = ingredientType => {
        const updatedCount = this.state.ingredients[ingredientType] + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[ingredientType] = updatedCount

        const priceAddition = INGREDIENT_PRICES[ingredientType]
        const newPrice = this.state.totalPrice + priceAddition

        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice }, () => this.updatePurchaseState())
        this.updatePurchaseState()
    }

    removeIngredient = ingredientType => {
        if (this.state.ingredients[ingredientType] > 0) {
            const updatedCount = this.state.ingredients[ingredientType] - 1
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[ingredientType] = updatedCount

            const substractedPrice = INGREDIENT_PRICES[ingredientType]
            const newPrice = this.state.totalPrice - substractedPrice

            this.setState({ totalPrice: newPrice, ingredients: updatedIngredients }, () => this.updatePurchaseState())
        }
    }

    updatePurchaseState = () => {
        const ingredients = {
            ...this.state.ingredients
        }
        const sum = Object.keys(ingredients)
            .map(ingredient => {
                return ingredients[ingredient]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({ purchasable: sum > 0 })
    }

    purchaseHandler = () => this.setState({ purchasing: true })

    purchaseCancelHandler = () => this.setState({ purchasing: false })

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
        // this.setState({ loading: true })
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Nikhil',
        //         address: {
        //             city: 'Pune',
        //             zipCode: '411038',
        //             country: 'India'
        //         },
        //         email: 'nikhil@idx9.com',
        //         deliveryMethod: 'fastest'
        //     },
        // }
        // axios.post('/orders', order)
        //     .then(response => {
        //         this.setState({ loading: false, purchasing: false })
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.setState({ loading: false, purchasing: false })
        //     })
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
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
                            this.state.ingredients
                                ?
                                <OrderSummary
                                    ingredients={this.state.ingredients}
                                    totalPrice={this.state.totalPrice}
                                    purchaseCancelHandler={this.purchaseCancelHandler}
                                    purchaseContinueHandler={this.purchaseContinueHandler}
                                />
                                :
                                null
                    }
                </Modal>
                {this.state.ingredients
                    ?
                    <>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls
                            addIngredient={this.addIngredient}
                            removeIngredient={this.removeIngredient}
                            disabledInfo={disabledInfo}
                            price={this.state.totalPrice}
                            purchasable={this.state.purchasable}
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

export default withErrorHandler(BurgerBuilder, axios)
