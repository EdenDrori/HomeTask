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

## Setup Instructions

To run this project locally, follow these steps:
1. Download the file
2. Install dependencies: npm install
3. Start the development server: npm start

The app should now be running on http://localhost:3000.

Technical Choices
-React: Selected for efficient state and dynamic content management.
-TypeScript: Provides type safety, which reduces runtime errors and improves code maintainability.
-Joi for Validation: Ensures data integrity by validating schema structure and form inputs.

Assumptions Made
-Schemas are provided in a format that specifies field types (String, Date, etc.) and requirements such as required.
-Schema fields can be nested, so recursion is used to handle nested schema groups.
-Real-time form validation is essential to guide users in filling required fields accurately.

How the Dynamic Form Works
-Fetching Schemas: The app retrieves a list of available schemas from the server. Users can then select a schema.
-Rendering Fields: Based on the selected schema, the app dynamically renders fields (e.g., text, date, select) according to the specified field types.
-Nested Fields: If a schema field contains nested fields, the app recursively renders those as a nested form group.
-Validation: As users input data, fields are validated in real time, checking for required fields and displaying error messages if necessary.
-Form Submission: Upon submission, the form data is sent to the server in the specified format.

Conclusion
This project demonstrates a schema-driven approach to form generation, making it highly scalable and maintainable.
It dynamically adapts to varying schemas, ensuring robust form validation and an improved user experience.

