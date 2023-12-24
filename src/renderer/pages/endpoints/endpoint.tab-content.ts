import { EndpointTextEditorData } from "./endpoint-text-editor";

export interface EndpointTabContent {
    endpoint: string;
    method: string;
    inputs: EndpointTextEditorData;
    outputs: EndpointTextEditorData;
}