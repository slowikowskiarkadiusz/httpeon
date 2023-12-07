import { createRoot } from 'react-dom/client';
import { App } from "./App";

export const root = createRoot(document.body);
root.render(<App></App>);