import * as actionType from '../actions/actionTypes'

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

export default (state = initialState, { type, ingredientName }) => {
    switch (type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingredientName]: state.ingredients[ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName]
            }

        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingredientName]: state.ingredients[ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName]
            }
        default:
            return state
    }
}