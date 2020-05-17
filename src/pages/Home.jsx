import React from "react";
import "../../node_modules/react-vis/dist/style.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import MatchData from "../data/match.json";
import BallData from "../data/ball.json";
import MatchPlayedAt from "../components/MatchPlayedAt/MatchPlayedAt";
import MatchHisotry from "../components/MatchHisotry/MatchHistory";
import { getDataFromMatchJson, getDataFromBallJson } from "../utils";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      matchPerVenue: {},
      matchPerCity: {},
      matchPerCountry: {},
      matchExtraDetails: {},
      matchDetails: {},
      ...this.getNewSizeOfVis(window.innerWidth, window.innerHeight),
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateSize);

    const matchDataExtracted = getDataFromMatchJson(MatchData);
    const ballDataExtracted = getDataFromBallJson(BallData);

    this.setState({
      ...matchDataExtracted,
      ...ballDataExtracted,
      isLoading: false,
    });
  }
  componentWillMount() {
    window.removeEventListener("resize", this.updateSize);
  }

  updateSize = () => {
    this.setState({
      ...this.getNewSizeOfVis(window.innerWidth, window.innerHeight),
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
    };
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
      isLoading,
    } = this.state;

    if (isLoading) {
      return (
        <div className="loading-screen">
          <h1>Loading please wait... </h1>
        <img  src='/loading.gif' alt=""/>
        </div>
      )
    }

    return (
      <div className="home-page">
        <h1>IPL Visualization</h1>
        <Tabs isFitted variant="enclosed" style={{ width: "100%" }}>
          <TabList mb="1em">
            <Tab _selected={{ color: "white", bg: "blue.500" }}>Matches</Tab>
            <Tab _selected={{ color: "white", bg: "green.500" }}>
              Matches Played at different location
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <MatchHisotry
                matchDetails={matchDetails}
                matchExtraDetails={matchExtraDetails}
                visWidth={visWidth}
                visHeight={visHeight}
              />
            </TabPanel>
            <TabPanel>
              <MatchPlayedAt
                matchPerVenue={matchPerVenue}
                matchPerCity={matchPerCity}
                matchPerCountry={matchPerCountry}
                visWidth={visWidth}
                visHeight={visHeight}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  }
}

export default Home;
