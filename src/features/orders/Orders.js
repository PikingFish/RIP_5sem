import { Accordion, Card, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Group } from "../../tools/form_generator/form_generator";
import { ListTemplate } from "../../tools/page_generator/page_generator";
import { addToAuthHeader } from "../auth/Auth";
import { selectOrdersValue } from "./ordersSlice";

export function Orders() {
  const value = useSelector(selectOrdersValue);

  return (
    <ListTemplate>
      <Group label="Заказы">
        <Accordion>
          {value && value.length ? value.map(el => 
            <Accordion.Item>
              <Accordion.Header>Заказ №{el.id}</Accordion.Header>
              <Accordion.Body>А тут я пока не знаю как заполнять</Accordion.Body>
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