import { EditorData } from "../endpoints/endpoint-request-editor";

export interface EnvTabContent extends EditorData {
    env: string;
}