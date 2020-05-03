import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/app";

ReactDOM.render(
    <App
        perPage={20}
        maxPoke={964}/>,
    document.querySelector("#root")
);
