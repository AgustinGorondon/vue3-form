"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = exports.resetForm = exports.validateForm = exports.validateField = exports.getFieldError = exports.setFormErrors = exports.updateForm = exports.getRawFormData = exports.getFormData = exports.getFields = exports.ruleHub = void 0;
const vue_1 = require("vue");
const SEQUENCES = ['abc', '123'];
exports.ruleHub = {
    alphabets: {
        test: ({ value }) => !!value?.toString().match(/[a-z A-Z]/),
        message: () => 'este campo debe contener letras.',
    },
    alphabetsLowercase: {
        test: ({ value }) => !!value?.toString().match(/[a-z]/),
        message: () => 'este campo debe contener letras minúsculas.',
    },
    alphabetsLowercaseOnly: {
        test: ({ value }) => !!value?.toString().match(/^[a-z]+$/),
        message: () => 'este campo sólo debe contener letras minúsculas.',
    },
    alphabetsOnly: {
        test: ({ value }) => !!value?.toString().match(/^[a-z A-Z]+$/),
        message: () => 'este campo sólo debe contener letras.',
    },
    alphabetsUppercase: {
        test: ({ value }) => !!value?.toString().match(/[A-Z]/),
        message: () => 'este campo debe contener letras mayúsculas.',
    },
    alphabetsUppercaseOnly: {
        test: ({ value }) => !!value?.toString().match(/^[A-Z]+$/),
        message: () => 'este campo sólo debe contener letras mayúsculas.',
    },
    arrayContains: {
        test: ({ value }, array) => array.indexOf(value) > -1,
        message: (name, array) => `este campo debe contener alguno de estos: ${array.join(', ')}.`,
    },
    arrayDoesntContain: {
        test: ({ value }, array) => array.indexOf(value) < 0,
        message: (name, array) => `este campo no debe contener ninguno de estos: ${array.join(', ')}.`,
    },
    date: {
        test: ({ value }) => value?.constructor === Date,
        message: () => 'este campo.',
    },
    email: {
        test: ({ value }) => !!value
            ?.toString()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        message: () => 'este campo tiene que contener un email correcto.',
    },
    exact: {
        test: ({ value }, [fieldName], form) => {
            const field = form.fields[fieldName];
            if (!field) {
                throw new Error(`el campo ${fieldName} no fue encontrado en los campos del formulario.`);
            }
            return !!value && value === field.value;
        },
        message: (field, [fieldName]) => `este campo debe ser igual al campo ${fieldName}.`,
    },
    file: {
        test: ({ value }) => value?.constructor === File,
        message: () => 'un archivo tiene que ser seleccionado para este campo.',
    },
    money: {
        test: ({ value }) => !!value?.toString().match(/^\d+(\.\d{1,2})?$/),
        message: () => 'este campo sólo acepta formato moneda con dos decimales.',
    },
    name: {
        test: ({ value }) => !!value?.toString().match(/\w{2}(\s\w{2})+/),
        message: () => 'este campo debe ser una dirección válida.',
    },
    noSequence: {
        test: ({ value }) => !value?.toString()?.match(new RegExp(SEQUENCES.join('|'))),
        message: () => 'este campo no debe tener secuencias simples como "abc", "123"',
    },
    nullable: {
        test: () => true,
        message: () => '',
    },
    numberBetween: {
        test: ({ value }, [start, end]) => Number(value) > Number(start) && Number(value) < Number(end),
        message: (field, [start, end]) => `este campo debe estar entre ${start} y ${end}.`,
    },
    numberExact: {
        test: ({ value }, [expected]) => Number(value) === Number(expected),
        message: (field, [expected]) => `este campo debe ser (${expected}).`,
    },
    numberMax: {
        test: ({ value }, [max]) => Number(value) <= Number(max),
        message: (field, [max]) => `este campo debe ser menor a ${max}.`,
    },
    numberMin: {
        test: ({ value }, [min]) => Number(value) >= Number(min),
        message: (field, [min]) => `este campo debe ser mayor a ${min}.`,
    },
    numbers: {
        test: ({ value }) => !!value?.toString().match(/\d/),
        message: () => 'este campo debe contener números.',
    },
    numbersOnly: {
        test: ({ value }) => !!value?.toString().match(/^\d+$/),
        message: () => 'este campo sólo debe contener números.',
    },
    phone: {
        test: ({ value }) => !!value?.toString().match(/^(\+|)(234|0)(7|8|9)(0|1)\d{8}$/),
        message: () => 'este campo debe ser un número de teléfono.',
    },
    required: {
        test: ({ value }) => !!value,
        message: () => 'este campo es requerido.',
    },
    specialCharacters: {
        test: ({ value }) => !!value?.toString().match(/[!@#$%^&*()_+~`{}[\]\\;:'"<>,.?/]+/),
        message: () => 'este campo debe contener carácteres especiales.',
    },
    specialCharactersOnly: {
        test: ({ value }) => !!value?.toString().match(/^[!@#$%^&*()_+~`{}[\]\\;:'"<>,.?/]+$/),
        message: () => 'este campo sólo debe contener carácteres especiales.',
    },
    stringLength: {
        test: ({ value }, [length]) => value?.toString().length === Number(length),
        message: (field, [length]) => `este campo debe tener una longitud de ${length} caracteres.`,
    },
    stringMax: {
        test: ({ value }, [max]) => (value?.toString().length || 0) <= Number(max),
        message: (field, [max]) => `este campo debe tener una longitud menor a ${max} caracteres.`,
    },
    stringMin: {
        test: ({ value }, [min]) => (value?.toString().length || 0) >= Number(min),
        message: (field, [min]) => `este campo debe tener una longitud mayor a ${min} caracteres.`,
    },
    url: {
        test: ({ value }) => !!value
            ?.toString()
            .match(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
        message: () => 'este campo debe ser una url correcta',
    },
};
const generateForm = (keys, extra = {}) => {
    const fields = {};
    Object.keys(keys).forEach((name) => {
        const param = keys[name];
        const value = (typeof param === 'object' && param.value) || '';
        const field = (0, vue_1.reactive)({
            name,
            value: value !== undefined ? value : '',
            meta: keys[name].meta,
            rules: (typeof param === 'object' && param.rules) || ['required'],
            errors: null,
            serverErrors: null,
        });
        fields[name] = field;
    });
    return {
        fields,
        error: null,
        success: null,
        loading: false,
        touched: false,
        valid: false,
        ...extra,
        __base: {
            keys,
            extra,
        },
    };
};
const getFields = (form) => Object.keys(form.value.fields).map((name) => form.value.fields[name]);
exports.getFields = getFields;
const getFormData = (form) => {
    const formData = new FormData();
    const { value: { fields }, } = form;
    Object.keys(fields).forEach((name) => {
        const { value } = fields[name];
        formData.append(name, value === null || value === undefined ? '' : value.toString());
    });
    return formData;
};
exports.getFormData = getFormData;
const getRawFormData = (form) => {
    const data = {};
    const { value: { fields }, } = form;
    Object.keys(fields).forEach((name) => {
        data[name] = fields[name].value;
    });
    return data;
};
exports.getRawFormData = getRawFormData;
const updateForm = (form, properties) => {
    Object.keys(properties).map(() => Object.assign(form.value, properties));
};
exports.updateForm = updateForm;
const setFormErrors = (form, serverErrors) => {
    (0, exports.getFields)(form).forEach((field) => {
        field.serverErrors = serverErrors?.[field.name];
    });
};
exports.setFormErrors = setFormErrors;
const getFieldError = (field, ruleName) => {
    if (ruleName) {
        return field.errors?.[ruleName];
    }
    const { errors, serverErrors } = field;
    return Object.keys(errors || {})
        .map((name) => (errors || {})[name])
        .concat(serverErrors || []);
};
exports.getFieldError = getFieldError;
const validateField = (field, form) => {
    const { rules } = field;
    let isValid = true;
    field.errors = null;
    field.serverErrors = null;
    rules.forEach((key, index) => {
        switch (typeof key) {
            case 'string': {
                const [ruleName, ruleArgs] = key.split(':');
                const args = ruleArgs?.split(',');
                const { test, message } = exports.ruleHub[ruleName];
                if (!test(field, args, form.value)) {
                    field.errors = field.errors || {};
                    field.errors[ruleName] = message(field, args, form.value);
                    isValid = false;
                }
                break;
            }
            case 'function': {
                const { test, message } = key;
                if (!test(field, [], form.value)) {
                    field.errors = field.errors || {};
                    field.errors[index] = message(field, [], form.value);
                    isValid = false;
                }
                break;
            }
        }
        if (typeof key === 'function') {
            return;
        }
    });
    return isValid;
};
exports.validateField = validateField;
const validateForm = (form, callback) => {
    let isValid = true;
    form.value.valid = true;
    (0, exports.getFields)(form).forEach((field) => {
        if (!(0, exports.validateField)(field, form)) {
            isValid = false;
        }
    });
    form.value.valid = isValid;
    if (callback) {
        callback(isValid);
    }
    return isValid;
};
exports.validateForm = validateForm;
const resetForm = (form) => {
    const { __base: { keys, extra }, } = form.value;
    form.value = generateForm(keys, extra);
};
exports.resetForm = resetForm;
const useForm = (fields, extra = {}) => {
    const form = (0, vue_1.ref)(generateForm(fields, extra));
    Object.keys(fields).forEach((name) => {
        const field = form.value.fields[name];
        (0, vue_1.watch)(() => field.value, () => (0, exports.validateField)(field, form));
    });
    return form;
};
exports.useForm = useForm;
