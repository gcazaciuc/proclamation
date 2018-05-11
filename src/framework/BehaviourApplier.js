function shouldActivateBehaviour(behaviour, spec) {
    return !!Object.keys(spec).find(s => behaviour.registeredProps.indexOf(s) !== -1);
}
export const applyBehaviour = (el, b, availableBehaviours) => {
    availableBehaviours
        .filter(behaviour => shouldActivateBehaviour(behaviour, b))
        .forEach(behaviour => {
            behaviour(el, b || {});
        });
};

export function applyBehavioursToEl(behaviours, availableBehaviours) {
    return el => {
        behaviours.forEach(b => applyBehaviour(el, b, availableBehaviours));
    };
}

export const applyMatchingBehaviours = (availableBehaviours, behaviours) => el => {
    const selectors = Object.keys(behaviours);
    const applicableSelectors = selectors.filter(s => el.matches && el.matches(s));
    applicableSelectors.forEach(s => {
        const elBehaviours = behaviours[s];
        elBehaviours.forEach(b => applyBehaviour(el, b, availableBehaviours));
    });
};

export function applyAllBehaviours(behaviours, availableBehaviours) {
    Object.keys(behaviours).forEach(selector => {
        const elBehaviours = behaviours[selector];
        Array.from(document.querySelectorAll(selector)).forEach(applyBehavioursToEl(elBehaviours, availableBehaviours));
    });
}
