export const createBehaviour = (binders) => {
    const Behaviour = (el, spec) => {
        Object.keys(spec).forEach(val => {
            const binding = spec[val];
            if (binders[val]) {
                binders[val](el, binding, spec);
            }
        });
    };
    
    Behaviour.registeredProps = Object.keys(binders);
    return Behaviour;
}