import { Card } from "react-bootstrap";
import { CartButtonGroup } from "./Cart";
import "./Item.css";


export function Item({item, ...props}) {
  return (
    <Card {...props} className="catalog-item">
      <Card.Img variant="top" src={item.photo ? `/img/items/${item.photo}` : "holder.js/100px180"} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text className="card-body-text">{item.description}</Card.Text>
        <Card.Text><b>Цена: </b>{item.price} руб</Card.Text>
        <CartButtonGroup id={item.id} />
      </Card.Body>
    </Card>
  );
}
