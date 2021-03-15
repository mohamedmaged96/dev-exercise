import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import CategoryIcon from '@material-ui/icons/Category';
import axios from 'axios';
import BuildIcon from '@material-ui/icons/Build';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  item: {
      fontSize: '0.6rem'
    
  }
});

type listItemProps = {
  func: any;
};
function CategoryListItems(props:listItemProps) {
  const initCategories:string[]=[];
  const [categories, setCategories]=  React.useState(initCategories);

  React.useEffect(() => {
    axios.get<Array<string>>("http://localhost:4000/categories", {
          headers: {
            "Content-Type": "application/json"
          },
        }).then(response => {
          setCategories(response.data);
        });
    }, []);

  return (
    <React.StrictMode>
        <div>
      <ListSubheader inset>Categories</ListSubheader>
      {categories.map((type) => (
      <ListItem key ={type} button onClick={() => props.func("categories/"+type)}>
      <ListItemIcon>
      <CategoryIcon />
      </ListItemIcon>
          <ListItemText primary={type}/>
           </ListItem>
           ))}
           </div>
      </React.StrictMode>

  );
}
function TypesListItems(props:listItemProps) {
  const classes = useStyles();
  const initTypes:string[]=[];

  const [types, setTypes]=  React.useState(initTypes);

  React.useEffect(() => {
    axios.get<Array<string>>("http://localhost:4000/types", {
          headers: {
            "Content-Type": "application/json"
          },
        }).then(response => {
          setTypes(response.data);
        });
    }, []);

  return (
    <React.StrictMode>
        <div>
      <ListSubheader inset>Types</ListSubheader>
      {types.map((type) => (
      <ListItem key ={type} button onClick={() => props.func("types/"+type)}>
      <ListItemIcon>
      <BuildIcon />
      </ListItemIcon>
          <ListItemText classes={{primary:classes.item}}
           primary={type}/>
           
           </ListItem>
           ))}
           </div>
      </React.StrictMode>

  );
}
TypesListItems.displayName = "TypesComponent";
CategoryListItems.displayName = "CategoryComponent";

export {TypesListItems, CategoryListItems}