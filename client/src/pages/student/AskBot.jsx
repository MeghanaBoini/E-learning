// src/pages/student/AskBot.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper, CircularProgress, Avatar, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { Send as SendIcon, SmartToy as BotIcon } from '@mui/icons-material';

const AskBot = () => {
    const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;
        
        // Add user question to conversation
        setConversation(prev => [...prev, { speaker: 'user', text: question }]);
        setLoading(true);
        setError('');
        setQuestion(''); // Clear input after submission
        
        try {
            const response = await axios.post('http://localhost:8080/api/ask-bot', { question });
            // Add bot response to conversation
            setConversation(prev => [...prev, { speaker: 'bot', text: response.data.answer }]);
        } catch (error) {
            console.error("Error fetching answer:", error);
            setError("Sorry, I couldn't fetch the answer. Please try again.");
            setConversation(prev => [...prev, { speaker: 'bot', text: "Sorry, I encountered an error. Please try again later." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '20px',
            height: '80vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                Study Assistant Bot
            </Typography>
            
            <Paper elevation={3} sx={{ 
                flexGrow: 1, 
                overflow: 'auto', 
                mb: 2, 
                p: 2,
                backgroundColor: '#f9f9f9'
            }}>
                <List>
                    {conversation.length === 0 ? (
                        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', mt: 4 }}>
                            Ask me anything about your studies!
                        </Typography>
                    ) : (
                        conversation.map((msg, index) => (
                            <ListItem key={index} sx={{ 
                                justifyContent: msg.speaker === 'user' ? 'flex-end' : 'flex-start',
                                alignItems: 'flex-start'
                            }}>
                                {msg.speaker === 'bot' && (
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                                            <BotIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                )}
                                <Paper elevation={1} sx={{
                                    p: 2,
                                    ml: msg.speaker === 'bot' ? 0 : 2,
                                    mr: msg.speaker === 'user' ? 0 : 2,
                                    backgroundColor: msg.speaker === 'bot' ? '#e3f2fd' : '#f5f5f5',
                                    maxWidth: '70%'
                                }}>
                                    <ListItemText 
                                        primary={msg.text} 
                                        secondary={msg.speaker === 'bot' ? "Study Assistant" : "You"}
                                        secondaryTypographyProps={{ 
                                            color: msg.speaker === 'bot' ? 'primary.main' : 'text.secondary'
                                        }}
                                    />
                                </Paper>
                                {msg.speaker === 'user' && (
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'grey.500' }}>U</Avatar>
                                    </ListItemAvatar>
                                )}
                            </ListItem>
                        ))
                    )}
                    {loading && (
                        <ListItem sx={{ justifyContent: 'flex-start' }}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <BotIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <Paper elevation={1} sx={{ p: 2, backgroundColor: '#e3f2fd' }}>
                                <CircularProgress size={24} />
                            </Paper>
                        </ListItem>
                    )}
                </List>
            </Paper>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question here..."
                    disabled={loading}
                />
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    disabled={loading || !question.trim()}
                    endIcon={<SendIcon />}
                    sx={{ minWidth: '100px' }}
                >
                    {loading ? <CircularProgress size={24} /> : 'Send'}
                </Button>
            </Box>

            {error && (
                <Typography color="error" sx={{ mt: 1, textAlign: 'center' }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default AskBot;