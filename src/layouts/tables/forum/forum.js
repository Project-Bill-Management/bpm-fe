import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, TextField, List, ListItem, ListItemText } from '@mui/material';
import { format } from 'date-fns';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import axios from 'axios';
import { Button as BootstrapButton } from 'react-bootstrap';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [sender, setSender] = useState('User1');

    useEffect(() => {
        // Fetch existing messages from backend when the component mounts
        // Simulating with an empty array for now
        setMessages([]);
    }, []);

    const handleSendMessage = async () => {
        if (messageText.trim() !== '') {
            const newMessage = {
                text: messageText,
                sender,
                time: new Date()
            };
            // Simulate saving message to backend
            try {
                // Replace with actual API call
                await axios.post('/api/messages', newMessage);
                setMessages([...messages, newMessage]);
                setMessageText('');
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

    const handleInputChange = (e) => {
        setMessageText(e.target.value);
    };

    return (
        <DashboardLayout>
            <Box display="flex" flexDirection="column" minHeight="100vh">
                <Card style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box p={2} style={{ flexGrow: 1, overflow: 'auto' }}>
                        <Typography variant="h6" gutterBottom>
                            Chat Forum
                        </Typography>
                        </Box>
                        </Card>
                        <Card>
                        <Box>
                        <List>
                            {messages.map((message, index) => (
                                <ListItem key={index} alignItems="flex-start">
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                <Typography variant="body1" component="span" color="textPrimary">
                                                    {message.sender}
                                                </Typography>
                                                {" — "}
                                                <Typography variant="body2" component="span" color="textSecondary">
                                                    {format(message.time, 'HH:mm')}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                        secondary={message.text}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Card>
                <Box mt={2} display="flex" p={2} style={{ position: 'sticky', bottom: 0, backgroundColor: 'white', boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)' }}>
                    <Box mr={2} display="flex" alignItems="center">
                        <BootstrapButton variant="primary" className="px-4" onClick={handleSendMessage}>
                            Send
                        </BootstrapButton>
                    </Box>
                    <TextField
                        label="Type your message"
                        value={messageText}
                        onChange={handleInputChange}
                        multiline
                        rows={2}
                        variant="outlined"
                        fullWidth
                    />
                </Box>
            </Box>
        </DashboardLayout>
    );
}

export default Chat;
