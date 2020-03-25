import * as React from 'react';

type descProps = {
    name: string,
    height: number,
    weight: number,
    type: string,
    games: string,
    abilities: string
}
type descriptionState = {
    hasGames: boolean
}
export class Description extends React.Component<descProps, descriptionState> {
    constructor(props: descProps) {
        super(props);
        this.state = {
            hasGames: this.props.games != null,
        }
    }

    render() {
        let games:JSX.Element;
        console.log(this.props.games);
        if(this.props.games) {
            games = (
                <p>
                    <span className= "desc_head">Games: </span>
                    {this.props.games}
                </p>
            )
        } else {
            games = (
                <p>
                    <span className= "desc_head">Games: </span>
                    {"No information available"}
                </p>
            )
        }
        console.log(games);
        return (
            <div className="description">
                <h3>
                    <span className= "desc_head">  Name: </span>
                    {this.props.name}
                </h3>
                <h4> <span className = "desc_head"> Type: </span> {this.props.type}</h4>
                <h4>
                    <span className= "desc_head">  Height: </span> {
                    Math.round(this.props.height * 10).toString() + 'cm'},
                    <span className= "desc_head"> Weight: </span>
                    {Math.round(this.props.weight * 0.1) + 'kg'}
                </h4>
                <p>
                    <span className = "desc_head"> Abilities: </span>
                    {this.props.abilities}
                    <br/>
                </p>
                {games}
            </div>
        );

    }
}