// Import interfaces
import { FieldSchema, SchemaDetails, SchemaGroup } from "../interfaces";

// Converts a given input to a SchemaDetails object, validating its structure.
export const convertToSchemaDetails=(input: any): SchemaDetails=> {
  if (typeof input !== "object" || input === null) {
    throw new Error("Input must be a non-null object.");
  }

  const { type, scheme } = input;

  if (typeof type !== "string") {
    console.log(type,scheme);
    throw new Error('Input object must have a "type" property of type string.');
    
    
  }

  if (typeof scheme !== "object" || scheme === null) {
    throw new Error(
      'Input object must have a "scheme" property of type object.'
    );
  }

  // Helper function to process each scheme entry recursively
  const processSchema=(schemeObj: any): SchemaGroup=> {
    const result: SchemaGroup = {};

    for (const key in schemeObj) {
      if (!schemeObj.hasOwnProperty(key)) continue;

      const value = schemeObj[key];

      if (value && typeof value === "object") {
        if ("type" in value) {
          const fieldSchema: FieldSchema = {
            type: value.type,
          };

          if ("required" in value) {
            fieldSchema.required = value.required;
          }

          if ("enumValues" in value) {
            if (
              Array.isArray(value.enumValues) &&
              value.enumValues.every((v: any) => typeof v === "string")
            ) {
              fieldSchema.enumValues = value.enumValues;
            } else {
              throw new Error("Enum values must be an array of strings.");
            }
          }

          if ("value" in value) {
            fieldSchema.value = value.value;
          }

          result[key] = fieldSchema;
        } else {
          result[key] = processSchema(value);
        }
      } else {
        throw new Error("Invalid schema object");
      }
    }

    return result;
  }

  const processedSchema = processSchema(scheme);

  return {
    type,
    scheme: processedSchema,
  };
}

// Parses a given JSON object into a SchemaDetails object, handling errors during conversion.
export const parseSchema = (json: any): SchemaDetails | null => {
  try {
    const schemaDetails: SchemaDetails = convertToSchemaDetails(json);
    return schemaDetails;
  } catch (error) {
    console.error("Error parsing schema:", error);
    return null;
  }
};
