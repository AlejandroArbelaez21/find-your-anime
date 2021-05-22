import React, { useContext } from 'react';
import { SearchContext } from '../context/search';
import { Typography, Link, Paper, GridListTile, Grid } from '@material-ui/core'
import './AnimeCard.css'
import { useHistory } from 'react-router';

const AnimeCard = (props) => {
  const history = useHistory();
  const search = useContext(SearchContext);


  const onClickHandler = () => {
    fetch(`https://api.jikan.moe/v3/anime/${props.anime.mal_id}`)
    .then((response) => response.json())
    .then((data) => {
      search.setSingle(data);
      localStorage.setItem('singleData', JSON.stringify(data));
      history.push('/single-view')
    });
  };

  const title = props.anime.title.length > 15 ? `${props.anime.title.substring(0, 15)}...` : props.anime.title;
  const imageUrl = props.anime.image_url;
  const synopsis = props.anime.synopsis.length > 30 ? `${props.anime.synopsis.substring(0, 30)}...` : props.anime.synopsis;
  const Score = props.anime.score;

  return (
    <GridListTile className="animeCard__container">
      <Grid container item xs={12}>
        <Paper className="animeCard__paper">
          <img src={imageUrl} alt={title} style={{ maxHeight: 300 }} />
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" component="h2" paragraph={true}>
            {synopsis}
          </Typography>
          {Score < 5 &&
            <Typography variant="body2" component="h2" paragraph={true}>
              <strong>I do not recommend it</strong>
            </Typography>
          }
          {Score > 5 && Score < 8 &&
            <Typography variant="body2" component="h2" paragraph={true}>
              <strong>You may have fun.</strong>
            </Typography>
          }
          {Score >= 8 &&
            <Typography variant="body2" component="h2" paragraph={true}>
              <strong>Great, this is one of the best anime.</strong>
            </Typography>
          }
          <Link component="button" variant="body1" style={{marginBottom: 0}} onClick={onClickHandler}>
            Learn more
          </Link>
        </Paper>
      </Grid>
    </GridListTile>
  );
};

export default AnimeCard;