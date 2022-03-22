export interface Format {
  desktop: {
    view: "table" | "list";
    inlineStyle?: Object;
  };
  tablet: {
    view: "table" | "list";
    inlineStyle?: Object;
  };
  mobile: {
    view: "table" | "list";
    inlineStyle?: Object;
  };
}

import { ValidationArgs } from "@vuelidate/core";
export interface FieldConfig {
  label?: { caption: string; backgroundColor?: string };
  control?: {
    type: string;
    options?: string[];
    caption?: string;
    placeholder?: string;
  };
  units?: string[];
  validation?: ValidationArgs;
  inlineStyle?: Object;
  hidden?: boolean;
}

export interface Field extends FieldConfig {
  key: string;
  breakpoint?: {
    desktop?: FieldConfig;
    tablet?: FieldConfig;
    mobile?: FieldConfig;
  };
}

export interface RecordBase {
  __designKey: string;
  __id: string;
  __parentId: string;
  __order: number;
  __breadcrumb: string;
}

export interface ChildDesign {
  designKey: string;
  min: number | null;
  max: number | null;
}
