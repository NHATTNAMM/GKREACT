import React, { createContext, useContext, useReducer } from 'react';

const MyContext = createContext();
MyContext.displayName = 'My store';

const initialState = {
  user: null,
  dishes: [],
  categories: [],
  cart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, user: action.payload };
    case 'USER_LOGOUT':
      return { ...state, user: null };
    case 'SET_DISHES':
      return { ...state, dishes: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'ADD_TO_CART': {
      const item = action.payload;
      const existing = state.cart.find((i) => i.id === item.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...item, quantity: 1 }],
        };
      }
    }
    case 'INCREASE_CART_ITEM': {
      const id = action.payload;
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    case 'DECREASE_CART_ITEM': {
      const id = action.payload;
      return {
        ...state,
        cart: state.cart
          .map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      };
    }
    case 'REMOVE_FROM_CART': {
      const id = action.payload;
      return {
        ...state,
        cart: state.cart.filter((i) => i.id !== id),
      };
    }
    case 'UPDATE_CART':
      return { ...state, cart: action.payload };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
};

const MyContextControllerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

const useMyContextController = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContextController must be used within a MyContextControllerProvider');
  }
  return context;
};

export { MyContextControllerProvider, useMyContextController }; 