import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Slider, Slide } from 'react-materialize';
import front1 from '../images/pokemon-artworks/front1.jpg';
import front2 from '../images/pokemon-artworks/front2.jpg';
import front3 from '../images/pokemon-artworks/front3.jpg';
import pokedexIcon from '../images/icons/pokedex-icon.png';
import lugiaIcon from '../images/icons/lugia-icon.png';

const Home = () => {

  // render info about the application
  const renderInfo = () => {
    return (
      <ul className="about">
        <li>
          <h4>The Dexes</h4>
          <p className="desc">
            Pokemon, Moves, Abilities, and Items! You can search and find information about all of them
          </p>
          <img src={pokedexIcon} className="pokedex-icon" alt="pokedex"/>
        </li>
        <li>
          <h4>Teams</h4>
          <p className="desc">
            Create your own teams, set up your pokemon's levels, their abilities, their IVs, EVs, and items!
          </p>
          <img src={lugiaIcon} className="lugia-icon" alt="pokemon"/>
        </li>
      </ul>
    )
  }

  // renders the slider for the pictures
  const renderSlider = () => {
    return (
      <>
        <Slider
          options={{
            duration: 500,
            height: 470,
            indicators: true,
            interval: 6000
          }}
        >
          <Slide image={<img alt="front1" src={front1} />}></Slide>
          <Slide image={<img alt="front2" src={front2} />}></Slide>
          <Slide image={<img alt="front3" src={front3} />}></Slide>
        </Slider>
      </>
    )
  }

  return (
    <div className="home">
      {renderSlider()}
      {renderInfo()}
    </div>
  );
}

export default Home;
