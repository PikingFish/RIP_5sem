import { Group } from "../../tools/form_generator/form_generator";
import { ListTemplate } from "../../tools/page_generator/page_generator";
import { CartButtonGroup } from "../../features/list/Cart";
import { ListGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createOrder } from "../../features/list/cartSlice";
import "./OrderConstructor.css";

export function OrderConstructor({value, loading, canBuy}) {
  const dispatch = useDispatch();

  function createOrderHandler() {
    dispatch(createOrder()).then((e) => console.log(e));
  }

  return (
    <ListTemplate>
      <Group label="Товары">
        <ListGroup>
          {loading ? 
            <ListGroup.Item key="loading" className="order-element" disabled>Loading</ListGroup.Item>
          : 
            value ? value.map(el => 
              <ListGroup.Item className="order-item" key={el.id}>
                <div className="order-item-container">
                  <div>{el.name}</div>
                  <div>{el.price} руб/шт | {el.count*el.price} руб.</div>
                </div>
                <CartButtonGroup item={el} />
              </ListGroup.Item>
            ) : null
          }
        </ListGroup>
      </Group>
      <Group label="Итого">
        <div className="order-sum">{!value ? 0 : value.reduce((a, el) => a + (el.price*el.count), 0)} руб.</div>
      </Group>
      {canBuy ? <Button className="order-buy" onClick={createOrderHandler}>{loading ? "Загрузка..." : "Заказать"}</Button> : null}
    </ListTemplate>
  );
}