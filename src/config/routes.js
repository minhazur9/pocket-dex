import React from 'react';
import {Switch,Route} from 'react-router'
import Home from '../pages/Home'
import PokemonIndex from '../pages/PokemonIndex';
import MoveIndex from '../pages/MoveIndex';
import AbilityIndex from '../pages/AbilityIndex';


const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/pokemon" component={PokemonIndex}/>
            <Route path="/moves" component={MoveIndex}/>
            <Route path="/abilities" component={AbilityIndex}/>
        </Switch>
    )
}

export default Routes;