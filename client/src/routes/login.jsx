import {GoogleSignInButton} from "../googlesignin.jsx";
import "../components/buttons";
import "../index.css";

export default function login_buttons(){
    return(
    <>
    <div id="paper-overlay" />
    <div class="squiggly logindiv">
    <google_button/>
    <continue_as_guest/>
    </div>
    </>
  );
  startApp();
  }