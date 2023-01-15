import { chatAPI } from "../../app/api"

export async function getMessages(id) {
    return (await chatAPI.get(`/chat/0`)).data;
}

export async function sendMessage(message) {
    let messageToSend = {text: message.text};
    return (await chatAPI.post(`/chat/0`, messageToSend)).data;
}

export async function deleteMessage(message){
    return (await chatAPI.delete(`/chat/0`)).data
}