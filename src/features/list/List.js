import {Card, Col, Row, Button} from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Item } from "./Item";
import "./List.css";
import {selectValue} from "./listSlice";


export default function List() {
  const tasks = useSelector(selectValue);
  const navigate = useNavigate();

  return (
    <Row>
    {tasks.map(item => 
      <Col key={item.id}>
        <Item item={item} />
      </Col>
    )}
    </Row>
  );
}
