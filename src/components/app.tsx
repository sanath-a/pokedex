import * as React from "react";
import { PokeList, BackButtons } from "./pokemon"


export class App extends React.Component {

    render() {
        return (
            <div className = "App">

             <PokeList num={20}/>
             <BackButtons/>

            </div>

        );
    }
}
