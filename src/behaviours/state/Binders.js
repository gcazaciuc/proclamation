import { AttributeBinder } from './AttributeBinder';
import { EventBinder } from './EventBinder';
import { TextBinder } from './TextBinder';
import { IterateBinder } from './IterateBinder';
const noop = function(){};

export const Binders = {
    attributes: AttributeBinder,
    events: EventBinder,
    text: TextBinder,
    iterate: IterateBinder,
    "iterate-item-template": noop
};
