import { useEffect, useRef, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CustomForm, TinyMCE } from "../../tools/form_generator/form_generator";
import { ListTemplate } from "../../tools/page_generator/page_generator";
import { selectMe } from "../auth/authSlice";
import { doGetMessages, doSendMessage, doDeleteMessage, selectChatLoading, selectChatValue } from "./chatSlice";
import "./Chat.css"

export function Chat() {
    const value = useSelector(selectChatValue);
    const loading = useSelector(selectChatLoading);
    const dispatch = useDispatch();
    const { id } = useParams();
    const me = useSelector(selectMe);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        dispatch(doGetMessages(id));
    }, [dispatch, id]);

    function onSubmitData(data) {
        dispatch(doSendMessage({
            ...data,
            to: id,
            from: me.id,
            User: me,
            id: `me-${counter}`
        })).then(() => {
            if (ref.current) {
                ref.current.setContent("");
            }
        });
        setCounter(counter + 1);
    }
    function onDeleteMessage(message){
        dispatch(doDeleteMessage(message))
    }

    const ref = useRef()

    return (
        // <Button disabled={loading}, onClick={() => onDeleteMessage(el)}>{loading ? "🐴" : "🗑️"}</Button>
        <ListTemplate>
            <ListGroup>
                {value.map((el) =>  
                    <ListGroup.Item key={el.id} className={el.deleted ? "msg-deleted" : undefined}><p><b>from {el.User.username} {el.status || el.from === me.id? "😐" : "💀"}: </b></p><div dangerouslySetInnerHTML={{__html: el.text}}></div></ListGroup.Item>
                )}
            </ListGroup>
            <CustomForm onSubmitData={(data) => !loading ? onSubmitData(data) : null}>
                <TinyMCE textareaName="text" disabled={loading} refEditor={ref}/>
                <Button type="sumbit" disabled={loading}>{loading ? "🐴" : "🦄"}</Button>
            </CustomForm>
        </ListTemplate>
    )
}