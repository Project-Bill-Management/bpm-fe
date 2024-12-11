import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import React, { useCallback, useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import { Card } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Button as BootstrapButton } from 'react-bootstrap';

function Websocket() {
    const [socketUrl, setSocketUrl] = useState("");
    const [getMessage, setGetMessage] = useState([]);
    const { sendMessage, lastMessage, readyState } = useWebSocket;

    useEffect(() => {
        if (lastMessage !== null) {
            setGetMessage((prev) => prev.concat(lastMessage));
        }
    }, [lastMessage]);

    const handleClickUrl = useCallback(
        () => setSocketUrl(''),
        []);
    const handleSendMessage = useCallback(() => sendMessage("Halo backend! ini frontend"), []);

    const connectStatus = {
        [ReadyState.CONNECTING]: "connect",
        [ReadyState.OPEN]: "open",
        [ReadyState.CLOSED]: "closing",
        [ReadyState.CLOSING]: "closed",
        [ReadyState.UNINSTANTIATED]: 'uninstantiated',
    }[readyState];

    return (
        <DashboardLayout>
            <Card>
                <SoftBox justifyContent="space-batween" pt={3} px={3} alignItems="center" display="flex">
                    <SoftBox>
                        <SoftTypography ml={2}>
                            Websocket
                        </SoftTypography>
                        <SoftBox pb={2} />
                    </SoftBox>
                </SoftBox>
            </Card>
            <SoftBox pb={2} />
            <Card>
                <SoftBox justifyContent="space-batween" pt={3} px={3} alignItems="center" display="flex">
                    <div>
                        <span>
                            status websocket : {connectStatus}
                        </span>
                        {lastMessage ? <span>Last Message: {lastMessage.data}</span> : null}
                        <ul>
                            {getMessage.map((_messages, _index) => (
                                <span key={_index}>{_messages ? _messages.data : null}</span>
                            ))}
                        </ul>
                        <BootstrapButton variant="primary" className="px-4" onClick={handleClickUrl} disabled={readyState !== ReadyState.OPEN}>socket url</BootstrapButton>
                        <BootstrapButton variant="warning" className="px-4"  onClick={handleSendMessage}>send message</BootstrapButton>
                    </div>
                </SoftBox>
            </Card>

        </DashboardLayout>
    )
}

export default Websocket;