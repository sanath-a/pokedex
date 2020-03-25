import * as React from "react";
import {upperFirst} from "./helpers";

const baseImg:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";



type PokeListProps = {
    handler: (id: number) => void
    pokeNames: Array<PokeInfo>
}


export class PokeList extends React.Component<PokeListProps,{}> {
    render() {
      return (
          <div className= "pokeList">
              {
                  this.props.pokeNames.map((poke) => {
                      return (<Pokemon
                              key={poke.id}
                              id={poke.id}
                              name={poke.name}
                              handleClick={this.props.handler}
                          />
                      );
                  })
              }
          </div>

        );
    }
}
export interface PokeInfo {
    id: number,
    name: string,
    handleClick?: (id: number) => void
}
function Pokemon(props: PokeInfo) {
    const img_url : string = baseImg + props.id.toString() + '.png';
    let name = upperFirst(props.name);
    if(name.includes('-')){
        let names_array = props.name.split('-').map((val) => {
            return upperFirst(val)
        });
        name = names_array.join(' ')
    }
    return (
        <div
            className = "pokemon"
            id = {props.id.toString()}
            onClick={() => props.handleClick(props.id)}
        >
            <img
                src = {img_url}
                alt = {props.name}
                id = {props.id.toString()}
            />
            <h3> {name}</h3>
        </div>
    );
}
