import { combineReducers } from "redux"
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
	key: "root",
	storage,
};


const initialWalletState = {
    user: {
        userAddress : "",
        userBalance : 0,
    },
}

const connectWalletReducer = (config = initialWalletState, action) => {
    switch(action.type){
        case "CONNECT_WALLET":
            return {...config,user: action.user, 
                        };
        case "DISCONNECT_WALLET":
            storage.removeItem('persist:root')
            return {...initialWalletState,
                    };
        case "TEZOS_INSTANCE":
            return {...config}
        case "CONNECT_WALLET_ERROR":
            return config;
        default:
            return config;
    }
}

const tokenDataReducer=(state=[], action)=>{
    switch(action.type){
        case "SET_TOKEN_DATA":
            return action.payload;
        default:
            return state;
    }
}

const cartDataReducer=(state=[], action)=>{
    switch(action.type){
        case "SET_CART_DATA":
            return action.payload;
        case "ADD_CART_DATA":
            return state+action.payload;
        case "REMOVE_CART_DATA":
            let new_state = [...state]
            return new_state.filter(item => item !== action.payload);
        case "CLEAR_CART_DATA":
            return [];
        default:
            return state;
    }
}

const reducers = combineReducers({walletConfig: connectWalletReducer, tokenData: tokenDataReducer, cartData: cartDataReducer});
const persistedReducer = persistReducer(persistConfig, reducers);
export default persistedReducer;