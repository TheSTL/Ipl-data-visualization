import React from 'react';
import '../../node_modules/react-vis/dist/style.css';
import MatchData from '../data/match.json';
import MatchPlayed from '../components/MatchPlayed/MatchPlayed';
import { getDataFromMatchJson } from '../utils';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            matchPerVenue: {},
            matchPerCity: {},
            matchPerCountry: {},
        }
    }

    componentDidMount() {
       const result = getDataFromMatchJson(MatchData);
       console.log(result);
       this.setState({
           ...result
       });
       
    }

    render() {
        const { matchPerVenue, matchPerCity, matchPerCountry } = this.state;
        
        return(
            <div className="home-page">
                <MatchPlayed 
                  matchPerVenue={matchPerVenue}
                  matchPerCity={matchPerCity}
                  matchPerCountry={matchPerCountry}
                />
            </div>
        );
    }
}

export default Home;