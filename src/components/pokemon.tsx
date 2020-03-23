import * as React from "react";
const baseURL:string = "http://pokeapi.co/api/v2/";
const baseImg:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";


type  PokeListState  = {
    count: number;
    pokeIdx: Array<number>;
    pokeNames: Array<string>;
}


export class PokeList extends React.Component<{num: number}, PokeListState> {
    constructor(props: {num: number}) {
        super(props);
        this.state = {
            count: this.props.num,
            pokeIdx: Array.from(Array(this.props.num).keys()).map((val) => {
                return (val + 1)
            }),
            pokeNames: new Array<string>(this.props.num)
        }
    }

    componentDidMount(): void {
        fetch(baseURL + 'pokemon?fetch=' + this.state.count.toString())
            .then(res => res.json())
            .then(res => {
                let data:any = res['results'];
                this.setState({
                    count: this.state.count,
                    pokeIdx: this.state.pokeIdx,
                    pokeNames: Object.entries(data).map((data: any) => {
                        return (
                            data[1]['name']
                        )
                    })
                })
            });
    }

    render() {
      return (
            this.state.pokeIdx.map((id, i) => {
                return (<Pokemon
                    key = {id}
                    id = {id}
                    name = {this.state.pokeNames[i]}
                    />
                );
        })

        );
    }
}
export function BackButtons() {
    return (
        <div className={"buttons"}>
            <button> Previous </button>
            <button> Next </button>
        </div>
    )
}

function Pokemon(props: {id: number, name: string}) {
    const img_url : string = baseImg + props.id.toString() + '.png';
    return (
        <div className = "pokemon" >
            <img src = {img_url} alt = {props.name}/>
            <h3> {props.name}</h3>
        </div>
    );
}
