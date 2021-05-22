import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchContext } from '../context/search';
import { FormControl, Input, IconButton, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import './Home.css'

const Home = () => {
  const history = useHistory();
  const search = useContext(SearchContext)
  const [input, setInput] = useState('')

  const handleSearch = (event) => {
    event.preventDefault();
    search.search(input).then((data) => {
      search.setData(data.results);
      localStorage.setItem('myData', JSON.stringify(data.results));
      history.push('/results');
   });
  };

  return (
  <Grid
    container direction="colum"
    justify="center"
    alignContent="center"
    alignItems="center">
    <Grid item>
      <Grid item>
        <img
          alt="logo" 
          src={ `${process.env.PUBLIC_URL}/logo.png` }
          height={420}
          width={500}
        />
      </Grid>
      <Grid item>
        <form className="home__form">
          <FormControl type="submit" className="home__formControl">
            <Input 
              placeholder="Search your favorite Anime" 
              value={ input } 
              onChange={(event) => setInput(event.target.value)}
              className="home__input"/>
            <IconButton 
              className="home__iconButton"
              variant="contained" 
              color="primary" 
              type="submit" 
              disables={!input} 
              onClick={handleSearch}>
              <SearchIcon>

              </SearchIcon>
            </IconButton>
          </FormControl>
        </form>
      </Grid>           
    </Grid>
  </Grid>
  );
};

export default Home;