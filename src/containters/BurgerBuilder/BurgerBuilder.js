import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
        totalPrice: 4
    }

    addIngredient = ingredientType => {
        const updatedCount = this.state.ingredients[ingredientType] + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[ingredientType] = updatedCount

        const priceAddition = INGREDIENT_PRICES[ingredientType]
        const newPrice = this.state.totalPrice + priceAddition

        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
    }

    removeIngredient = ingredientType => {
        const updatedCount = this.state.ingredients[ingredientType] - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[ingredientType] = updatedCount

        const substractedPrice = INGREDIENT_PRICES[ingredientType]
        const newPrice = this.state.totalPrice - substractedPrice

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    }

    render() {
        return (
            <>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls addIngredient={this.addIngredient} removeIngredient={this.removeIngredient} />
            </>
        )
    }
}

export default BurgerBuilder
