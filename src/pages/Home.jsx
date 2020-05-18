import React from "react";
import "../../node_modules/react-vis/dist/style.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import MatchData from "../data/match.json";
import MatchPlayedAt from "../components/MatchPlayedAt/MatchPlayedAt";
import MatchHisotry from "../components/MatchHisotry/MatchHistory";
import { getDataFromMatchJson, getDataFromBallJson } from "../utils";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/core";

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
      percentageFileGotDownloaded: 0,
      ...this.getNewSizeOfVis(window.innerWidth, window.innerHeight),
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateSize);
    const matchDataExtracted = getDataFromMatchJson(MatchData);

    this.setState({
      ...matchDataExtracted,
      isLoading: false,
    });
  }

  componentWillMount() {
    window.removeEventListener("resize", this.updateSize);
  }

  importBallToBallData = () => {
    const { matchDetails } = this.state;
    if (!Object.keys(matchDetails).length) {
      this.setState({
        isLoading: true,
      });
      Array.from({ length: 20 }).forEach((_, index) => {
        import(`../data/ball${index + 1}.json`).then(
          ({ default: ballData }) => {
            const ballDataExtracted = getDataFromBallJson(ballData);
            if ((index + 1) % 5 === 0) {
              this.setState((prevState) => ({
                ...ballDataExtracted,
                percentageFileGotDownloaded: ((index + 1) * 100) / 20,
                isLoading: false,
              }));
            }
            return ballData;
          }
        );
      });
    }
  };

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

  renderLoadingScreen = () => {
    return (
      <div className="loading-screen">
        <h1>Loading please wait... </h1>
        <img src="/loading.gif" alt="" />
      </div>
    );
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
      percentageFileGotDownloaded,
    } = this.state;

    return (
      <div className="home-page">
        <h1 className="relative">
          IPL Visualization
          <CircularProgress
            className="circular-bar"
            value={percentageFileGotDownloaded}
            color="green"
          >
            <CircularProgressLabel>
              {percentageFileGotDownloaded}%
            </CircularProgressLabel>
          </CircularProgress>
        </h1>
        <Tabs isFitted variant="enclosed" style={{ width: "100%" }}>
          <TabList mb="1em">
            <Tab _selected={{ color: "white", bg: "green.500" }}>
              Matches Played at different location
            </Tab>
            <Tab
              onClick={this.importBallToBallData}
              _selected={{ color: "white", bg: "blue.500" }}
            >
              Matches
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <MatchPlayedAt
                matchPerVenue={matchPerVenue}
                matchPerCity={matchPerCity}
                matchPerCountry={matchPerCountry}
                visWidth={visWidth}
                visHeight={visHeight}
              />
            </TabPanel>
            <TabPanel>
              {isLoading ? (
                this.renderLoadingScreen()
              ) : (
                <MatchHisotry
                  matchDetails={matchDetails}
                  matchExtraDetails={matchExtraDetails}
                  visWidth={visWidth}
                  visHeight={visHeight}
                />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  }
}

export default Home;
