import { createRoot } from 'react-dom/client';
import { App } from "./app";

export const root = createRoot(document.body);
root.render(<App></App>);