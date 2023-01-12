import { Button, Card } from "react-bootstrap";
import { useHolderjs } from "use-holderjs";
import "./Catalog.css";


export function ItemExample(props) {
  useHolderjs();
  return (
    <Card {...props} className="catalog-item">
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
        <Button variant="primary">Добавить в корзину</Button>
      </Card.Body>
    </Card>
  );
}