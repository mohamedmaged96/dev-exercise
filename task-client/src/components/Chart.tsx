import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import {Title} from './Title';
import axios from 'axios';

type chartProps = {
  url: string;
  attr:string;
};
function Chart(props:chartProps) {
  const initResult:any[]=[];
  const [result,setResult]= React.useState(initResult);
  const title:string=props.url.split("/")[0]+"-"+props.url.split("/")[1] +" Function Behavior Per User";
  React.useEffect(() => {
    axios.get<any>("http://localhost:4000/entries/"+props.url, {
          headers: {
            "Content-Type": "application/json"
          },
        }).then(response => {
            setResult(response.data);
        });
    }, [props.url]);

  return (
    <React.Fragment>
      <Title title={title}/>
      <ResponsiveContainer width="100%" height="100%"> 
        <BarChart
          data={result}
          margin={{
            top: 16,
            right: 60,
            bottom: 0,
            left: 24,
          }}
        >
        <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis>
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar type="monotone" dataKey={props.attr} fill="#43b4cc"  />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
Chart.displayName = "ChartComponent";
export { Chart };