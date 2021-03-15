import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { TypesListItems, CategoryListItems} from './listItems';
import { ChartDetails } from './ChartDetails';
import {Chart} from './Chart';
import {CollapsibleTable} from './CollapsibleTable';
import Styles from './Styles';


function App() {
  const classes = Styles();
  const [open, setOpen] = React.useState(true);
  const [identifier, setIdentifier] = React.useState("categories/PV");
  const [attr, setAttr] = React.useState("missingAmount");
  const handleChangedAttr= (id:string) => {
    setAttr(id);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChangedID = (id:string) => {
    setIdentifier(id);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Measurements Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><CategoryListItems func = {handleChangedID}/></List>
        <Divider />
        <List><TypesListItems func = {handleChangedID}/></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart url={identifier} attr={attr}/>
              </Paper>
            </Grid>
            {/* Recent ChartDetails */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              <ChartDetails id={identifier} attr={attr} func = {handleChangedAttr}/>
              </Paper>
            </Grid>
            {/*  CollapsibleTable */}
            <Grid item xs={12}>
              <h4><em><b>All Entries</b></em></h4> 
              <Paper className={classes.paper}>
                <CollapsibleTable />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
          </Box>
        </Container>
      </main>
    </div>
  );
}
Chart.displayName = "AppComponent";
export { App };