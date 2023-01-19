import { Breadcrumb } from "react-bootstrap";
import { Orders } from "../../features/orders/Orders";
import { CentralWindow } from "../../tools/page_generator/page_generator";

export function OrdersHeader() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item active>Мои заказы</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export function OrdersBody() {
  return (
    <CentralWindow>
      <Orders />
    </CentralWindow>
  );
}