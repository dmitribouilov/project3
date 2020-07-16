import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';


class Home extends Component {
  render() {
    return (

      <Container component="main" maxWidth="xs">
        <CssBaseline />


        <div className="App">
          <Typography gutterBottom variant="h3" component="h2">
            War - The Ultimate Card Game
     </Typography>



          {/* Link to List.js */}
          <Grid container>
            <Grid item xs>
              <Link to={'./login'}>
                <Button variant="contained" color="primary">
                  login
        </Button>
              </Link>
            </Grid>
            <Grid item xs>
              <Link to={'./signup'}>
                <Button variant="contained" color="primary">
                  sign up
        </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}
export default Home;