import {
    writePath,
    readPath,
    appState,
    assignmentUpdater,
    triggerPathWatchers,
    bind
} from './StateUpdaters';

export const TextBinder = (el, binding, spec) => {
    const dataPath = el.getAttribute('data-state-path') || '';
    const [collection, idx] = dataPath.split('/');
    const pathToWatch = `${collection}/${idx}/${binding}`;
    const updateElementContent = () => {
        const item = readPath(appState, pathToWatch);
        el.innerHTML = item;
    };
    if (collection && typeof idx !== 'undefined') {
        bind(pathToWatch, updateElementContent);
    }
};
