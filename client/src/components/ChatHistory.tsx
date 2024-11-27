import { List, ListItem, ListItemText, Box } from "@mui/material";
import { Message } from "../services/api";

interface ChatHistoryProps {
  messages: Message[];
}

function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <List sx={{ padding: "0px" }}>
      {messages.map((message, index) => (
        <ListItem
          key={index}
          sx={{
            padding: "0px 0px 16px 0px",
            display: "flex",
            justifyContent: message.role === "user" ? "flex-end" : "flex-start",
            width: "100%",
          }}
        >
          <Box
            sx={{
              maxWidth: "70%",
              backgroundColor:
                message.role === "user"
                  ? "var(--user-chat-color)"
                  : "var(--ai-chat-color)",
              borderRadius: "8px",
              padding: "8px 16px",
            }}
          >
            <ListItemText
              primary={message.role === "user" ? "You" : "AI Architect"}
              secondary={message.content}
              primaryTypographyProps={{
                style: { color: "var(--subtitle-color)" },
              }}
              secondaryTypographyProps={{
                style: { color: "var(--text-color)" },
              }}
            />
          </Box>
        </ListItem>
      ))}
    </List>
  );
}

export default ChatHistory;
