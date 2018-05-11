import {
    writePath,
    appState,
    collectionReplacer,
    triggerPathWatchers
} from '../state/StateUpdaters';

const fetchOptions = {
    cache: 'no-cache',
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    mode: 'cors',
    redirect: 'follow'
};
const baseUrl = 'https://jsonplaceholder.typicode.com/';

export const AjaxLoadBinder = (el, binding, spec) => {
    Object.keys(spec).forEach(val => {
        const binding = spec[val];
        switch (val) {
            case 'load':
                const resources = binding.split(',');
                const loadingPromises = resources.map(res => {
                    return fetch(
                        `${baseUrl}${res}`,
                        Object.assign({}, fetchOptions, { method: 'GET' })
                    );
                });
                Promise.all(loadingPromises)
                    .then(responses => {
                        return Promise.all(
                            responses.map(r => {
                                console.log(r);
                                return r.json();
                            })
                        );
                    })
                    .then(responses => {
                        resources.forEach((r, idx) => {
                            writePath(appState, r, collectionReplacer(responses[idx]));
                            triggerPathWatchers(r);
                        });
                    });
                break;
        }
    });
};
