import { Button, Card } from "react-bootstrap";
import { useHolderjs } from "use-holderjs";
import "./Item.css";


export function Item({item, ...props}) {
  
  return (
    <Card {...props} className="catalog-item">
      <Card.Img variant="top" src={item.img || "holder.js/100px180"} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text className="card-body-text">{item.description}</Card.Text>
        <Card.Text><b>Цена: </b>{item.price} руб</Card.Text>
        <div className="catatlog-item-buttongroup">
          <Button className="catalog-item-addtocartbutton" variant="primary">Добавить в корзину</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export function ItemExample(props) {
  useHolderjs();
  return (
    <Item item={{
      title: "Card title",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      price: "∞"
    }} />
  )
}