// ACTIONS
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const TOGGLE_CART = "TOGGLE_CART";

// ACTION CREATORS
export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item, //product
  };
};

export const toggleCart = (shouldOpen) => {
  return {
    type: TOGGLE_CART,
    payload: shouldOpen,
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

// REDUCERS (subscribers)
const addToCartReducer = (state = { isOpen: false, items: [] }, action) => {
  const { payload, type } = action;

  switch (type) {
    case TOGGLE_CART:
      return {
        ...state,
        isOpen: payload,
      };
    case ADD_TO_CART:
     {
      const itemExist = state.items.find(item => item.id === payload.id)
      if(itemExist){
        return{
          ...state,
          isOpen:true,
          items: state.items.map(item=>item.id === itemExist.id ?  {...item, quantity:item.quantity + 1}: item)
        }
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, payload],
      };
     }

      case REMOVE_FROM_CART:
        return{
            ...state,
            isOpen: true,
            items: state.items.filter(item => item.id !== payload)
        };

    default:
      return state;
  }
};

export default addToCartReducer;
