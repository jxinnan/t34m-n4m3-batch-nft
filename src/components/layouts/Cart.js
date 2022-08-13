import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { cartNFT } from "../../actions";
import CartToken from "../sections/CartToken_card";

const Cart = ({Tezos}) => {
    const cartData = useSelector(state => state.cartData);
	const selector = useSelector(state => state.tokenData.filter(obj=> cartData.indexOf((obj.amount, obj.token_id))>-1));
    const dispatch = useDispatch();
    const history = useHistory();
    const tokens = selector.map((obj, idx) => 
        <CartToken 
            key={idx} 
            item={obj} 
            onClick={()=>obj.collectable && history.push(`/show/${obj.token_id}`)}
            onRemove = {()=>dispatch({ type: "REMOVE_CART_DATA", payload: (obj.amount, obj.token_id) })}
        />
    );

    

	return <div className="ui link three column grid cards">{tokens}<div className="ui fluid card">
        <div className="extra content">
            <span className="right floated">
                <button className="ui basic button" onClick={()=>dispatch(cartNFT({Tezos, cartData: selector}))}>
                    Checkout
                </button>
            </span>
        </div>
    </div></div>;
    };

export default Cart;
