import { Component } from "preact";
import { incrementFeat1, incrementFeat2, incrementFeat3 } from "../feat_variables.js";
import ArrowRight from "../components/Arrow";

import GoogleSignInButton from "../googlesignin";
import { ContinueAsGuest } from "../components/buttons";
import AvatarMaking from "./AvatarMaking.jsx";

export default class Home extends Component {
    constructor() {
        super();
    }

    // async componentWillMount() {
    //     const connectButton = await connectToServer();
    //     this.setState({ connectButton })
    // }
    async componentDidMount() {
    }
    
    render = ({}, {}) => (
        <>
            <h1>Jammin'</h1>
            <AvatarMaking/>
            {/* < ArrowRight styl={""} funct = {incrementFeat1()}/> */}
            <a href="/editor"></a>
        </>
    )
}