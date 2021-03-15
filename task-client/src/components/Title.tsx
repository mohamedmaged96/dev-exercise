import React from 'react';
import Typography from '@material-ui/core/Typography';

function Title(props:titleProps) {
  return (
    <Typography component="h4" variant="h6" color="primary" gutterBottom>
      {props.title}
    </Typography>
  );
}

type titleProps = {
  title:string
};
export {Title};
