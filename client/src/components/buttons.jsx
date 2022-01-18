import "./buttons.css";
import "../googlesignin.jsx";

/** The green arrow play button */
export const PlayButton = (props) => (
    <div className="btn-play squiggly" {...props} />
);
/** The red circle record button */
export const RecordButton = (props) => (
    <div className="btn-record squiggly" {...props} />
);
export const GoogleSignIn = () => (
    <div class="customGPlusSignIn" style="text-align:center">
      <span class="buttonText">Login With Google</span>
    </div>
);

export const ContinueAsGuest = () => (
   <a onClick={() => window.open("/making")}>
    <div class="btn-sign-in" style="text-align:center;">
      <span class="buttonText">Continue as Guest</span>
    </div>
    </a>
);