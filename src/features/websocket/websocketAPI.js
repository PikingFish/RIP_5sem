const websocketPath = "/api/notification/ws"

export function connectWebSocket() {
    return new Promise((resolve) => {
        const ws = new WebSocket(`wss://${window.location.host}${websocketPath}`);
        ws.onopen = () => {
            resolve(ws);
        };
        ws.onclose = () => {
            console.log("Websocket closed");
        }
    });
}