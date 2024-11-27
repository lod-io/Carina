import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import "../styles/DesignDoc.css";

interface DesignDocProps {
  open: boolean;
  onClose: () => void;
  designDoc: string;
}

function DesignDoc({ open, onClose, designDoc }: DesignDocProps) {
  const handleSave = () => {
    // Create a Blob with the design doc content
    const blob = new Blob([designDoc], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "design-document.docx";

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "transparent",
        },
      }}
    >
      <DialogContent sx={{ backgroundColor: "var(--dialog-color)" }}>
        <div className="design-doc-markdown-content">
          <ReactMarkdown>{designDoc}</ReactMarkdown>
        </div>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "var(--ai-chat-color)" }}>
        <Button onClick={handleSave} sx={{ textTransform: "none" }}>
          Save
        </Button>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DesignDoc;
