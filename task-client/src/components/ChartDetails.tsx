import React from 'react';
import { Title } from './Title';
import {SplitButton} from './SplitButton';


type detailsProps = {
  id: string;
  attr:string;
  func:any;
};
function ChartDetails(props:detailsProps) {

  return (
    <React.Fragment>
      <Title title="Graph details"></Title>
      <em>
        Function used:- <small><b>{props.id}</b></small>
      </em>
      <em>
        Attribute used:- <small><b>{props.attr}</b></small>
      </em>
      <br></br>
      <i>Please choose an attribute then press the button.</i>
      <SplitButton func = {props.func}/>

    </React.Fragment>
  );
}
ChartDetails.displayName = "ChartDetailsComponent";
export { ChartDetails };