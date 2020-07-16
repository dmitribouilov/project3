import React, { Component, useReducer } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

class Login extends Component {
  // Setting the component's initial state
  state = {
    playerName: "",
    email: "",
    password: "",
    redirect: "",
    me: "",
  };




  handleInputChange = (event) => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    if (name === "password") {
      value = value.substring(0, 15);
    }
    // Updating the input's state
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (event) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    if (!this.state.email) {
      alert("Fill out your email please!");
    } else if (this.state.password.length < 3) {
      alert(`Choose a more secure password ${this.state.email} `);
    } else {
      const user = {
        playerName: this.state.playerName,
        email: this.state.email,
        password: this.state.password,
      };
      // console.log(user);

      async function postData(url, data) {
        //console.log(data);

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return response.statusText;
      }

      postData("/api/login", user).then((data) => {
        if (data === "OK") {
         
          async function getUser(url, data) {
            // console.log(data);

            const response = await fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              
            });

            console.log("the response is", response.body)
            return response;
          }

          getUser("/api/getUser/"+user.email).then(res=> res.json()).then((res)=>{
            
          
            this.setState({ playerName: res[0].playerName, 
              redirect: "/list"})
              console.log(this.state.playerName)
            
          }).then(

            updateOnline("/api/loginupdate", user).then((data) => {
              console.log(data)    
          this.setState({ email: user.email
          });
          
        })      
          

          )
          

          async function updateOnline(url, data) {
            // console.log(data);

            const response = await fetch(url, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
            return response;
          }

        

          

          


        } else {
          alert("wrong id");
        }
      });
    }

    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { playerName: this.state.playerName,
                      email: this.state.email },
          }}
        />
      );
    }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />

       
      <div>
        
        <form className="form">
          <TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           label="Email"
           autoComplete="Email"
           autoFocus
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Email"
          />

          <TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           label="Password"
           autoComplete="Password"
           autoFocus
          
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
            type="password"
            placeholder="Password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>Submit</Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

      </Container>
    );
  }
}

export default Login;
