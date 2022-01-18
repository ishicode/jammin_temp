
const num_of_feat = 4;
let feat1 = 0;
let feat2 = 0;
let feat3 = 0;

export function incrementFeat1()
{
    feat1=(feat1+1)%num_of_feat;
}
export function decrementFeat1()
{
    feat1=(feat1-1+num_of_feat)%num_of_feat;
}
export function incrementFeat2()
{
    feat2=(feat2+1)%num_of_feat;
}
export function decrementFeat2()
{
    feat2=(feat2-1+num_of_feat)%num_of_feat;
}
export function incrementFeat3()
{
    feat3=(feat3+1)%num_of_feat;
}
export function decrementFeat3()
{
    feat3=(feat3-1+num_of_feat)%num_of_feat;
}