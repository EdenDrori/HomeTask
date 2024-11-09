export interface FieldSchema {
  type: string;
  required?: boolean;
  enumValues?: string[];
  value?: any;
}

export interface SchemaDetails {
  type: string;
  scheme: {
    [key: string]: FieldSchema | SchemaGroup;
  };
}

export interface SchemaGroup {
  [key: string]: FieldSchema | SchemaGroup;
}

export interface FormSubmission {
  type: string;
  form: { [key: string]: any };
}
