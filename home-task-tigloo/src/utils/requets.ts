import { SchemaDetails } from "../interfaces";
import { parseSchema } from "./schema";
import arrestRecord from "../assets/arrestRecord.json";
import education from "../assets/education.json";
import officer from "../assets/officer.json";
import property from "../assets/property.json";

const jsons = [arrestRecord, education, officer, property];

// Fetches and returns an array of schema types from the jsons data.
export const fetchSchemaTypes = async (): Promise<string[]> => {
  return new Promise((resolve) => {
    const arr: string[] = jsons.map((json) => json.type);
    resolve(arr);
  });
};

// Retrieves the schema for a given type from the jsons data, or returns null if not found.
export const getSchema = (type: string): SchemaDetails | null => {
  try {
    for (const json of jsons) {
      if (json && json.type === type) {
        const schema = parseSchema(json);
        return schema;
      }
    }
    return null;
  } catch (err) {
    console.error("Error getting schema:", err);
    return null;
  }
};
