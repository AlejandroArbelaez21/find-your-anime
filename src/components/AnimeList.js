import React, { useContext } from 'react';
import AnimeCard from './AnimeCard';
import { SearchContext } from '../context/search';
import Carousel from 'react-elastic-carousel';
import { Typography, Grid, Paper } from '@material-ui/core';

const breakPoints = [
  { width: 1, itemsToShow:1 },
  { width: 550, itemsToShow:2 },
  { width: 768, itemsToShow:3 },
  { width: 1200, itemsToShow:5 },
];

const AnimeList = (props) => {
  const search = useContext(SearchContext);
  const data = search.animeData;

  const getScore = data.map((scores) => scores.score)
  const sum = getScore.reduce(function(a, b){
    return a + b;
  }, 0)
  const average = sum / getScore.length;
  const averageFix = average.toFixed(2);

  return (
    <>
      <Grid container item alignContent="center" alignItems="center" justify="center">
        <Paper item>
          <Typography className="results__average">
            Average score of all the anime’s seasons: <strong>{averageFix}</strong>
          </Typography>
        </Paper>
      </Grid>
      <div className="carousel">
        <Carousel breakPoints={breakPoints}>
            {props.data.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default AnimeList;