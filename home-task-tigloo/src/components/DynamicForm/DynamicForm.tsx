import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  SchemaDetails,
  FieldSchema,
  SchemaGroup,
} from "../../interfaces/index";
import DynamicInput from "../input/DynamicInput";
import createJoiSchema from "../../validation/validateFormSubmit";
import { Box, Typography } from "@mui/material";

interface DynamicFormProps {
  schema: SchemaDetails;
  submit: (formData: any) => void;
}

const DynamicForm = ({ schema, submit }: DynamicFormProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleChangeInput = (name: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Type guard to check if fieldSchema is a FieldSchema
  const isFieldSchema = (
    fieldSchema: FieldSchema | SchemaGroup
  ): fieldSchema is FieldSchema => {
    return (fieldSchema as FieldSchema).type !== undefined;
  };

  // Recursive function to render fields for SchemaGroup and FieldSchema
  const renderFields = (fields: {
    [key: string]: FieldSchema | SchemaGroup;
  }) => {
    return Object.entries(fields).map(([key, fieldSchema]) => {
      if (isFieldSchema(fieldSchema)) {
        return (
          <Box key={key}>
            <DynamicInput
              name={key}
              fieldSchema={fieldSchema}
              value={formData[key]}
              error={errors[key]}
              onChange={handleChangeInput}
            />
          </Box>
        );
      } else {
        return (
          <Box key={key}>
            <Typography
              variant="h6"
              sx={{
                textAlign: "left",
                fontWeight: "700",
                color: (theme) => theme.palette.text.primary,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {key
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/^./, (str) => str.toUpperCase())}
            </Typography>
            {renderFields(fieldSchema)}
          </Box>
        );
      }
    });
  };

  // Validate form data using Joi schema
  const validateForm = () => {
    const joiSchema = createJoiSchema(schema);
    const { error } = joiSchema.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors: { [key: string]: string } = {};
      error.details.forEach((err) => {
        newErrors[err.path[0] as string] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  // Check if all required fields are filled
  useEffect(() => {
    const requiredFields = Object.entries(schema.scheme).filter(
      ([, field]) => isFieldSchema(field) && field.required
    );

    const allFieldsFilled = requiredFields.every(
      ([key]) => formData[key] && formData[key].trim() !== ""
    );

    setIsFormComplete(allFieldsFilled);
  }, [formData, schema.scheme]);

  const handleSubmit = () => {
    if (validateForm()) {
      submit(formData);
    }
  };

  return (
    <Box style={{ textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{
          marginTop: "3%",
          fontWeight: "600",
          color: (theme) => theme.palette.text.primary,
        }}
      >
        {schema.type.replace(/_/g, " ")}
      </Typography>
      {renderFields(schema.scheme)}

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: isFormComplete ? "secondary.main" : "#D3D3D3",
            color: "white",
          }}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default DynamicForm;
