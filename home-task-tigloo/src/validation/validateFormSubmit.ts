import Joi from "joi";
import { FieldSchema, SchemaGroup } from "../interfaces";
import { convertToSchemaDetails } from "../utils/schema";

// Recursively builds a Joi schema for a schema group, handling nested structures.
const buildJoiSchema = (schemaGroup: SchemaGroup) => {
  const joiSchema: { [key: string]: Joi.Schema } = {};

  for (const [key, field] of Object.entries(schemaGroup)) {
    if ("type" in field) {
  

      joiSchema[key] = createJoiFieldSchema(field as FieldSchema);
    } else {
      joiSchema[key] = createJoiFieldSchema(field as SchemaGroup)
        .optional()
        .allow(null);
    }
  }

  return Joi.object(joiSchema).unknown(true);
};

// Helper function to create Joi schema for a single field
export const createJoiFieldSchema = (field: FieldSchema | SchemaGroup) => {
  let joiField;

  if (typeof field === "object" && !("type" in field)) {
    // If field is an object, recursively build Joi schema for nested structure
    joiField = buildJoiSchema(field); 
  } else {
    // Handle different field types
    switch (field.type) {
      case "String":
        joiField = Joi.string();
        if (field.required) {
          joiField = joiField.required().messages({
            "string.empty": "Please fill up this field",
          });
        } else {
          joiField = joiField.allow("", null);
        }
        break;
      case "Number":
        joiField = Joi.number();
        if (field.required) {
          joiField = joiField.required().messages({
            "number.base": `${field.type} must be a number`,
          });
        } else {
          joiField = joiField.allow(null);
        }
        break;
      case "Date":
        joiField = Joi.date();
        if (field.required) {
          joiField = joiField.required().messages({
            "date.base": `${field.type} must be a valid date`,
          });
        } else {
          joiField = joiField.allow(null);
        }
        break;
      case "Boolean":
        joiField = Joi.boolean();
        break;
      case "Enum":
        // Check if `enumValues` is a string array before using `join()`
        if (Array.isArray(field.enumValues)) {
          joiField = Joi.string().valid(...field.enumValues); 
        } else {
          // Handle the case where enumValues is not an array (perhaps an object, handle accordingly)
          joiField = Joi.string();
        }

        if (field.required && Array.isArray(field.enumValues)) {
          // Only call `join()` if `enumValues` is a string[] array
          joiField = joiField.required().messages({
            "any.only": `${field.type} must be one of ${field.enumValues.join(
              ", "
            )}`,
          });
        } else {
          joiField = joiField.allow(null);
        }
        break;
      default:
        throw new Error(`Unsupported field type: ${field.type}`);
    }
  }

  return joiField;
};



// Main function to create Joi schema using converted schema details
const createJoiSchema = (input: any) => {
  const schemaDetails = convertToSchemaDetails(input);


  return buildJoiSchema(schemaDetails.scheme);
};

export default createJoiSchema;
