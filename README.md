# Dynamic Schema-Based Form Builder

## Overview
This project is a React-based web application that dynamically generates forms based on schemas fetched from a server.
The forms support multiple field types, including text inputs, date pickers, radio buttons, and dropdowns, all defined by a predefined schema.
Additionally, the app handles nested fields, real-time validation, and dynamic updates based on user input.

## Features

- **Dynamic Form Generation**: Automatically generates form fields based on the schema structure.
- **Schema Fetching**: Retrieves schema options from the server and allows users to select and render a specific schema.
- **Field Type Management**: Supports various field types such as `String`, `Number`, `Boolean`, `Date`, and `Enum`.
- **Nested Fields**: Supports nested field groups with multiple levels of nesting.
- **Real-time Validation**: Provides live validation and feedback to ensure required fields are completed.
- **Responsive UI**: User-friendly, adaptable interface that changes according to the form content.


## Technical Choices

- **React**: Chosen for efficient state and dynamic content management. React's component-based architecture helps manage UI updates and dynamic form generation efficiently.
- **TypeScript**: Provides type safety, reducing runtime errors and improving code maintainability. It ensures that data structures are correctly followed, and type-related issues are caught during development.
- **Joi for Validation**: Used to validate the schema structure and form inputs. Joi ensures data integrity by enforcing validation rules both for the schema and for user input, reducing the risk of incorrect or malformed data being submitted.

## Assumptions Made

- **Schema Format**: Schemas are assumed to be provided in a format that specifies field types (e.g., String, Date, etc.) and whether the field is required. This format allows for flexibility in how forms are structured and validated.
- **Nested Fields**: Schema fields can be nested, which requires recursive rendering to properly display nested form groups. This ensures that complex forms with multiple levels of nested data can be handled smoothly.
- **Real-time Validation**: It is assumed that real-time validation is required. This means the app will check for required fields and correct data types as the user inputs data, offering immediate feedback and ensuring accurate submissions.

## How the Dynamic Form Works

### 1. Fetching Schemas
The app retrieves a list of available schemas from a function that simulates a server. Once the schemas are loaded, users can select a schema to view and interact with its associated form fields.

### 2. Rendering Fields
Based on the selected schema, the app dynamically renders form fields such as text inputs, date pickers, and select dropdowns. The form fields are rendered according to the field types specified in the schema (e.g., String, Date, Enum).

### 3. Nested Fields
If the selected schema includes nested fields (e.g., groups of fields), the app recursively renders these as nested form groups. This allows for handling complex forms with multiple levels of data hierarchy.

### 4. Validation
As users input data into the form, fields are validated in real-time. The app checks whether required fields are filled, and it ensures that the data entered matches the expected format (e.g., dates are valid, numbers are within range, etc.). Error messages are displayed for any issues detected during input.

### 5. Form Submission
When the form is submitted, a message with the schema details is logged to the console in the specified format, simulating a server response. The data is structured according to the schema, with the form fields and their values packaged and displayed as a JSON object.

## Conclusion

This project demonstrates a schema-driven approach to form generation, which makes it highly scalable and maintainable. The application dynamically adapts to varying schemas, ensuring that it can handle a wide range of forms and data types. With robust real-time form validation and an intuitive user interface, the project offers an improved user experience and ensures data integrity throughout the form submission process.

### Sample Data

The project includes sample schemas for testing and demonstration:

- **Schema List**
  ```typescript
  const schemasList = [
    { type: "OFFICER", display: "Officer" },
    { type: "EDUCATION", display: "Education" },
    { type: "PROPERTY", display: "Property" },
    { type: "ARREST_RECORD", display: "Arrest Record" }
  ];

  
### Schema Details Examples

#### OFFICER Schema

```json
{
  "type": "OFFICER",
  "scheme": {
    "officerURL": "{\"type\":\"String\",\"required\":true}",
    "name": { "full": "{\"type\":\"String\"}" },
    "employment": {
      "jobTitle": "{\"type\":\"String\"}",
      "company": "{\"type\":\"String\"}",
      "startDate": "{\"type\":\"Date\"}",
      "relationType": "{\"type\":\"Enum\",\"enumValues\":[\"OTHER_ACTIVITY\",\"RELATED\",\"TOP_EXECUTIVE\",\"ADVISORY_BOARD\",\"EMPLOYEE\",\"BOARD\",\"INVESTOR\",\"OWNER\"]}",
      "status": "{\"type\":\"Enum\",\"enumValues\":[\"Active\",\"InActive\"]}",
      "endDate": "{\"type\":\"Date\"}",
      "isMainEmployment": "{\"type\":\"Boolean\",\"value\":false}"
    }
  }
}


