import Preact, { Component } from "preact";
import "./arrow.css";
import "../feat_variables.js";

class ArrowRight extends Component{
    constructor(){
        super();
    }
    
    render = ({},{styl, funct}) => (
        <button className="arrowright" style = {props.styl} onClick={props.funct}>
            <img src="rightarrow.png"/>
        </button>
    )
}
class ArrowLeft extends Component{
    render = ({styl,funct},{}) => (
        <button className="arrowleft"  style = {props.styl} onClick={props.funct}>
            <img src="rightarrow.png" style="transform: scaleX(-1)"/>
        </button>
    );
}

export  {ArrowRight, ArrowLeft};

