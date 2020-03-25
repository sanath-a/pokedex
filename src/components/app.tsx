import * as React from "react";
import { PokeInfo,PokeList} from "./pokemon"
import {Popup} from "./popup";

const baseURL:string = "https://pokeapi.co/api/v2/";

type nameList = Array<PokeInfo>;
interface AppState {
    min: number,
    idx: number[],
    pop: boolean,
    popId: number,
    searchTerm: string,
    pokeNames: nameList
}
export class App extends React.Component<{perPage: number, maxPoke: number},AppState> {
    constructor(props: null) {
        super(props);
        let idx = Array.from(Array(this.props.perPage).keys()).map((val) => {
            if(val > 807) {
                return (val + 9193 + 1)
            }
            return (val + 1);
        });
        this.state = {
            min: idx[0],
            idx: idx,
            pop: false,
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

    idxGenerator(min: number, max: number):void {
        this.setState({
            min: min,
            idx: Array.from(Array(max - min).keys()).map((val) => {
                if (min + val > 808) {
                    return (min + val + 9193)
                }
                return (min + val)
            })
        })
    }
    handlePrevious():void {
        if (this.state.idx[0] >= this.props.perPage){
            this.idxGenerator(this.state.min - this.props.perPage, this.state.idx[this.state.idx.length - 1] - this.props.perPage + 1);
        }
    }
    handleNext():void  {
        let last_term = this.state.idx[this.state.idx.length - 1];
        if (last_term == this.props.maxPoke){
            return
        } else if(this.state.idx[this.state.idx.length - 1] > this.props.maxPoke - this.props.perPage ) {
            this.idxGenerator(last_term, this.props.maxPoke + 1);
        } else {
            this.idxGenerator(this.state.min + this.props.perPage, last_term + this.props.perPage + 1);
        }
    }

    enterTerm(e: React.FormEvent<HTMLInputElement>):void {
        let term = e.currentTarget.value.toLowerCase();
        if (term === '') {
            this.idxGenerator(this.state.min, this.state.min + this.props.perPage);
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

    clickSearch(e: React.MouseEvent<HTMLInputElement>):void {
        e.preventDefault();
        this.pokeSearch()
    }
    enterSearch(e: React.KeyboardEvent){
        if(e.key === 'Enter'){
            if(this.state.pop) {
                this.pokeClose()
            } else {
                this.pokeSearch();
            }
        }
    }

    pokeSearch():void {
        let return_val:PokeInfo = this.state.pokeNames.find((val) => {
            return (val['name'] == this.state.searchTerm);
        });

        if (return_val != undefined ) {
            this.setState({
                pop: true,
                popId: return_val['id']
            })
        } else if(this.state.idx.length == 1) {
            this.setState({
                pop: true,
                popId: this.state.idx[0]
            })
        }
        else if(this.state.idx.length == 0){
            alert('No Pokemon found with that name!');
        }
    }

    pokeClick(id: number):void {
        this.setState({
            pop: true,
            popId: id
        })
    }

    pokeClose():void {
        this.setState({
            pop: false,
            popId: null
        })
    }

    componentDidMount(): void {
        fetch(baseURL+ 'pokemon?limit=' + this.props.maxPoke.toString())
            .then(res => res.json())
            .then(res => {
                const data:any = res['results'];
                let pokeNames:nameList = Object.entries(data).map((val:any,i) => {
                    let id = i + 1;
                    if (i > 807) id = i + 9194;
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
                { this.state.pop &&
                    <Popup
                        id={this.state.popId}
                        closer = {this.pokeClose}
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
