import { useSelector } from "react-redux";
import { selectStack } from "./notificationSlice";
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Toast } from "react-bootstrap";

export function Notification({item}) {
  return (
    <Toast>
      <Toast.Header>
        <strong>{item.from}</strong>
      </Toast.Header>
      <Toast.Body>{item.text}</Toast.Body>
    </Toast>
  )
}

export function NotificationModule() {
  const stack = useSelector(selectStack);
  return (
    <ToastContainer position="bottom-end">
      {stack.map((el) =>
        <Notification item={el} />
      )}
    </ToastContainer>
  )
}