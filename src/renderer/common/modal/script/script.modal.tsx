import { dispatchUpdateCacheEvent } from "../../../app";

export function ScriptModal(props: {
    originalValue: string,
    placeholder: string,
    onUpdate?: (value: string) => void,
    onFinish?: (value: string, context: { [p: string]: any }) => void
}) {
    return <div style={ {
        display: 'flex',
        height: '100%',
        width: '100%',
    } }>
        <div placeholder={ props.placeholder }
             style={ {
                 fontFamily: 'Menlo',
                 whiteSpace: 'pre',
                 flex: '1 0 auto',
                 padding: '0.25em',
                 color: 'var(--theme-font-color)',
                 backgroundColor: 'var(--theme-bc-2)',
                 border: 'none',
             } }
             dangerouslySetInnerHTML={ { __html: props.originalValue } }
             contentEditable={ true }
             onInput={ (e) => {
                 if (props.onUpdate) props.onUpdate((e.target as HTMLDivElement).innerText);
                 dispatchUpdateCacheEvent();
             } }>
        </div>
    </div>
}

// let context = { ...props.context };
// let response = { "status": 200, "statusText": "OK", "body": "[{\"date\":\"2024-01-15\",\"temperatureC\":25,\"summary\":\"Freezing\",\"temperatureF\":76},{\"date\":\"2024-01-16\",\"temperatureC\":13,\"summary\":\"Hot\",\"temperatureF\":55},{\"date\":\"2024-01-17\",\"temperatureC\":33,\"summary\":\"Cool\",\"temperatureF\":91},{\"date\":\"2024-01-18\",\"temperatureC\":21,\"summary\":\"Sweltering\",\"temperatureF\":69},{\"date\":\"2024-01-19\",\"temperatureC\":-17,\"summary\":\"Balmy\",\"temperatureF\":2}]", "headers": [["content-type", "application/json; charset=utf-8"], ["date", "Sat, 13 Jan 2024 23:06:57 GMT"], ["server", "Kestrel"], ["transfer-encoding", "chunked"]] }
// eval((e.target as HTMLDivElement).innerText);
// props.onFinish((e.target as HTMLDivElement).innerText, context);