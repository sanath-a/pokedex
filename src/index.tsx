import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/app";

ReactDOM.render(
    <App
        perPage={20}
        maxPoke={50}/>,
    document.getElementById("container")
);
