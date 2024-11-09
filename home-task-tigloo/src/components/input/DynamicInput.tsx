import React from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FieldSchema } from "../../interfaces/index";


interface DynamicInputProps {
  name: string;
  fieldSchema: FieldSchema; 
  value: any;
  error?: string; 
  onChange: (name: string, value: any) => void;
}

const DynamicInput: React.FC<DynamicInputProps> = ({
  name,
  fieldSchema,
  value,
  onChange,
  error
}) => {
  
  // Handles changes for text and checkbox inputs, updating the parent component with the appropriate value.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { type, checked, value } = event.target;
    onChange(name, type === "checkbox" ? checked : value);
  };

  // Handles input changes and updates the parent component with the correct value.
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    onChange(name, event.target.value);
  };

  
  const label = name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());

  switch (fieldSchema.type) {
    case "String":
      return (
        <TextField
          name={name}
          label={label}
          required={fieldSchema.required || false}
          value={value || ""}
          onChange={handleChange}
          error={!!error} // Show error if there's an error message
          helperText={error || ""} // Display the error message
          fullWidth
          margin="normal"
        />
      );
    case "Number":
      return (
        <TextField
          name={name}
          type="number"
          label={label}
          value={value || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      );
    case "Date":
      return (
        <TextField
          name={name}
          type="date"
          label={label}
          value={value || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
      );
    case "Boolean":
      return (
        <FormControlLabel
          control={
            <Checkbox
              name={name}
              checked={value === true}
              onChange={handleChange}
            />
          }
          label={label}
        />
      );
    case "Enum":
      return (
        <FormControl fullWidth margin="normal">
          <InputLabel>{label}</InputLabel>
          <Select
            name={name}
            value={value || ""}
            onChange={handleSelectChange}
            label={label}
          >
            {fieldSchema.enumValues?.map((enumValue) => (
              <MenuItem key={enumValue} value={enumValue}>
                {enumValue
                  .toLowerCase()
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    default:
      return null;
  }
};

export default DynamicInput;
