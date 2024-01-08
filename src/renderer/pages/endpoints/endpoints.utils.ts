export interface Endpoints {
    [path: string]: {
        methods: string[];
    }
}

export function fromOpenApi(apiSpecs: { [p: string]: any }): Endpoints {
    let result: { [p: string]: any } = {};
    let paths = apiSpecs['paths'];

    Object.keys(paths).forEach(path => {
        let modifiedPath = path.startsWith('/') ? path.substring(1) : path;
        console.log(path);
        const methods = Object.keys(paths[path]);
        result[modifiedPath] = { ...result[modifiedPath], methods };
    });

    return result;
}