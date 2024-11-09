import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface BasicSelectProps {
  schemasList: string[];
  onChange: (selectedValue: string) => void;
}

const Dropdown: React.FC<BasicSelectProps> = ({ schemasList, onChange }) => {
  const [schema, setSchema] = React.useState<string>("");

  // Modify handleChange to accept SelectChangeEvent
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSchema(selectedValue);
    onChange(selectedValue);
  };

  return (
    <Box sx={{ minWidth: 120, marginBottom: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="schema-select-label">Choose Form</InputLabel>
        <Select
          labelId="schema-select-label"
          id="schema-select"
          value={schema}
          label="Choose Form"
          onChange={handleChange}
        >
          {schemasList.map((schemaType) => (
            <MenuItem key={schemaType} value={schemaType}>
              {schemaType
                .toLowerCase()
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
