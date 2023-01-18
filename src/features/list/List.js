import { Col, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { Item } from "./Item";
import "./List.css";
import {selectValue} from "./listSlice";


export default function List() {
  const tasks = useSelector(selectValue);

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
