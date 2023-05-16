import { useDispatch, useSelector } from "react-redux";
import { selectMe } from "../auth/authSlice";
import { doConnect, selectConnected } from "./websocketSlice";
import { useEffect } from "react";

export function Websocket() {
  const me = useSelector(selectMe);
  const connected = useSelector(selectConnected);
  const dispatch = useDispatch()
  useEffect(() => {
    if (me && !connected) {
      dispatch(doConnect());
    }
  }, [dispatch, me, connected])
  return null;
}