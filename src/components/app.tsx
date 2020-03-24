import * as React from "react";
import { PokeInfo,PokeList} from "./pokemon"
import {Popup} from "./popup";
const baseURL:string = "https://pokeapi.co/api/v2/";

type nameList = Array<PokeInfo>;
interface AppState {
    min: number,
    max: number,
    pop: boolean,
    popId: number,
    searchTerm: string,
    pokeNames: nameList
}
export class App extends React.Component<{},AppState> {
    constructor(props: null) {
        super(props);

        this.state = {
            min: 1,
            max: 16,
            pop: false,
            popId: null,
            searchTerm: '',
            pokeNames: null
        };
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.enterTerm = this.enterTerm.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.enterSearch = this.enterSearch.bind(this);
        this.pokeSearch = this.pokeSearch.bind(this);
        this.pokeClick = this.pokeClick.bind(this);
        this.pokeClose = this.pokeClose.bind(this);
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

    enterTerm(e: React.FormEvent<HTMLInputElement>):void {
        this.setState({
            searchTerm: e.currentTarget.value.toLowerCase()
        })
    }

    clickSearch(e: React.MouseEvent<HTMLInputElement>):void {
        e.preventDefault();
        this.pokeSearch()
    }
    enterSearch(e: React.KeyboardEvent){
        if(e.key === 'Enter'){
            this.pokeSearch();
        }
    }

    pokeSearch():void {
        console.log(this.state);
        let return_val:PokeInfo = this.state.pokeNames.find((val) => {
            return (val['name'] == this.state.searchTerm);
        });

        if (return_val != undefined) {
            this.setState({
                pop: true,
                popId: return_val['id']
            })
        } else {
            alert('No Pokemon found with that name!');
        }
    }

    pokeClick(id: number):void {
        this.setState({
            min: this.state.min,
            max: this.state.max,
            pop: true,
            popId: id
        })
    }

    pokeClose():void {
        this.setState({
            min: this.state.min,
            max: this.state.max,
            pop: false,
            popId: null
        })
    }

    componentDidMount(): void {
        fetch(baseURL+ 'pokemon?limit=1000')
            .then(res => res.json())
            .then(res => {
                const data:any = res['results'];
                let pokeNames:nameList = Object.entries(data).map((val:any,i) => {

                    return ({
                        name: val[1]['name'].split('-')[0],
                        id: i+1
                    })
                });
                this.setState({
                    pokeNames: pokeNames
                })
            });
    }

    render() {
        let idx: Array<number> = Array.from(Array(this.state.max - this.state.min).keys()).map((val) => {
            return (val + this.state.min);
        });
        return (
            <div className = "App">
                <header>
                    <div className= "title">
                        <h1> Pokedex </h1>
                        <p> A project made with Typescript + React</p>
                    </div>
                    <div className= "search_form">
                        <input type="text"
                               value = {this.state.searchTerm}
                               placeholder= "Search for a pokemon!"
                               onKeyDown={this.enterSearch}
                               onChange={this.enterTerm}/>

                        <button id = "search_btn" onClick = {this.clickSearch}> Search </button>
                    </div>


                </header>
             <PokeList
                 min = {this.state.min}
                 max = {this.state.max}
                 pokeIdx={idx}
                 handler={this.pokeClick}
             />
                { this.state.pop &&
                    <Popup
                        id={this.state.popId}
                        closer = {this.pokeClose}
                    />
                }

                <div className="buttons">
                    <button id = "prev" onClick={this.handlePrevious}> Previous </button>
                    <button id = "next" onClick={this.handleNext}> Next</button>
                </div>
            </div>

        );
    }
}
