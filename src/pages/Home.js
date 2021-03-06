import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Slider, Slide } from 'react-materialize';
import front1 from  '../images/pokemon-artworks/front1.jpg';
import front2 from '../images/pokemon-artworks/front2.jpg';
import front3 from '../images/pokemon-artworks/front3.jpg';

const Home = () => {
  return (
    <div className="home">
      <Slider
        options={{
          duration: 500,
          height: 470,
          indicators: true,
          interval: 6000
        }}
      >
        <Slide image={<img alt="front1" src={front1}/>}></Slide>
        <Slide image={<img alt="front2" src={front2} />}></Slide>
        <Slide image={<img alt="front3" src={front3} />}></Slide>
      </Slider>
    </div>
  );
}

export default Home;
