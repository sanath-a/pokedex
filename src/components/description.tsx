import * as React from 'react';

type descProps = {
    name: string,
    height: number,
    weight: number,
    type: string,
    games: string,
    abilities: string
}

// Displays a description of the displayed pokemon.
export function Description(props: descProps) {
    let games:JSX.Element;
    console.log(props.games);
    if(props.games) {
        games = (
            <p>
                <span className= "desc_head">Games: </span>
                {props.games}
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

    return (
        <div className="description">
            <h3>
                <span className= "desc_head">  Name: </span>
                {props.name}
            </h3>
            <h4> <span className = "desc_head"> Type: </span> {props.type}</h4>
            <h4>
                <span className= "desc_head">  Height: </span> {
                Math.round(props.height * 10).toString() + 'cm'},
                <span className= "desc_head"> Weight: </span>
                {Math.round(props.weight * 0.1) + 'kg'}
            </h4>
            <p>
                <span className = "desc_head"> Abilities: </span>
                {props.abilities}
                <br/>
            </p>
            {games}
        </div>
    );

}