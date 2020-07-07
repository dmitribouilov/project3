import React, {Component} from 'react';

class Shots extends Component{
    constructor(props){
        super(props);
        this.state = {
            drinks:[],
            isLoaded: false
        };
    }

    componentDidMount(){
      fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
          .then(res=> res.json())
          .then(({ drinks }) => {
              this.setState({
                  isLoaded: true,
                  drinks: drinks,
              })
          });
    }

    render(){

        const {isLoaded, drinks} = this.state;
        if(!isLoaded){
            return <div>loading data...</div>;
        }

        else{           

            return(
                <div className="Data">

                    <div>
                        {drinks.map(drink=>(
                            <div key={drink.idDrink}>

                                <p>
                                 name: {drink.strDrink} |
                                 </p>
                                
                                <p>
                                 id:{drink.idDrink} |
                                </p>

                                <p>
                                 <img src={drink.strDrinkThumb}/>
                                </p>

                            </div>

                        ))};
                    </div>

                </div>

            );
        }

    }

}

export default Shots;