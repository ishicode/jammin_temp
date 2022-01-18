import { createHashHistory } from "history";
import Router from "preact-router";
import { render } from "preact";

import Editor from "./routes/editor";
import Home from "./routes/home";
import Login from "./routes/login";
import AvatarMaking from "./routes/AvatarMaking";


import "./index.css";

const App = () => (
    <>
        <div id="paper-overlay" />
        <Router>
            <Home path="/" />
            <Editor path="/editor" />
            <Login path = "/login" />
            <AvatarMaking path = "/making" />
        </Router>
    </>
);

render(<App />, document.body);