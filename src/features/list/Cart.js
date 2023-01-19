import { Badge, Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Group } from "../../tools/form_generator/form_generator";
import { ListTemplate } from "../../tools/page_generator/page_generator";
import { selectCartLoading, selectCartValue, getCart, addToCart } from "./cartSlice";
import "./Cart.css";

import cart from './cart.svg'
import { useEffect } from "react";
import { selectMe } from "../auth/authSlice";

export function CartButtonGroup({item}) {
  const itemFromCart = (useSelector(selectCartValue) || []).filter(el => el.id === item.id)[0];
  const dispatch = useDispatch();

  function addToCartHandler() {
    dispatch(addToCart(item));
  }

  return (
    itemFromCart ?
      <div className="cart-button-group">
        {/* <Button variant="secondary">-</Button> */}
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
    if (!value) {
      dispatch(getCart());
    }
  }, [dispatch, value]);

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
    <ListTemplate>
      <Group label="Товары в корзине">
        <ListGroup>
          {loading ? 
            <ListGroup.Item key="loading" className="cart-element" disabled>Loading</ListGroup.Item>
          : 
            value ? value.map(el => 
              <ListGroup.Item className="cart-item" key={el.id}>
                <div className="cart-item-container">
                  <div>{el.name}</div>
                  <div>{el.price} руб/шт | {el.count*el.price} руб.</div>
                </div>
                <CartButtonGroup item={el} />
              </ListGroup.Item>
            ) : null
          }
        </ListGroup>
      </Group>
    </ListTemplate>
  );
}