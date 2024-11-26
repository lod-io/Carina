import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { Message, api } from "./services/api";
import "./styles/App.css";
import ChatHistory from "./components/ChatHistory";
import DesignDoc from "./components/DesignDoc";

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "AI Architect",
      content:
        "Please describe the system you want to build and its key functionalities.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [designDoc, setDesignDoc] = useState<string>("");
  const [showDesignModal, setShowDesignModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const newMessages = [...messages, { role: "user", content: input }];
      setMessages(newMessages);
      setInput("");

      const question = await api.getNextQuestion(newMessages);
      setMessages([
        ...newMessages,
        { role: "AI Architect", content: question },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDesign = async () => {
    setLoading(true);
    try {
      const response = await api.generateDesign(messages);
      setDesignDoc(response.content);
      setShowDesignModal(true);
    } catch (error) {
      console.error("Error generating design:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" className="app-container">
      <Typography
        variant="h4"
        component="h1"
        sx={{ color: "#f5f5f5" }}
        gutterBottom
      >
        AI Architect
      </Typography>

      <Paper
        elevation={3}
        className="app-chat-container"
        sx={{ backgroundColor: "#131313" }}
      >
        <ChatHistory messages={messages} />

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your response..."
            disabled={loading}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#f2f2f2",
                "& fieldset": {
                  borderColor: "#353535",
                },
                "&:hover fieldset": {
                  borderColor: "#353535",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#606060",
                opacity: 0.7,
              },
            }}
          />
          <Box mt={2} display="flex" gap={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || !input.trim()}
            >
              Send
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGenerateDesign}
              disabled={loading || messages.length < 4}
            >
              Generate Design Doc
            </Button>
            {loading && <CircularProgress size={24} />}
          </Box>
        </form>
      </Paper>

      <DesignDoc
        open={showDesignModal}
        onClose={() => setShowDesignModal(false)}
        designDoc={designDoc}
      />
    </Container>
  );
}

export default App;
