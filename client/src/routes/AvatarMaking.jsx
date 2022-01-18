import {ArrowLeft, ArrowRight} from "../components/Arrow";

import "../googlesignin";




const AvatarMaking = () => 
    (
        <div class="avatardiv">
            <ArrowRight styl={""} function={incrementFeat1()} />
            <ArrowRight styl={""} function={incrementFeat2()} />
            <ArrowRight styl={""} function={incrementFeat3()} />
            <ArrowLeft styl={""} function={decrementFeat1()} />
            <ArrowLeft styl={""} function={decrementFeat2()} />
            <ArrowLeft styl={""} function={decrementFeat3()} />
        </div>
    );

export default AvatarMaking;