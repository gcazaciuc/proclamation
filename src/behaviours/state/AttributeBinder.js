import {
    writePath,
    readPath,
    appState,
    assignmentUpdater,
    triggerPathWatchers,
    bind
} from './StateUpdaters';

function addValueBinding(el, valuePath) {
    el.addEventListener('change', ev => {
        writePath(appState, valuePath, assignmentUpdater(ev.target.value));
        triggerPathWatchers(valuePath);
    });
}

export const AttributeBinder = (el, binding, spec) => {
    const dataPath = el.getAttribute('data-state-path') || '';
    const [collection, idx] = dataPath.split('/');

    Object.keys(binding).forEach(attr => {
        const pathToWatch = `${collection}/${idx}/${binding[attr]}`;
        const updateElementAttribute = () => {
            const stateVal = readPath(appState, pathToWatch);
            el[attr] = stateVal;
        };
        bind(pathToWatch, updateElementAttribute);

        if (attr === 'value') {
            addValueBinding(el, pathToWatch);
        }
    });
};
