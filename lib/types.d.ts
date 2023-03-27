import { ComputedRef } from "vue";
export type FormInputValue = string | number | boolean | null;
export type RuleName = 'alphabets' | 'alphabetsLowercase' | 'alphabetsLowercaseOnly' | 'alphabetsOnly' | 'alphabetsUppercase' | 'alphabetsUppercaseOnly' | 'arrayContains' | `arrayContains:${string}` | 'arrayDoesntContain' | `arrayDoesntContain:${string}` | 'date' | 'dateAfter' | `dateAfter:${string}` | 'dateBefore' | `dateBefore:${string}` | 'dateBetween' | `dateBetween:${string}` | 'dateExact' | `dateExact:${string}` | 'dateFormat' | `dateFormat:${string}` | 'email' | 'exact' | `exact:${string}` | 'file' | 'money' | 'name' | 'noSequence' | 'nullable' | 'numbers' | 'numbersOnly' | 'numberBetween' | `numberBetween:${number}:${number}` | 'numberExact' | `numberExact:${number}` | 'numberMin' | `numberMin:${number}` | 'numberMax' | `numberMax:${number}` | 'phone' | 'required' | 'specialCharacters' | 'specialCharactersOnly' | 'stringLength' | `stringLength:${number}` | 'stringMax' | `stringMax:${number}` | 'stringMin' | `stringMin:${number}` | 'url';
export type FormPropertyKey = 'error' | 'loading' | 'success' | 'touched' | 'valid';
export type ServerErrors = Record<string, string[]>;
export type ValidationCallback = (status: boolean) => void;
export type FieldMetaType = 'SearchSelect' | 'CheckBox' | 'Input' | 'InputDate' | 'InputSearch' | any;
export interface FieldMeta {
    type?: FieldMetaType;
    list?: ComputedRef<any> | null;
    onLoadValue?: ComputedRef<any> | null;
    loading?: ComputedRef<boolean> | boolean;
    search?: (query: string | string[]) => void;
    extra?: any;
}
export interface FormField {
    rules?: (RuleName | Rule)[];
    value?: FormInputValue;
    label?: string;
    meta?: FieldMeta;
}
export interface FormFieldNormalized {
    name: string;
    label: string;
    value: FormInputValue;
    meta: FieldMeta | null;
    rules: (RuleName | Rule)[];
    errors: Record<string, string> | null;
    serverErrors: string[] | null;
}
export interface FormProperties {
    error?: string | null;
    success?: string | null;
    loading?: boolean;
    touched?: boolean;
    valid?: boolean;
}
export interface Form {
    fields: Record<string, FormFieldNormalized>;
    error: string | null;
    success: string | null;
    loading: boolean;
    touched: boolean;
    valid: boolean;
    __base: {
        keys: Record<string, FormField>;
        extra: Record<string, unknown>;
    };
}
export interface Rule {
    test: (field: FormFieldNormalized, args: string[], form: Form) => boolean;
    message: (field: FormFieldNormalized, args: string[], form: Form) => string;
    props?: Record<string, string | number>;
}
