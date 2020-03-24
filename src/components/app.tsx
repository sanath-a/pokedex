import * as React from "react";
import { PokeList} from "./pokemon"
import {Popup} from "./popup";

interface AppState {
    min: number,
    max: number,
    pop: boolean,
    popId: number
}
export class App extends React.Component<{},AppState> {
    constructor(props: null) {
        super(props);

        this.state = {
            min: 1,
            max: 16,
            pop: false,
            popId: null
        }
    }


    handlePrevious():void {
        if (this.state.min >= this.state.max-this.state.min){
            this.setState({
                min: this.state.min - (this.state.max - this.state.min),
                max: (this.state.max) -(this.state.max - this.state.min)
            })
        }
    }
    handleNext():void  {
        this.setState(
            {
                min: this.state.max,
                max: 2 * this.state.max - this.state.min
            }
        );
    }


    pokeClick(id: number) {
        this.setState({
            min: this.state.min,
            max: this.state.max,
            pop: true,
            popId: id
        })
    }

    pokeClose() {
        console.log('close');
        this.setState({
            min: this.state.min,
            max: this.state.max,
            pop: false,
            popId: null
        })
    }

    render() {
        let idx: Array<number> = Array.from(Array(this.state.max - this.state.min).keys()).map((val) => {
            return (val + this.state.min);
        });
        return (
            <div className = "App">
                <header>
                    <h1> Pokedex </h1>
                    <p> A project made with Typescript + React</p>
                </header>
             <PokeList
                 min = {this.state.min}
                 max = {this.state.max}
                 pokeIdx={idx}
                 handler={this.pokeClick.bind(this)}
             />
                { this.state.pop ?
                    <Popup
                        id={this.state.popId}
                        closer = {this.pokeClose.bind(this)}
                    /> :
                    null
                }

                <div className="buttons">
                    <button id = "prev" onClick={this.handlePrevious.bind(this)}> Previous </button>
                    <button id = "next" onClick={this.handleNext.bind(this)}> Next</button>
                </div>
            </div>

        );
    }
}
