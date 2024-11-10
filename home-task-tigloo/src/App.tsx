import { useEffect, useState } from "react";
import { FormSubmission, SchemaDetails } from "./interfaces";
import { fetchSchemaTypes, getSchema } from "./utils/requets";
import Dropdown from "./components/dropdown/dropdown";
import DynamicForm from "./components/DynamicForm/DynamicForm";
import "./App.css";
import { darkTheme, lightTheme } from "./style/theme";
import { Alert, Box, IconButton, Stack, ThemeProvider } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const App = () => {
  const [schemaList, setSchemaList] = useState<string[]>([]);
  const [schema, setSchema] = useState<SchemaDetails | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selctedSchemaType, setSelctedScheaType] = useState<string>(
    ""
  );

  // Fetches the list of schema types when the component mounts and updates the state.
  useEffect(() => {
    const loadSchemas = async () => {
      const val = await fetchSchemaTypes();
      setSchemaList(val);
    };
    loadSchemas();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Handles the dropdown selection, fetches the corresponding schema, and updates the state.
  const dropDownSelect = (val: string) => {
    const data = getSchema(val);
    setSelctedScheaType(val);
    setFormSubmitted(false);
    if (data) {
      setSchema(data);
    }
  };

  const handelSubmit = (form: any) => {
   
    setFormSubmitted(true);
    setSchema(null);
    
    console.log("Submition success:",{ form, type: selctedSchemaType });
    
  };

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#ffffff";
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Box
        sx={{
          textAlign: "center",
          marginTop: 2,
          backgroundColor: darkMode ? "#191353" : "#F6DFD3",
        }}
        className="App"
      >
        <Stack
          direction="row"
          spacing={2}
          justifyContent="right"
          marginBottom={2}
        >
          <IconButton onClick={toggleDarkMode}>
            {darkMode ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Stack>
        <Box>
          <Dropdown schemasList={schemaList} onChange={dropDownSelect} />
          {!schema ? (
            <></>
          ) : (
            <DynamicForm schema={schema} submit={handelSubmit} />
          )}
          {formSubmitted && (
            <Alert severity="success" sx={{ marginTop: 2 }}>
              Form submitted successfully!
            </Alert>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
