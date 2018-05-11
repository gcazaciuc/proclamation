import { DragAndDrop } from './behaviours/drag-and-drop/';
import { State } from './behaviours/state/';
import { Ajax } from './behaviours/ajax/';
import { Validations } from './behaviours/validations/';
import { watchDocument } from './framework/DOMWatcher';
import { parsePageBehaviour } from './framework/BehaviourParser';
import {
    applyAllBehaviours,
    applyMatchingBehaviours
} from './framework/BehaviourApplier';

let availableBehaviours = [];
const use = plugin => {
    availableBehaviours.push(plugin);
};

function applyBehavioursToCurrentPage() {
    availableBehaviours = [DragAndDrop, State, Ajax, Validations];
    const behaviours = parsePageBehaviour(availableBehaviours);
    watchDocument({
        onNodeAdded: applyMatchingBehaviours(availableBehaviours, behaviours)
    });
    applyAllBehaviours(behaviours, availableBehaviours);
}

const install = () => {
    window.addEventListener('load', applyBehavioursToCurrentPage);
};

export default {
    install,
    use
};
