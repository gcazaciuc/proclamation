import yup from 'yup';
function runSingleValidation(el, currentValidation, remainingValidations) {
    const getNextValidation = baseValidation => validationSpec => {
        const [v, ...params] = validationSpec.split(':');
        if (typeof baseValidation[v] === 'function') {
            return baseValidation[v](...params);
        }
        return baseValidation;
    };
    const handleValidityResponse = validationResult => {
        if (!validationResult) {
            el.classList.add('error');
        } else {
            el.classList.remove('error');
            const validationSpec = remainingValidations.shift();
            if (validationSpec) {
                const nextValidation = getNextValidation(currentValidation)(validationSpec);
                runSingleValidation(el, nextValidation, remainingValidations);
            }
        }
    };
    if (currentValidation) {
        currentValidation.isValid().then(handleValidityResponse);
    }
}
function runValidations(el, validations) {
    if (!validations || validations.length === 0) {
        return;
    }
    const isTypeValidation = v => v === 'string' || v === 'number';
    const not = fn => (...rest) => !fn(...rest);
    const fieldType = validations.find(isTypeValidation) || 'string';
    const remainingValidations = validations.filter(not(isTypeValidation));
    runSingleValidation(el, yup[fieldType](), remainingValidations);
}

export const ValidationBinder = (el, binding, spec) => {
    const validationsToRun = binding.split('|');

    if (!spec['validate-on']) {
        spec['validate-on'] = 'blur';
    }
    el.addEventListener(spec['validate-on'], ev => {
        runValidations(el, validationsToRun);
    });
};
