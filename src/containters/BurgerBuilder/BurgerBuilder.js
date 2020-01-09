import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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

    purchaseContinueHandler = () => alert('You continue')

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
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice}
                        purchaseCancelHandler={this.purchaseCancelHandler}
                        purchaseContinueHandler={this.purchaseContinueHandler}
                    />
                </Modal>
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
        )
    }
}

export default BurgerBuilder
