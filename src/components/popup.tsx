import * as React from 'react';
import {upperFirst} from "./helpers";

const baseURL:string = "https://pokeapi.co/api/v2/";

type popProps = {
    id: number,
    closer: () => void
}

type popPoke = {
    name: string;
    height: number;
    weight: number;
    img: string[];
    type: string;
    games: string;
    abilities: string;
}
export class Popup extends React.Component<popProps, popPoke> {
    constructor(props: popProps) {
        super(props);
        this.state = {
            name: null,
            height: null,
            weight: null,
            img: [null,null,null,null],
            type: null,
            games: null,
            abilities: null
        };
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }
    propUpRef = React.createRef<HTMLDivElement>();
    componentDidMount(): void {
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
    componentWillUnmount(): void {

        document.removeEventListener('click',this.handleOutsideClick, false)
    }

    handleOutsideClick(e: MouseEvent):void{
        if(!this.propUpRef.current.contains(e.target as Node)){
            this.props.closer();
        }
    }

    render(){
        return (
            <div className= "popup">
                <div className= "popup_inner">
                    <div ref = {this.propUpRef} className="content">
                        <div className = "images">
                            <div id = "default_imgs">
                                <h4> Default: </h4>
                                <img src = {this.state.img[0]} alt = {this.state.name + ' front'}/>
                                <img src = {this.state.img[1] } alt = { this.state.name + 'back'}/>
                            </div>
                            <div id = "shiny_imgs">
                                <h4> Shiny: </h4>
                                <img src = {this.state.img[2]} alt = {this.state.name + ' shiny front'}/>
                                <img src = {this.state.img[3]} alt = {this.state.name + 'shiny back'}/>
                            </div>
                        </div>
                        <div className="description">
                            <h3>
                                <span className= "desc_head">  Name: </span>
                                {this.state.name}
                            </h3>
                            <h4> <span className = "desc_head"> Type: </span> {this.state.type}</h4>
                            <h4>
                                <span className= "desc_head">  Height: </span> {
                                Math.round(this.state.height * 10).toString() + 'cm'},
                                <span className= "desc_head"> Weight: </span>
                                {Math.round(this.state.weight * 0.1) + 'kg'}
                            </h4>
                            <p>
                                <span className = "desc_head"> Abilities: </span>
                                {this.state.abilities}
                                {"\n"}
                            </p>
                            <p>
                                <span className= "desc_head" >Games: </span>
                                {this.state.games}
                            </p>

                        </div>
                        <button id = "closeButton" onClick={() => this.props.closer()}> Close </button>
                    </div>

                </div>
            </div>
        )
    }
}