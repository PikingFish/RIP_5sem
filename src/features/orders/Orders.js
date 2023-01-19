import { useEffect } from "react";
import { Accordion, Card, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Group } from "../../tools/form_generator/form_generator";
import { OrderConstructor } from "../../tools/orders_and_cart/OrderConstructor";
import { ListTemplate } from "../../tools/page_generator/page_generator";
import { addToAuthHeader } from "../auth/Auth";
import { selectMe } from "../auth/authSlice";
import { getInfoOrder, getOrders, selectOrdersValue } from "./ordersSlice";

export function Orders() {
  const value = useSelector(selectOrdersValue);
  const me = useSelector(selectMe);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (me) {
      dispatch(getOrders());
    }
  }, [dispatch, me]);

  return (
    <ListTemplate>
      <Group label="Заказы">
        <Accordion>
          {value && value.length ? value.map(el => 
            <Accordion.Item>
              <Accordion.Header>Заказ №{el.id}</Accordion.Header>
              <Accordion.Body 
                onEnter={() => {
                  if (!el.loaded) {
                    dispatch(getInfoOrder(el.id));
                  }
                }}
              >
                <OrderConstructor loading={!el.loaded} value={el} />
              </Accordion.Body>
            </Accordion.Item>
          )
          :
            <Card>
              <Card.Header>Пока заказов нет :(</Card.Header>
            </Card>
          }
        </Accordion>
      </Group>
    </ListTemplate>
  );
}

function GoToHeader() {
  const navigate = useNavigate();
  return (
    <Dropdown.Item onClick={() => navigate('/orders')}>История заказов</Dropdown.Item>
  );
}

addToAuthHeader(<GoToHeader />);