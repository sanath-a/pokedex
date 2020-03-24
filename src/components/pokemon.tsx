import * as React from "react";

const baseImg:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";



type PokeListProps = {
    min: number,
    max: number,
    handler: (id: number) => void
    pokeIdx: Array<number>;
    pokeNames: Array<string>;
}


export class PokeList extends React.Component<PokeListProps,{}> {
    render() {
      return (
          <div className= "pokeList">
              {
                  this.props.pokeIdx.map((id, i) => {
                      return (<Pokemon
                              key={id}
                              id={id}
                              name={this.props.pokeNames[i]}
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
            <h3> {props.name}</h3>
        </div>
    );
}
