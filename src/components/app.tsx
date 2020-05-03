import * as React from "react";
import { PokeInfo,PokeList} from "./pokemon"
import {Popup} from "./popup";

const baseURL:string = "https://pokeapi.co/api/v2/";

//Shorthand for the type of PokeNames
type nameList = Array<PokeInfo>;
//Internal App State
interface AppState {
    current: number, //Current first element
    idx: number[], //Ids of currently displayed pokemon
    popId: number, //Id of pop-up Pokemon
    searchTerm: string, //Current search term
    pokeNames: nameList //List of all pokemon that can be displayed
}

export class App extends React.Component<{perPage: number, maxPoke: number},AppState> {
    constructor(props: {perPage: number, maxPoke: number}) {
        super(props);
        let idx = Array.from(Array(this.props.perPage).keys()).map((val) => {
            if(val >= 807) {
                return (val + 9193 + 1)
            }
            return (val + 1);
        });
        this.state = {
            current: 1,
            idx: idx,
            popId: null,
            searchTerm: '',
            pokeNames: null
        };
        this.idxGenerator = this.idxGenerator.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.enterTerm = this.enterTerm.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.enterSearch = this.enterSearch.bind(this);
        this.pokeSearch = this.pokeSearch.bind(this);
        this.pokeClick = this.pokeClick.bind(this);
        this.pokeClose = this.pokeClose.bind(this);
    }
    // Convenience function to set current idx
    idxGenerator(min: number, max: number):void {
        this.setState({
            current: min,
            idx: Array.from(Array(max - min).keys()).map((val) => {
                if (min + val >= 807) {
                    return (min + val + 9193)
                }
                return (min + val)
            })
        })
    }
    /*
    ---- EVENT HANDLERS ----
    */
    // Event handler for previous button
    handlePrevious():void {
        if (this.state.idx[0] >= this.props.perPage){
            this.idxGenerator(this.state.current - this.props.perPage, this.state.current);
        }
    }
    // Event handler for next button
    handleNext():void  {
        let last_term = this.state.idx[this.state.idx.length - 1];
        if (last_term == this.props.maxPoke){
            alert('No more pokemon to display!');
            return;
        } else if(last_term > this.props.maxPoke - this.props.perPage ) {
            this.idxGenerator(last_term + 1, this.props.maxPoke + 1);
        } else {
            this.idxGenerator(this.state.current + this.props.perPage, last_term + this.props.perPage + 1);
        }
    }
    // Event handler for onChange for search input
    enterTerm(e: React.FormEvent<HTMLInputElement>):void {
        let term = e.currentTarget.value.toLowerCase();
        if (term === '') {
            this.idxGenerator(this.state.current, this.state.current + this.props.perPage);
            this.setState({
                searchTerm: ''
            })
        } else {
            let searchPokeInfo = this.state.pokeNames.slice().filter((val) => {
                return (val['name'].includes(term))
            });
            let searchIdx = searchPokeInfo.map((val) => val.id);
            this.setState({
                searchTerm: e.currentTarget.value.toLowerCase(),
                idx: searchIdx
            });
        }

    }
    // Event handler for search button
    clickSearch(e: React.MouseEvent<HTMLInputElement>):void {
        e.preventDefault();
        this.pokeSearch()
    }
    // Event handler for enter key
    enterSearch(e: React.KeyboardEvent){
        if(e.key === 'Enter'){
            if(this.state.popId) {
                this.pokeClose()
            } else {
                this.pokeSearch();
            }
        }
    }
    // Event handler for clicking on a pokemon
    pokeClick(id: number):void {
        this.setState({
            popId: id
        })
    }
    // Event handler for closing a selected pokemon
    pokeClose():void {
        this.setState({
            popId: null
        })
    }

    /*
        SEARCH + REACT LIFECYCLE FUNCTIONS
    */

    // Searches for a Pokemon and displays if a match was found or there's only one pokemon displayed currently
    pokeSearch():void {
        let return_val:PokeInfo = this.state.pokeNames.find((val) => {
            return (val['name'] == this.state.searchTerm);
        });

        if (return_val != undefined ) {
            this.setState({
                popId: return_val['id']
            })
        } else if(this.state.idx.length == 1) {
            this.setState({
                popId: this.state.idx[0]
            })
        }
        else if(this.state.idx.length == 0){
            alert('No Pokemon found with that name!');
        }
    }


    // Fetches list of all pokemon in given scope from the API
    componentDidMount(): void {
        fetch(baseURL+ 'pokemon?limit=' + this.props.maxPoke.toString())
            .then(res => res.json())
            .then(res => {
                const data:any = res['results'];
                let pokeNames:nameList = Object.entries(data).map((val:any,i) => {
                    let id = i + 1;
                    if (i >= 807) id = i + 9194;
                    return ({
                        name: val[1]['name'],
                        id: id
                    })
                });
                this.setState({
                    pokeNames: pokeNames
                })
            });
    }
    // Renders the App.
    render() {
        let searchNames = Array<PokeInfo>(this.props.perPage);
        if (this.state.pokeNames != null) {
            searchNames= this.state.pokeNames.slice().filter((val) => {
                return this.state.idx.includes(val.id)
            });
        }
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
                 pokeNames={searchNames}
                 handler={this.pokeClick}
             />
                { this.state.popId &&
                    <Popup
                        id={this.state.popId}
                        handleClose = {this.pokeClose}
                    />
                }
                {   this.state.searchTerm === '' &&
                    <div className="buttons">
                        <button id="prev" onClick={this.handlePrevious}> Previous</button>
                        <button id="next" onClick={this.handleNext}> Next</button>
                    </div>
                }
            </div>


        );
    }
}
