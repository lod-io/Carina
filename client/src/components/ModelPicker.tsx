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
        {/* Gemini Models */}
        <MenuItem value="gemini-1.5-flash">Gemini 1.5 Flash</MenuItem>
        <MenuItem value="gemini-1.5-flash-8b">Gemini 1.5 Flash 8B</MenuItem>

        {/* Gemma Models */}
        <MenuItem value="gemma-2-9b">Gemma 2 9B</MenuItem>
        <MenuItem value="gemma-7b">Gemma 7B</MenuItem>

        {/* GPT-4 Models */}
        <MenuItem value="gpt-4o">GPT-4o</MenuItem>
        <MenuItem value="gpt-4-turbo">GPT-4 Turbo</MenuItem>
        <MenuItem value="gpt-4o-mini">GPT-4o Mini</MenuItem>
        <MenuItem value="gpt-4o-mini-2024-07-18">
          GPT-4o Mini (2024-07-18)
        </MenuItem>

        {/* Claude Models */}
        <MenuItem value="claude-3-opus-latest">Claude 3 Opus</MenuItem>
        <MenuItem value="claude-3-haiku-20240307">Claude 3 Haiku</MenuItem>
        <MenuItem value="claude-3-5-sonnet-latest">Claude 3.5 Sonnet</MenuItem>

        {/* Llama Models */}
        <MenuItem value="llama-guard-3-8b">Llama Guard 3 8B</MenuItem>
        <MenuItem value="meta-llama-3-70b">Meta Llama 3 70B</MenuItem>
        <MenuItem value="meta-llama-3-8b">Meta Llama 3 8B</MenuItem>
        <MenuItem value="llama-3-2-1b">Llama 3.2 1B</MenuItem>
        <MenuItem value="llama-3-groq-8b-tool-use">
          Llama 3 Groq 8B Tool Use
        </MenuItem>
        <MenuItem value="llama-3-groq-70b-tool-use">
          Llama 3 Groq 70B Tool Use
        </MenuItem>
        <MenuItem value="llama-3-1-70b">Llama 3.1 70B</MenuItem>
        <MenuItem value="llama-3-2-3b">Llama 3.2 3B</MenuItem>
        <MenuItem value="llama-3-1-8b">Llama 3.1 8B</MenuItem>
        <MenuItem value="llama-3-1-405b">Llama 3.1 405B</MenuItem>

        {/* Mixtral Models */}
        <MenuItem value="mixtral-8x7b">Mixtral 8x7B</MenuItem>
        <MenuItem value="open-mixtral-8x7b">Open Mixtral 8x7B</MenuItem>
        <MenuItem value="open-mixtral-8x22b">Open Mixtral 8x22B</MenuItem>

        {/* Mistral Models */}
        <MenuItem value="open-mistral-7b">Open Mistral 7B</MenuItem>
      </Select>
    </FormControl>
  );
}

export default ModelPicker;
