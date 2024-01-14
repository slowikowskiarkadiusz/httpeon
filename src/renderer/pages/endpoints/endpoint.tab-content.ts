import { EndpointResponseData } from "./endpoint-response";
import { EndpointRequestEditorData } from "./endpoint-request-editor";

export interface EndpointTabContent {
    endpoint: string;
    method: string;
    input: EndpointRequestEditorData;
    output: EndpointResponseData;
    postExecScript?: string;
}