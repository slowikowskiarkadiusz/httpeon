import { dimOpenApi } from "../../common/dim.openapi";

export function Endpoints() {
    const dimPaths = dimOpenApi['paths'];
    let processed = process();
    processed = processed.map(x => {return { ...x, folded: false }});
    return <>
        { processed
            .map((item, i, c) =>
                <li key={ `endpoint-list-item-${ i }` }
                    style={ { margin: `1rem 0 1rem ${ item.depth }em` } }
                    onClick={ () => fold(i, c) }>{ item.label }</li>) }
    </>
}

function fold(i: number, array: { depth: number, folded: boolean }[]) {

}

function process() {
    const dimPaths: { [p: string]: any } = dimOpenApi['paths'];
    let result: { [p: string]: any } = {};

    Object.keys(dimPaths).forEach(path => {
        if (path.startsWith('/'))
            path = path.substring(1);
        const split = path.split('/')
        let nested = result;
        split.forEach(element => {
            nested = nested[element] = { ...nested[element] };
        })
    });

    aggregate(result, null, undefined);

    let flattened: { label: string, depth: number }[] = [];
    flatten(result, flattened);

    return flattened;
}

function aggregate(obj: { [p: string]: any },
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
        aggregate(obj[key], obj, key)
    }
}

function flatten(obj: { [p: string]: any }, result: { label: string, depth: number }[], depth: number = 0) {
    Object.keys(obj)
        .forEach(label => {
            result.push({ label, depth });
            flatten(obj[label], result, depth + 1);
        });
}