import { Breadcrumb } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { User } from "../../features/auth/User";
import { CentralWindow } from "../../tools/page_generator/page_generator";
import "./User.css"

export function UserHeader() {
  const { id } = useParams();

  return (
    <Breadcrumb>
      <Breadcrumb.Item>Users</Breadcrumb.Item>
      <Breadcrumb.Item active>{id}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export function UserBody() {
  return (
    <CentralWindow>
      <User />
    </CentralWindow>
  );
}