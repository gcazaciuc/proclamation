const behaviours = {};
const behavioursMap = new WeakMap();
function behave(sel, spec) {
    behaviours[sel] = behaviours[sel] || [];
    behaviours[sel].push(spec);
}
function isProperty(name, availableBehaviours) {
    const props = availableBehaviours.reduce((acc, b) => {
        return acc.concat(b.registeredProps);
    }, []);
    return !!props.find(p => p === name);
}

function parseBehaviourSpec(availableBehaviours, behaviour, sel = '') {
    const props = Object.keys(behaviour);
    // Selector properties are parsed by themselves and their behaviour processed
    props.filter(p => !isProperty(p, availableBehaviours)).forEach(s => {
        const fullSel = sel ? `${sel} ${s}` : s;
        parseBehaviourSpec(availableBehaviours, behaviour[s], fullSel);
    });
    // The rest of the properties are collected and thier behaviour added to the current selector
    const spec = props.filter(e => isProperty(e, availableBehaviours)).reduce((acc, p) => {
        acc[p] = behaviour[p];
        return acc;
    }, {});

    if (Object.keys(spec).length) {
        behave(sel, spec);
    }
}

function flattenBehaviours(behaviours, availableBehaviours) {
    behaviours.forEach(behaviour => {
        parseBehaviourSpec(availableBehaviours, behaviour);
    });
}

export const parsePageBehaviour = availableBehaviours => {
    const parsedBehavioursSpec = Array.from(document.querySelectorAll('script'))
        .filter(d => d.type === 'text/behaviour')
        .map(d => JSON.parse(d.innerText));
    flattenBehaviours(parsedBehavioursSpec, availableBehaviours);
    return behaviours;
};
