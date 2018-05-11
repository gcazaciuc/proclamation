import {
    writePath,
    readPath,
    appState,
    assignmentUpdater,
    triggerPathWatchers,
    collectionAdder
} from './StateUpdaters';

function executeActions(bindings) {
    bindings.forEach(b => {
        switch (b.action) {
            case 'add':
                const [collection, item] = b.params;
                writePath(appState, collection, collectionAdder(readPath(appState, item)));
                triggerPathWatchers(collection);
                break;
        }
    });
}

export const EventBinder = (el, binding, spec) => {
    Object.keys(binding).forEach(eventName => {
        const preventDefault = eventName.slice(0, 1) === '!';
        const eventToBind = preventDefault ? eventName.slice(1) : eventName;
        el.addEventListener(eventToBind, ev => {
            if (preventDefault) {
                ev.preventDefault();
            }
            executeActions(binding[eventName]);
        });
    });
};
