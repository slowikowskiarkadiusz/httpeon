import { EndpointTextEditorData } from "./endpoint-text-editor";
import { EndpointOutputData } from "./endpoint-output";

export interface EndpointTabContent {
    endpoint: string;
    method: string;
    input: EndpointTextEditorData;
    output: EndpointOutputData;
}