import "./list.css";
import {Container, Breadcrumb, Alert} from "react-bootstrap";
import Filter from "../../features/list/Filter";
import List from "../../features/list/List";
import { useSelector } from "react-redux";
import { selectListError } from "../../features/list/listSlice";

export function ListHeader() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item active>Tasks</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export function ListBody() {
  const error = useSelector(selectListError);

  return (
    <Container>
      {error ? <Alert variant="danger">{error}</Alert> : null}
      <Filter />
      <List />
    </Container>
  );
}
