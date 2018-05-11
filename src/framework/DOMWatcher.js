const domMutated = (options) => (mutation) => {
    switch (mutation.type) {
        case 'childList':
            mutation.addedNodes.forEach(options.onNodeAdded);
            break;
    }
}

export function watchDocument(options) {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(domMutated(options));
    });
    const observerConfig = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
    };

    // Node, config
    // In this case we'll listen to all changes to body and child nodes
    const targetNode = document.body;
    observer.observe(targetNode, observerConfig);
}