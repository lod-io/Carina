import React, { useState, useEffect, useRef } from "react";
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
import ModelPicker from "./components/ModelPicker";
import logo from "./assets/carina-logo.png";

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Please describe the system you want to build and its key functionalities.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [designDoc, setDesignDoc] = useState<string>("");
  const [showDesignModal, setShowDesignModal] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = useState("gemini-1.5-flash");

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleModelSelect = (model: string) => {
    console.log("Model selected:", model);
    setModel(model);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const newMessages = [
        ...messages,
        { role: "user", content: input } as Message,
      ];
      setMessages(newMessages);
      setInput("");

      const response = await api.getNextQuestion(newMessages, model);
      setMessages([
        ...newMessages,
        { role: "assistant", content: response.content },
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
      const response = await api.generateDesign(
        designDoc !== "" ? designDoc : null,
        messages,
        model
      );
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <img
          src={logo}
          alt="Carina Logo"
          style={{ height: "60px", padding: "0", margin: "0" }}
        />

        <ModelPicker onModelSelect={handleModelSelect} />
      </Box>

      <Paper elevation={3} className="app-chat-container">
        <Box
          ref={chatContainerRef}
          mb={2}
          sx={{
            height: "100%",
            overflowY: "auto",
          }}
        >
          <ChatHistory messages={messages} />
        </Box>

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
                  borderColor: "var(--accent-color)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--accent-color)",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "var(--placeholder-color)",
                opacity: 1.0,
              },
            }}
          />
          <Box mt={2} display="flex" gap={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || !input.trim()}
              sx={{ textTransform: "none" }}
            >
              Send
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGenerateDesign}
              disabled={loading || messages.length < 4}
              sx={{ textTransform: "none" }}
            >
              {designDoc ? "Regenerate Design" : "Generate Design"}
            </Button>
            {loading && <CircularProgress size={24} />}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setShowDesignModal(!showDesignModal)}
              sx={{
                textTransform: "none",
                marginLeft: "auto",
              }}
              disabled={!designDoc}
            >
              Show Design
            </Button>
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
