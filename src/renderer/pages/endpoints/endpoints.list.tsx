import '../../sidebar/lists.scss';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { EndpointTabContent } from "./endpoint.tab-content";
import { makeTabSetup } from "../tab-setup";
import { testOpenApi } from "../../common/test.openapi";

interface ListItem {
    label: string,
    depth: number,
    isFolded: boolean,
    isFoldable: boolean,
}

export function EndpointsList() {
    const apiSpecs: { [p: string]: any } = testOpenApi['paths'];
    const [list, setList] = useState(process(apiSpecs));
    const [lastClickedOnIndex, setLastClickedOnIndex] = useState(-1);

    return <>
        { list
            .map((item, i, c) => {
                return isRenderable(i, c)
                    ? <li key={ `endpoint-list-item-${ i }` }
                          className={ lastClickedOnIndex === i ? 'selected' : null }
                          style={ { paddingLeft: `${ item.depth * 1.5 }em` } }
                          onClick={ () => {
                              if (item.isFoldable)
                                  fold(!item.isFolded, i, c, (list: ListItem[]) => setList(list));
                              setLastClickedOnIndex(i);
                              let endpoints = endpointsForPath(i, c, apiSpecs);
                              if (endpoints?.length) {
                                  const fullPath = getFullPath(i, c);
                                  const tabSetup = makeTabSetup<EndpointTabContent>('endpoints', fullPath, fullPath, true, {
                                      endpoint: fullPath,
                                      method: endpoints[0],
                                      input: {
                                          tabs: {
                                              Params: {
                                                  content: '',
                                              },
                                              Body: {
                                                  content: '',
                                                  allowedDisplayModes: ['text']
                                              },
                                              Headers: {
                                                  content: '[]',
                                              },
                                          }
                                      },
                                      output: {
                                          Request: { url: '', method: '', headers: [] },
                                          Response: {
                                              status: undefined,
                                              headers: [],
                                              body: undefined,
                                          },
                                      }
                                  });
                                  window.dispatchEvent(new CustomEvent('sidebar_list_item_selected', { detail: tabSetup }));
                              }
                          } }>
                        { item.isFoldable
                            ? <FontAwesomeIcon style={ {
                                fontSize: '0.75em',
                                display: 'flex',
                                margin: 'auto',
                            } }
                                               icon={ item.isFolded ? faChevronRight : faChevronDown }/>
                            : <div/> }
                        <span>
                            { item.label } &nbsp;&nbsp;
                            { endpointsForPath(i, c, apiSpecs)?.map((xx, ii) => buttonForHttpMethod(xx, i, ii)) }
                        </span>
                    </li>
                    : undefined
            }) }
    </>
}

function endpointsForPath(i: number, array: ListItem[], apiSpecs: { [p: string]: any }) {
    let fullPath = getFullPath(i, array);
    let inSpecs = apiSpecs[fullPath];
    return inSpecs ? Object.keys(inSpecs) : undefined;
}

function getFullPath(i: number, array: ListItem[]): string {
    let parentId = getParentId(i, array);
    return `${ parentId >= 0 ? getFullPath(parentId, array) : '' }/${ array[i].label }`;
}

function getParentId(i: number, array: ListItem[]): number {
    let parentIndex = i - 1;
    for (; parentIndex > 0 && array[parentIndex].depth >= array[i].depth; parentIndex--) {
    }

    return parentIndex;
}

function isRenderable(i: number, array: ListItem[]): boolean {
    if (i === 0) return true;

    let parentIndex = getParentId(i, array);
    array[parentIndex].isFoldable = true;

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

function process(apiSpecs: { [p: string]: any }): ListItem[] {
    let result: { [p: string]: any } = {};

    Object.keys(apiSpecs).forEach(path => {
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

    return flattened.map(x => {return { ...x, isFolded: false, isFoldable: false }});
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

export function buttonForHttpMethod(method: string, ci: number, i: number) {
    return <button key={ `buttonForHttpMethod-${ ci }-${ i }` }
                   style={ {
                       border: 'none',
                       borderRadius: '9em',
                       fontSize: '0.9em',
                       backgroundColor: `var(--http-${ method }-bc)`,
                       color: 'var(--theme-bc)',
                       padding: '0em 0.75em',
                       height: '100%',
                   } }>
        { method }
    </button>
}