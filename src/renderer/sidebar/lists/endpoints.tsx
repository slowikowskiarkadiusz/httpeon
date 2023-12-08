import { dimOpenApi } from "../../common/dim.openapi";

export function Endpoints() {
    const dimPaths = dimOpenApi['paths'];
    group();
    return <ul style={ {
        listStyleType: 'none',
        padding: '0',
        margin: '1rem 0',
    } }>
        { Object.keys(dimPaths)
            .map((path, i) =>
                <li key={ `endpoint-list-item-${ i }` }>{ path }</li>) }
    </ul>
}

function group() {
    const dimPaths: { [p: string]: any } = dimOpenApi['paths'];
    let splitPaths: { [p: string]: any } = {};
    let result: { [p: string]: any } = {};

    Object.keys(dimPaths).forEach(path => {
        if (path.startsWith('/'))
            path = path.substring(1);
        const split = path.split('/')
        let nested = splitPaths;
        split.forEach(element => {
            nested = nested[element] = { ...nested[element] };
        })
    });

    flatten(splitPaths, null, undefined);
}

function flatten(obj: { [p: string]: any },
                 parent: { [p: string]: any },
                 currentKey: string) {
    let keys = Object.keys(obj);
    while (parent && keys.length === 1) {
        let newKey = currentKey + '/' + keys[0];
        parent[newKey] = obj[keys[0]];
        delete parent[currentKey];
        currentKey = newKey;
        obj = obj[keys[0]];
        keys = Object.keys(obj);
    }

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        flatten(obj[key], obj, key)
    }
}