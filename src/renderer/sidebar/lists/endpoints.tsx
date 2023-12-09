import { dimOpenApi } from "../../common/dim.openapi";
import { useState } from "react";

interface ListItem {
    label: string,
    depth: number,
    isFolded: boolean,
}

export function Endpoints() {
    let [list, setList] = useState(process());

    return <>
        { list
            .map((item, i, c) => {
                return isRenderable(i, c)
                    ? <li key={ `endpoint-list-item-${ i }` }
                          style={ {
                              padding: `0.75rem 0 0.75rem ${ item.depth }em`,
                              cursor: 'pointer',
                              userSelect: 'none',
                          } }
                          onClick={ () => fold(!item.isFolded, i, c, (list: ListItem[]) => setList(list)) }>{ item.label }</li>
                    : undefined
            }) }
    </>
}

function isRenderable(i: number, array: { depth: number, isFolded: boolean }[]): boolean {
    if (i === 0) return true;

    let parentIndex = i - 1;
    for (; parentIndex > 0 && array[parentIndex].depth >= array[i].depth; parentIndex--) {
    }

    return !array[parentIndex].isFolded;
}

function fold(newValue: boolean,
              i: number,
              array: ListItem[],
              setState: (list: ListItem[]) => void) {
    if (!newValue)
        array[i].isFolded = false;
    else
        for (let j = i; j === i || array[j].depth > array[i].depth; j++)
            array[j].isFolded = true;

    setState([...array]);
}

function process(): ListItem[] {
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

    return flattened.map(x => {return { ...x, isFolded: false }});
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