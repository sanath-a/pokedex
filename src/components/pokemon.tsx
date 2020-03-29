import * as React from "react";
import {upperFirst} from "./helpers";

const baseImg:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";


// Type of incoming props
type PokeListProps = {
    handler: (id: number) => void
    pokeNames: Array<PokeInfo>
}
// Least amount of information needed to represent a pokemon. Id and Name.
export interface PokeInfo {
    id: number,
    name: string,
}
/* 
    The main component of the app. PokeList receives an array of PokeInfo and the onClick handler. It is stateless.
    PokeList passes its props down to the Pokemon function, which renders.
 */
export class PokeList extends React.Component<PokeListProps,{}> {
    render() {
      return (
          <div className= "pokeList">
              {
                  this.props.pokeNames.map((poke) => {
                      return (<Pokemon
                              key = {poke.id}
                              handleClick = {this.props.handler}
                              data = {{id: poke.id, name: poke.name}}
                              />
                      );
                  })
              }
          </div>

        );
    }
}

// Receives a PokeInfo object and a click handler to render a pokemon in the pokemon list.
const Pokemon = (props: { data: PokeInfo, handleClick: (id: number) => void}) => {
    const img_url : string = baseImg + props.data.id.toString() + '.png';
    let name = upperFirst(props.data.name);
    return (
        <div
            className = "pokemon"
            onClick={() => props.handleClick(props.data.id)}
        >
            <img
                src = {img_url}
                alt = {props.data.name}
                id = {props.data.id.toString()}
            />
            <h3> {name}</h3>
        </div>
    );
};
