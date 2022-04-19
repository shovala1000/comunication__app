import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import App from "./App";
import SignManagement from "./SignManagement/SignManagement";
import ChatScreen from "./ChatPage/screen/ChatScreen";
const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    rootElement
);