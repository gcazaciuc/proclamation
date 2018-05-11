import {
    writePath,
    readPath,
    appState,
    assignmentUpdater,
    triggerPathWatchers,
    addPathWatcher,
    bind
} from './StateUpdaters';

function domNode(str) {
    const div = document.createElement('div');
    div.innerHTML = str;
    return div.firstChild;
}

export const IterateBinder = (el, binding, spec) => {
    const drawCollection = () => {
        const itemNode = document.querySelector(spec['iterate-item-template']).content;
        const coll = readPath(appState, binding, []);
        const fragment = document.createDocumentFragment();
        const items = coll.forEach((item, idx) => {
            const itm = document.importNode(itemNode, true);
            const node = itemNode.children[0].cloneNode(true);
            node.setAttribute('data-state-path', `${binding}/${idx}`);
            node.innerHTML = item;
            fragment.appendChild(node);
        });
        const parent = el;
        parent.innerHTML = '';
        parent.appendChild(fragment);
    };
    bind(binding, drawCollection);
};
