import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";

interface ModelPickerProps {
  onModelSelect: (model: string) => void;
}

function ModelPicker({ onModelSelect }: ModelPickerProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onModelSelect(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="model-select-label">Model</InputLabel>
      <Select
        labelId="model-select-label"
        id="model-select"
        label="Model"
        defaultValue="gemini-1.5-flash"
        onChange={handleChange}
      >
        <MenuItem value="gemini-1.5-flash">Gemini 1.5 Flash</MenuItem>
        <MenuItem value="gpt-4-mini">GPT-4 Mini</MenuItem>
      </Select>
    </FormControl>
  );
}

export default ModelPicker;
