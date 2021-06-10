import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Button,
  CardMedia,
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  NativeSelect,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from "@material-ui/core";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { increment, amountAdded } from "./features/counter/counterSlice";
import { useFetchBreedsQuery } from "./features/dogs/dogsSlice";
import classes from "*.module.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    CardMedia: {
      height: 250,
      width: 250,
    },
    tableCell: {
      color: "#ffffff",
      fontSize: 20,
    },
    margin: {
      margin: theme.spacing(1),
    },
    nativSelect: {
      backgroundColor: "#ffffff"
    }
  })
);

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const [numDogs, setNumDogs] = useState(10);
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs);

  const handleClick = () => {
    /* dispatch(increment()); */
    dispatch(amountAdded(2));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <Paper elevation={1}>
          <Button onClick={handleClick}>Counter is: {count}</Button>
        </Paper>
        <Grid>
          <Grid>Dogs to fetch</Grid>
          <FormControl className={classes.margin}>
            <NativeSelect
            className={classes.nativSelect}
              id="dogs-select"
              value={numDogs}
              onChange={(e) => setNumDogs(Number(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </NativeSelect>
          </FormControl>
        </Grid>

        <Grid>
          <Typography>Number of dogs fetched: {data.length}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCell}>name</TableCell>
                <TableCell className={classes.tableCell}>picture</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((breed) => (
                <TableRow key={breed.id}>
                  <TableCell className={classes.tableCell}>
                    {breed.name}
                  </TableCell>
                  <TableCell>
                    <CardMedia
                      image={breed.image.url}
                      className={classes.CardMedia}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </header>
    </div>
  );
}

export default App;
