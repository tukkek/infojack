import {rpg} from '../rpg';

//lower GDP to highest GDP
//source: http://databank.worldbank.org/data/download/GDP.xls
//TODO "fictionalize" more nation names
var NATIONALITIES=
  ['Chilean','Pakistani','Colombian','Philippine','Malay','Singaporean','Danish','Irish','African','Zionist','Norse','Austrian','Iranian','Thai','Belgian','Polish','Swedish','Argentine','Swiss','Arabic','Dutch','Turkish','Indonesian','Aztec','Spanish','Australian','Korean','Russian','Canadian','Italian','Brazilian','French','Indian','British','German','Japanese','Chinese','American'];

//from least to top revenue
//source: https://eresearch.fidelity.com/eresearch/markets_sectors/sectors/sectors_in_market.jhtml
var INDUSTRIES=
  ['Transportation','Distribution','Commerce','Utilities','Health','Finance','Energy','Construction','Finance','Services','Commerce','Construction','Transportation','Commerce','Finance','Auto','Transportation','Distribution','Finance','Commerce','Services','Energy','Electronics','Commerce','Tobacco','Communications','Transportation','Foods','Commerce','Finance','Communication','Foods','Auto','Energy','Commerce','Machinery','Tourism','Transportation','Distribution','Military','Chemicals','Mining','Health','Foods','Media','Biotechnology','Communication','Real estate','Technology','Finance','Commerce','Insurance','Electronics','Pharmaceuticals','Technology','Fuel','Banking'];
  
function pick(level,array){
  let range=rpg.r(10,25);
  let reference=100*(level-1)/19;
  let lower=reference-range;
  if(lower<0) lower=0;
  else if(lower>100-range) lower=100-range;
  let higher=reference+range;
  if(higher>100) higher=100;
  else if(higher<range) higher=range;
  lower=Math.round(lower);
  higher=Math.round(higher);
  let roll=rpg.r(lower,higher);
  let index=Math.round((array.length-1)*roll/100);
  return array[index];
}
  
export function name(level){
  if(level<1) level=1;
  else if(level>20) level=20;
  return pick(level,NATIONALITIES)+' '+pick(level,INDUSTRIES).toLowerCase();
}
