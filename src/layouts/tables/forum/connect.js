import { cloneEvent } from "@testing-library/user-event/dist/types/utils";
import { connect } from "react-redux";
import useWebSocket from "react-use-websocket";

function CheckConnect () {
    const{
        sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebsocket
    } = useWebSocket(socketUrl, {
        onOpen: () => console.log('connect'),
        shouldReconnect: (cloneEvent) => true,
    })
}