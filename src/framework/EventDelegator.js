export function setupEventDelegation() {
    const events = ['click', 'change'];
    const handlers = {
        click: function(ev) {},
        change: function(ev) {}
    };
    events.forEach(e => {
        document.addEventListener(e, handlers[e]);
    });
}
