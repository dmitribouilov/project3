import React, { Component, useReducer } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";

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
      <div>
        <p>Hello {this.state.playerName}</p>
        <form className="form">
          <input
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Email"
          />

          <input
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
            type="password"
            placeholder="Password"
          />
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
