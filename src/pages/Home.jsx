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
      ...(this.getNewSizeOfVis(window.innerWidth, window.innerHeight))
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateSize);

    const matchDataExtracted = getDataFromMatchJson(MatchData);
    const ballDataExtracted = getDataFromBallJson(BallData);
    console.log(matchDataExtracted);
    console.log(ballDataExtracted);

    this.setState({
      ...matchDataExtracted,
      ...ballDataExtracted,
    });
  }
  componentWillMount() {
    window.removeEventListener("resize", this.updateSize);
  }

  updateSize = () => { 
    this.setState({
      ...(this.getNewSizeOfVis(window.innerWidth, window.innerHeight))
    });
  };

  getNewSizeOfVis = (width, height) => {
    let visHeight = height;
    let visWidth = width;
    if (height >= 550) visHeight = 500;
    if (width >= 550) visWidth = 500;

    return {
      visWidth,
      visHeight,
    }
  };

  render() {
    const {
      matchPerVenue,
      matchPerCity,
      matchPerCountry,
      matchExtraDetails,
      matchDetails,
      visHeight,
      visWidth,
    } = this.state;

    return (
      <div className="home-page">
        <MatchHisotry
          matchDetails={matchDetails}
          matchExtraDetails={matchExtraDetails}
          visWidth={visWidth}
          visHeight={visHeight}
        />
        <MatchPlayedAt
          matchPerVenue={matchPerVenue}
          matchPerCity={matchPerCity}
          matchPerCountry={matchPerCountry}
          visWidth={visWidth}
          visHeight={visHeight}
        />
      </div>
    );
  }
}

export default Home;
