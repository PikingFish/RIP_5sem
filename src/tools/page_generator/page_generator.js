import { ListGroup } from "react-bootstrap";
import "./page_generator.css";

export function CentralWindow({ children }) {
  return (
    <div className="top-50 start-50 translate-middle centralwindow">
      {children}
    </div>
  );
}

export function ListTemplate({ children, action }) {
  return (
    <ListGroup className="listtemplate">
    {(Array.isArray(children) ? children : Array(children)).filter(el => el).map((el, i) =>
      <ListGroup.Item key={i} action={action}>{el}</ListGroup.Item>
    )}
    </ListGroup>
  );
}
