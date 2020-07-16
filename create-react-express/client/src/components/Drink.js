import React, { Component } from 'react';

class Shots extends Component{
    constructor(props){
        super(props);
        this.state = {
            drinks:[],
            isLoaded: false,
            index: 0
        };
    }

    componentDidMount(){
      fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
          .then(res=> res.json())
          .then(({ drinks }) => {
              this.setState({
                  isLoaded: true,
                  drinks: drinks,
                  index: Math.floor(Math.random() * drinks.length)  
              })

            console.log(drinks)
          });
    }

    render(){

        const {isLoaded, drinks, index} = this.state;
        if(!isLoaded){
            return <div>loading data...</div>;
        }

        else{           

            return(
                <div className="Data">

                    <div>

                        <div key={drinks[index].idDrink}>

                            <h5>
                                {drinks[index].strDrink}
                            </h5>

                            <p>
                                <img src={drinks[index].strDrinkThumb}/>
                            </p>

                            </div>

                    </div>

                </div>

            );
        }

    }

}

export default Shots;