import { testOpenApi } from "../../common/test.openapi";

export interface Endpoints {
    [path: string]: {
        methods: string[];
    }
}

function fromOpenApi(apiSpecs: { [p: string]: any }): Endpoints {
    let result: { [p: string]: any } = {};
    let paths = testOpenApi['paths'];

    Object.keys(paths).forEach(path => {
        path = path.startsWith('/') ? path.substring(1) : path;
        const methods = Object.keys(paths[path]);
        result[path] = { ...result[path], methods };
    });

    return result;
}