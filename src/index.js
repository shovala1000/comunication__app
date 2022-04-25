import App from "./App";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const rootElement = createRoot(container); // createRoot(container!) if you use TypeScript
rootElement.render(<App tab="home" />);