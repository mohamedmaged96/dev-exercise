import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Entry } from '../models/Entry';
import axios from 'axios';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props: { row: Entry}) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.meta.participant.username}
        </TableCell>
        <TableCell align="right">{row.meta.time.day}</TableCell>
        <TableCell align="right">{row.measurementReport.types.length}</TableCell>
        <TableCell align="right">{row.measurementReport.categories.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                <h6><strong>Measurement Details</strong></h6>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                  <TableCell><strong>Type</strong></TableCell>
                    <TableCell><strong>Identifier</strong></TableCell>
                    <TableCell><strong>Missing</strong></TableCell>
                    <TableCell align="right"><strong>Delay</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.measurementReport.types.map((type) => (
                    <TableRow key={type.meta.identifier}>
                      <TableCell component="th" scope="row">
                        {type.meta.type}
                      </TableCell>
                      <TableCell>
                        {type.meta.identifier}
                      </TableCell>
                      <TableCell> Amount: {type.missing.amount}, Maximum: {type.missing.max}, Average: {type.missing.avr}
                          </TableCell>
                      <TableCell align="right">Amount: {type.delay.amount}, Maximum: {type.delay.max}, Average: {type.delay.avr}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableBody>
                  {row.measurementReport.categories.map((type) => (
                    <TableRow key={type.meta.identifier}>
                      <TableCell component="th" scope="row">
                        {type.meta.type}
                      </TableCell>
                      <TableCell>
                        {type.meta.identifier}
                      </TableCell>
                      <TableCell> Amount: {type.missing.amount}, Maximum: {type.missing.max}, Average: {type.missing.avr}
                          </TableCell>
                      <TableCell align="right">Amount: {type.delay.amount}, Maximum: {type.delay.max}, Average: {type.delay.avr}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function CollapsibleTable() {
  const initEntries:Entry[]=[];
  const [entries,setEntries]= React.useState(initEntries);
  React.useEffect(() => {
    axios.get<Array<Entry>>("http://localhost:4000/", {
          headers: {
            "Content-Type": "application/json"
          },
        }).then(response => {
            setEntries(response.data);
        });
    }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><strong>Username</strong></TableCell>
            <TableCell align="right"><strong>Date</strong></TableCell>
            <TableCell align="right"><strong>Number of Types</strong></TableCell>
            <TableCell align="right"><strong>Number of Categories</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((row) => (
            <Row key={row.meta.participant.username} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
CollapsibleTable.displayName = "CollapsibleTableComponent";
export { CollapsibleTable };