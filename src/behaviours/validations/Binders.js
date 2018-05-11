import { ValidationBinder } from './ValidationBinder';

const noop = function(){};

export const Binders = {
    validations: ValidationBinder,
    'validate-on': noop
}