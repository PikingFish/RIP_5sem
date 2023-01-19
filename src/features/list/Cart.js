import { Badge, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartLoading, selectCartValue, getCart, addToCart, removeFromCart } from "./cartSlice";
import "./Cart.css";

import cart from './cart.svg'
import { useEffect } from "react";
import { selectMe } from "../auth/authSlice";
import { OrderConstructor } from "../../tools/orders_and_cart/OrderConstructor";

export function CartButtonGroup({item}) {
  const itemFromCart = (useSelector(selectCartValue) || []).filter(el => el.id === item.id)[0];
  const dispatch = useDispatch();

  function addToCartHandler() {
    dispatch(addToCart(item));
  }

  function removeFromCartHandler() {
    dispatch(removeFromCart(item));
  }

  return (
    itemFromCart ?
      <div className="cart-button-group">
        <Button variant="secondary" onClick={removeFromCartHandler}>-</Button>
        <div>{itemFromCart.count}</div>
        <Button onClick={addToCartHandler}>+</Button>
      </div>
    :
      <Button onClick={addToCartHandler}>Добавить в корзину</Button>
  );
}

export function CartWidget() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const value = useSelector(selectCartValue);
  const me = useSelector(selectMe);

  useEffect(() => {
    if (me) {
      dispatch(getCart());
    }
  }, [dispatch, me]);
  
  return (
    <Button className="cart-button" onClick={() => navigate("/cart")}>
      <img 
        src={cart}
        width="25"
        height="25"
        className="d-inline-block align-top"
        alt=''
      />
      {value && value.length ? <Badge bg="secondary">{value.length}</Badge> : null}
    </Button>
  )
}



export function Cart() {
  const loading = useSelector(selectCartLoading);
  const value = useSelector(selectCartValue);

  return (
    <OrderConstructor loading={loading} value={value} canBuy />
  );
}