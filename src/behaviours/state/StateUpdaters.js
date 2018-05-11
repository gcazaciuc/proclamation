const pathWatchers = {};
export const appState = {};
// Path updates
export function addPathWatcher(path, watcher) {
    pathWatchers[path] = pathWatchers[path] || [];
    pathWatchers[path].push(watcher);
}
export function triggerPathWatchers(path) {
    pathWatchers[path] = pathWatchers[path] || [];
    pathWatchers[path].forEach(updateFn => updateFn());
}
// Read/write primitives
export function readPath(rootObj, statePath, defaultVal = '') {
    const pathParts = statePath.split('/');
    const [firstPart, ...restParts] = pathParts;
    if (pathParts.length === 1) {
        return firstPart in rootObj ? rootObj[firstPart] : defaultVal;
    }
    rootObj[firstPart] = rootObj[firstPart] || {};
    return readPath(rootObj[firstPart], restParts.join('/'), defaultVal);
}
export function writePath(rootObj, statePath, updater) {
    const pathParts = statePath.split('/');
    const [firstPart, ...restParts] = pathParts;
    if (pathParts.length === 1) {
        updater(rootObj, pathParts[0]);
        return;
    }
    return writePath(rootObj[firstPart], restParts.join('/'), updater);
}
// Update operators
export function assignmentUpdater(value) {
    return (rootObj, prop) => {
        rootObj[prop] = value;
        return rootObj;
    };
}
export function collectionAdder(value) {
    return (rootObj, prop) => {
        rootObj[prop] = rootObj[prop] || [];
        const valueToAdd = typeof value === 'object' ? Object.assign({}, value) : value;
        rootObj[prop].push(valueToAdd);
        return rootObj;
    };
}
export function collectionReplacer(value) {
    return (rootObj, prop) => {
        rootObj[prop] = rootObj[prop] || [];
        rootObj[prop] = value;
        return rootObj;
    };
}
// Bind
export function bind(binding, updaterFn) {
    addPathWatcher(binding, updaterFn);
    updaterFn();
}