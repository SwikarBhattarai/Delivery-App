import { types } from '../ActionTypes';

const INITIAL_STATE = {
    cart: [],
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case types.CART_ITEMS: {
            return { ...state, cart: payload }
        }
        default: return state
    }
}