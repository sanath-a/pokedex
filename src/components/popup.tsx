import * as React from 'react';
import {upperFirst} from "./helpers";
import {Sprites} from "./sprites";
import {Description} from "./description";

const baseURL:string = "https://pokeapi.co/api/v2/";

//Props for popUp
type popProps = {
    id: number,
    handleClose: () => void
}
//Information to be fetched displayed
type popPoke = {
    name: string;
    height: number;
    weight: number;
    img: string[];
    type: string;
    games: string;
    abilities: string;
}

/*
    Renders a popup description of a pokemon.
 */
export class Popup extends React.Component<popProps, popPoke> {
    constructor(props: popProps) {
        super(props);
        this.state = {
            name: null,
            height: null,
            weight: null,
            img: Array<string>(4),
            type: null,
            games: null,
            abilities: null
        };
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }
    //Reference to handle clicks
    propUpRef = React.createRef<HTMLDivElement>();

    /*
        --- REACT LIFECYCLE FUNCTIONS ---
     */
    //Fetches data from server and updates state
    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick, false);
        fetch(baseURL + 'pokemon/' + this.props.id.toString())
            .then(res => res.json())
            .then(data => {
                let types:string[] = Object.entries(data['types']).map((data:any) => {
                    return upperFirst(data[1]['type']['name']);
                });
                let games:string[] = Object.entries(data['game_indices']).map((data:any) => {
                    return upperFirst(data[1]['version']['name'])
                });
                let abilities:string[] = Object.entries(data['abilities']).map((data:any) => {
                    return upperFirst(data[1]['ability']['name'])
                });
                this.setState({
                    name: upperFirst(data['name']),
                    height: data['height'],
                    weight: data['weight'],
                    img: [data['sprites']['front_default'],
                        data['sprites']['back_default'],
                        data['sprites']['front_shiny'],
                        data['sprites']['back_shiny']],
                    type: types.join(', '),
                    games: games.join(', '),
                    abilities: abilities.join(', ')
                })
            });

    }
    //Removes event listener
    componentWillUnmount() {
        document.removeEventListener('click',this.handleOutsideClick, false)
    }

    // Handles a click outside of the popup
    handleOutsideClick(e: MouseEvent){
        if(!this.propUpRef.current.contains(e.target as Node)){
            this.props.handleClose();
        }
    }

    render(){
        return (
            <div className= "popup">
                <div className= "popup_inner">
                    <div ref = {this.propUpRef} className="content">
                        <Sprites
                            name={this.state.name}
                            front={this.state.img[0]}
                            back={this.state.img[1]}
                            shiny_front={this.state.img[2]}
                            shiny_back={this.state.img[3]} />


                        <Description
                            name={this.state.name}
                            height={this.state.height}
                            weight={this.state.weight}
                            type={this.state.type}
                            games={this.state.games}
                            abilities={this.state.abilities}
                        />
                        <button id = "closeButton" onClick={() => this.props.handleClose()}> Close </button>
                    </div>

                </div>
            </div>
        )
    }
}