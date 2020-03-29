import * as React from 'react';


type spriteProps = {
    name: string,
    front: string,
    back: string,
    shiny_front: string,
    shiny_back: string
}

type spriteState = {
    hasFront: boolean,
    hasBack: boolean,
    hasShinyFront: boolean,
    hasShinyBack: boolean
}
/*
    Displays sprites.
 */
export class  Sprites extends React.Component<spriteProps, spriteState>  {
    constructor(props: spriteProps) {
        super(props);
        this.state = {
            hasFront: this.props.front != null,
            hasBack: this.props.back != null,
            hasShinyFront: this.props.shiny_front != null,
            hasShinyBack: this.props.shiny_back != null
        }
    }

    componentDidUpdate(prevProps: Readonly<spriteProps>, prevState: Readonly<spriteState>, snapshot?: any): void {
        if(this.props.front != prevProps.front){
            this.setState({
                hasFront: this.props.front != null,
                hasBack: this.props.back != null,
                hasShinyFront: this.props.shiny_front != null,
                hasShinyBack: this.props.shiny_back != null
            })
        }
    }

    render() {
        return (
        <div className = "images">
            <div id = "default_imgs">
                <h4> Default: </h4>

                {
                    this.state.hasFront?
                    <img src={this.props.front} alt={this.props.name + ' front'}/>
                    : <p> Loading </p>
                }
                {
                    this.state.hasBack &&
                    <img src={this.props.back} alt={this.props.name + 'back'}/>
                }
            </div>
            <div id = "shiny_imgs">
                <h4> Shiny: </h4>
                {
                    this.state.hasShinyFront ?
                    <img src={this.props.shiny_front} alt={this.props.name + ' shiny front'}/>
                    : <p> Image Not Available </p>
                }
                {
                    this.state.hasBack &&
                    <img src={this.props.shiny_back} alt={this.props.name + 'shiny back'}/>
                }
            </div>
        </div>
        )
    }
}