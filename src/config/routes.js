import React from 'react';
import {Switch,Route} from 'react-router'
import Home from '../pages/Home'
import PokemonIndex from '../pages/PokemonIndex';


const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/pokemon" component={PokemonIndex}/>
        </Switch>
    )
}

export default Routes;