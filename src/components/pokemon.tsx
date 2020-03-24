import * as React from "react";
import {upperFirst} from "./helpers";

const baseURL:string = "https://pokeapi.co/api/v2/";
const baseImg:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";



type PokeListProps = {
    min: number,
    max: number,
    handler: (id: number) => void
    pokeIdx: Array<number>;
}
type  PokeListState  = {

    pokeNames: Array<string>;
}


export class PokeList extends React.Component<PokeListProps, PokeListState> {
    constructor(props: PokeListProps) {
        super(props);
        this.state = {
            pokeNames: new Array<string>(this.props.max - this.props.min)
        }
    }

    componentDidMount(): void  {
        this.fetchNames();
    }
    componentDidUpdate(prevProps: Readonly<PokeListProps>, prevState: Readonly<PokeListState>, snapshot?: any): void {
        if(this.props.min != prevProps.min) {
            this.fetchNames();
        }
    }
    fetchNames(): void {
        fetch(baseURL + 'pokemon?fetch=' + this.props.max.toString() + "&offset=" + (this.props.min -1).toString())
            .then(res => res.json())
            .then(res => {
                let data:any = res['results'];
                this.setState({
                    pokeNames: Object.entries(data).map((data: any) => {
                        return (
                            upperFirst(data[1]['name'])
                        )
                    })
                })
            });
    }

    render() {
      return (
          <div className= "pokeList">
              {
                  this.props.pokeIdx.map((id, i) => {
                      return (<Pokemon
                              key={id}
                              id={id}
                              name={this.state.pokeNames[i]}
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
export function Pokemon(props: PokeInfo) {
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
