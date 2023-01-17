import { Cart } from "../../features/list/Cart";
import { CentralWindow } from "../../tools/page_generator/page_generator";

export function CartHeader() {
  return null;
}

export function CartBody() {
  return (
    <CentralWindow>
      <Cart />
    </CentralWindow>
  );
}