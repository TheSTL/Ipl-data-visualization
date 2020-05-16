import React from "react";
import "../../node_modules/react-vis/dist/style.css";
import MatchData from "../data/match.json";
import BallData from "../data/ball.json";
import MatchPlayedAt from "../components/MatchPlayedAt/MatchPlayedAt";
import MatchHisotry from "../components/MatchHisotry/MatchHistory";
import { getDataFromMatchJson, getDataFromBallJson } from "../utils";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchPerVenue: {},
      matchPerCity: {},
      matchPerCountry: {},
      matchExtraDetails: {},
      matchDetails: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const matchDataExtracted = getDataFromMatchJson(MatchData);
    const ballDataExtracted = getDataFromBallJson(BallData);
    console.log(matchDataExtracted);

    this.setState({
      ...matchDataExtracted,
      ...ballDataExtracted,
      isLoading: false,
    });
  }

  render() {
    const {
      matchPerVenue,
      matchPerCity,
      matchPerCountry,
      matchExtraDetails,
      matchDetails,
      isLoading,
    } = this.state;

    if (isLoading) return null;

    return (
      <div className="home-page">
        <MatchHisotry
          matchDetails={matchDetails}
          matchExtraDetails={matchExtraDetails}
        />
        <MatchPlayedAt
          matchPerVenue={matchPerVenue}
          matchPerCity={matchPerCity}
          matchPerCountry={matchPerCountry}
        />
      </div>
    );
  }
}

export default Home;
