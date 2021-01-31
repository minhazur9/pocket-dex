import React from 'react';
import {Switch,Route} from 'react-router'
import Home from '../pages/Home'
import PokemonIndex from '../pages/PokemonIndex';
import MoveIndex from '../pages/MoveIndex';
import AbilityIndex from '../pages/AbilityIndex';
import ItemIndex from '../pages/ItemIndex';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';


const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/pokemon" component={PokemonIndex}/>
            <Route path="/moves" component={MoveIndex}/>
            <Route path="/abilities" component={AbilityIndex}/>
            <Route path="/items" component={ItemIndex}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/login" component={Login}/>
        </Switch>
    )
}

export default Routes;