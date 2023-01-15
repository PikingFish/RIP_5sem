import { Chat } from "../../features/chat/Chat";
import { CentralWindow } from "../../tools/page_generator/page_generator";

export function ChatHeader() {
    return null;
}

export function ChatBody() {
    return (
        <CentralWindow>
            <Chat />
        </CentralWindow>
    );
}
