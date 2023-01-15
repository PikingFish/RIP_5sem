import { chatAPI } from "../../app/api"

export async function getMessages(id) {
    return (await chatAPI.get(`/chat/${id}`)).data;
}

export async function sendMessage(message) {
    let messageToSend = {text: message.text};
    return (await chatAPI.post(`/chat/${message.to}`, messageToSend)).data;
}

export async function deleteMessage(message){
    return (await chatAPI.delete(`/chat/${message.to}/${message.id}`)).data
}