import React from "react";
import { Select, Button } from "@chakra-ui/core";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  MarkSeries,
  VerticalBarSeries,
} from "react-vis";
import { STRINGS, Inning1Color, Inning2Color } from "../../constants";
import ScrollElement from "../ScrollElement/ScrollElement";

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchDetails: props.matchDetails,
      matchExtraDetails: props.matchExtraDetails,
      matchIds: props.matchDetails ? Object.keys(props.matchDetails) : [],
      selectedMatchId: 0,
      selectedHistoryType: STRINGS.MATCH_HISTORY,
      dataToShowInningScore1: [],
      dataToShowInningScore2: [],
      dataToShowInningWicket1: [],
      dataToShowInningWicket2: [],
      dataToShowOverHistory1: [],
      dataToShowOverHistory2: [],
      currentShowInningOver: [],
      currentShowInningWicket: [],
      currentColor: Inning1Color,
      currentInning: 1,
    };
    this.scrollElement = React.createRef();
  }

  componentDidMount() {
    const { matchIds, matchDetails } = this.state;
    this.showMatchHistory(matchIds[0], matchDetails);
    this.setState({
      selectedMatchId: matchIds[0],
    });
  }

  componentDidUpdate(prevProps) {
    const { selectedMatchId } = this.state;
    if (
      this.props.matchDetails !== prevProps.matchDetails ||
      this.props.matchExtraDetails !== prevProps.matchExtraDetails
    ) {
      const matchIds = Object.keys(this.props.matchDetails);
      const defaultSelectedMatchId = matchIds[0];
      this.setState({
        matchDetails: this.props.matchDetails,
        matchExtraDetails: this.props.matchExtraDetails,
        matchIds,
      });
      this.showMatchHistory(defaultSelectedMatchId, this.props.matchDetails);
    }
  }

  showMatchHistory = (matchId, matchDetails) => {
    const matchDetail = matchDetails[matchId];

    if (!matchDetail) return;
    const firstInning = matchDetail[1];
    const secondInning = matchDetail[2];
    const firstInningShowData = firstInning.matchHistory;
    const secondInningShowData = secondInning.matchHistory;
    const dataToShowInningScore1 = [];
    const dataToShowInningScore2 = [];
    const dataToShowInningWicket1 = [];
    const dataToShowInningWicket2 = [];

    firstInningShowData.forEach((data) => {
      dataToShowInningScore1.push({ x: data.over, y: data.score });

      if (data.overWicket) {
        Array.from({ length: data.overWicket }).forEach((_, index) => {
          // to show wickets circles on one another (to avoid wickets circle overide on graph).
          dataToShowInningWicket1.push({
            x: data.over,
            y: data.score + index * 5,
          });
        });
      }
    });

    secondInningShowData.forEach((data) => {
      dataToShowInningScore2.push({ x: data.over, y: data.score });

      if (data.overWicket) {
        Array.from({ length: data.overWicket }).forEach((_, index) => {
          // to show wickets circles on one another (to avoid wickets circle overide on graph).
          dataToShowInningWicket2.push({
            x: data.over,
            y: data.score + index * 5,
          });
        });
      }
    });

    this.setState({
      dataToShowInningScore1,
      dataToShowInningScore2,
      dataToShowInningWicket1,
      dataToShowInningWicket2,
    });
  };

  showOverHistory = (matchId, matchDetails) => {
    const matchDetail = matchDetails[matchId];

    if (!matchDetail) return;
    const firstInning = matchDetail[1];
    const secondInning = matchDetail[2];
    const firstInningShowData = firstInning.matchHistory;
    const secondInningShowData = secondInning.matchHistory;
    const dataToShowOverHistory1 = [];
    const dataToShowOverHistory2 = [];
    const dataToShowInningWicket1 = [];
    const dataToShowInningWicket2 = [];

    firstInningShowData.forEach((data) => {
      dataToShowOverHistory1.push({ x: data.over, y: data.overScore });

      if (data.overWicket) {
        Array.from({ length: data.overWicket }).forEach((_, index) => {
          // to show wickets circles on one another (to avoid wickets circle overide on graph).
          dataToShowInningWicket1.push({
            x: data.over,
            y: data.overScore,
            size: 10,
          });
        });
      }
    });

    secondInningShowData.forEach((data) => {
      dataToShowOverHistory2.push({ x: data.over, y: data.overScore });

      if (data.overWicket) {
        Array.from({ length: data.overWicket }).forEach((_, index) => {
          // to show wickets circles on one another (to avoid wickets circle overide on graph).
          dataToShowInningWicket2.push({
            x: data.over + index * 0.001,
            y: data.overScore + index * 0.5,
            size: 10,
          });
        });
      }
    });

    this.setState({
      dataToShowOverHistory1,
      dataToShowOverHistory2,
      dataToShowInningWicket1,
      dataToShowInningWicket2,
      currentShowInningOver: dataToShowOverHistory1,
      currentShowInningWicket: dataToShowInningWicket1,
      currentColor: Inning1Color,
    });
  };

  renderMatchHistory = () => {
    const {
      dataToShowInningScore1,
      dataToShowInningScore2,
      dataToShowInningWicket1,
      dataToShowInningWicket2,
    } = this.state;
    const { visWidth, visHeight } = this.props;

    return (
      <div className="match-history-graph">
        <XYPlot width={visWidth} height={visHeight}>
          <HorizontalGridLines style={{ stroke: "#B7E9ED" }} />
          <VerticalGridLines style={{ stroke: "#B7E9ED" }} />
          <XAxis
            title="Over"
            style={{
              line: { stroke: "#ADDDE1" },
              ticks: { stroke: "#ADDDE1" },
              text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 },
            }}
          />
          <YAxis title="Total Score" />
          <LineSeries
            color={Inning1Color}
            data={dataToShowInningScore1}
            style={{
              strokeLinejoin: "round",
              strokeWidth: 4,
            }}
          />
          <LineSeries
            color={Inning2Color}
            data={dataToShowInningScore2}
            style={{
              strokeLinejoin: "round",
              strokeWidth: 4,
            }}
          />
          <MarkSeries
            strokeWidth={2}
            opacity="0.8"
            color="red"
            data={dataToShowInningWicket1}
          />
          <MarkSeries
            strokeWidth={2}
            color="red"
            opacity="0.8"
            data={dataToShowInningWicket2}
          />
        </XYPlot>
      </div>
    );
  };

  renderOverHistory = () => {
    const {
      currentShowInningWicket,
      currentShowInningOver,
      currentColor,
    } = this.state;
    const { visWidth, visHeight } = this.props;

    return (
      <div className="over-history">
        <Button
          width="150px"
          variantColor="green"
          variant="outline"
          onClick={this.onToggleInningInOverHistory}
        >
          Change Inning
        </Button>
        <XYPlot width={visWidth} height={visHeight} stackBy="y">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="Over" />
          <YAxis title="Run in single over" />
          <VerticalBarSeries
            color={currentColor}
            data={currentShowInningOver}
          />
          <MarkSeries
            strokeWidth={2}
            opacity="0.8"
            color="red"
            data={currentShowInningWicket}
          />
        </XYPlot>
      </div>
    );
  };

  renderBallToBallHistory = () => {
    const { matchDetails, selectedMatchId, currentInning } = this.state;
    const matchData = matchDetails[selectedMatchId];
    const { visWidth } = this.props;
    const overEnded = [];

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontFamily: "monospace", fontSize: "20px" }}>
            {" "}
            Team {currentInning}{" "}
          </span>
          <Button
            size="xs"
            variantColor="green"
            variant="outline"
            onClick={this.onChangeCurrentInning}
          >
            Change team
          </Button>
        </div>
        <ScrollElement
          scrollStyle={{ width: visWidth }}
          kClass="scroll-container ball-history"
        >
          {matchData &&
            matchData[currentInning].ballHistory.map((ball, index) => {
              let className = "ball-box";
              let content = "";
              if (ball.run) {
                className += " run";
                content = String(ball.run);
                if (ball.run === 4 || ball.run === 6) {
                  className += ` ${ball.run === 4 ? "four" : "six"}`;
                }
              }
              if (ball.wicket) {
                className += " wicket";
                content += " W";
              }
              if (!ball.wicket && !ball.run) {
                className += " dot";
                content = ".";
              }

              if (overEnded.indexOf(ball.over) === -1) {
                overEnded.push(ball.over);
                return (
                  <React.Fragment>
                    <li className="ball-box over">Over {ball.over}</li>
                    <li className={className}>
                      <span>{content}</span>
                    </li>
                  </React.Fragment>
                );
              }

              return (
                <li className={className}>
                  <span>{content}</span>
                </li>
              );
            })}
        </ScrollElement>
      </div>
    );
  };

  onChangeCurrentInning = () => {
    this.setState((prevState) => ({
      currentInning: prevState.currentInning === 1 ? 2 : 1,
    }));
  };

  onToggleInningInOverHistory = () => {
    const {
      currentShowInningOver,
      dataToShowOverHistory1,
      dataToShowOverHistory2,
      dataToShowInningWicket1,
      dataToShowInningWicket2,
    } = this.state;
    if (currentShowInningOver === dataToShowOverHistory1) {
      this.setState({
        currentShowInningOver: dataToShowOverHistory2,
        currentShowInningWicket: dataToShowInningWicket2,
        currentColor: Inning2Color,
      });
    } else {
      this.setState({
        currentShowInningOver: dataToShowOverHistory1,
        currentShowInningWicket: dataToShowInningWicket1,
        currentColor: Inning1Color,
      });
    }
  };

  onChangeMatch = (e) => {
    const { matchDetails } = this.state;
    const matchId = e.target.value;
    this.showMatchHistory(matchId, matchDetails);

    this.setState({
      selectedMatchId: matchId,
    });
  };

  onChangeHistoryType = (e) => {
    const { matchDetails, selectedMatchId } = this.state;
    const selectedHistoryType = e.target.value;
    if (selectedHistoryType === STRINGS.MATCH_HISTORY) {
      this.showMatchHistory(selectedMatchId, matchDetails);
    } else if (selectedHistoryType === STRINGS.OVER_HISOTRY) {
      this.showOverHistory(selectedMatchId, matchDetails);
    }

    this.setState({
      selectedHistoryType,
    });
  };

  onChangeSeason = (e) => {
    const { matchDetails, matchExtraDetails } = this.state;
    const value = e.target.value;
    let newMatchIds = [];
    if (value === "all") {
      newMatchIds = Object.keys(matchDetails);
    } else {
      newMatchIds = Object.keys(matchDetails).filter(
        (id) => matchExtraDetails[id].season === Number(value)
      );
    }
    this.showMatchHistory(newMatchIds[0], matchDetails);
    this.setState({
      matchIds: newMatchIds,
      selectedMatchId: newMatchIds[0],
    });
  };

  render() {
    const {
      matchIds,
      matchDetails,
      selectedMatchId,
      selectedHistoryType,
      matchExtraDetails,
    } = this.state;
    const matchDetail = matchExtraDetails[selectedMatchId];
    const matchData = matchDetails[selectedMatchId];
    let teamWonMatch = 0;
    let renderGaph = null;

    if (matchData && matchData[1].totalScore > matchData[2].totalScore) {
      teamWonMatch = 1;
    } else if (matchData && matchData[1].totalScore < matchData[2].totalScore) {
      teamWonMatch = 2;
    }

    switch (selectedHistoryType) {
      case STRINGS.MATCH_HISTORY:
        renderGaph = this.renderMatchHistory();
        break;
      case STRINGS.OVER_HISOTRY:
        renderGaph = this.renderOverHistory();
        break;
      default:
        renderGaph = this.renderMatchHistory();
    }

    return (
      <div className="flex-col-center match-history-wrapper">
        <h2 className="tab-heading">
          Visualization for match details played in all 9 season. You can
          visualize ball to ball details, over details and match run / wicket
          history.
        </h2>
        <div className="match-history">
          <div className="select-option">
            <Select
              placeholder="Select history type"
              value={selectedHistoryType}
              onChange={this.onChangeHistoryType}
            >
              <option value={STRINGS.MATCH_HISTORY}>Match History</option>
              <option value={STRINGS.OVER_HISOTRY}>Over History</option>
            </Select>
            <Select
              placeholder="Select match"
              value={selectedMatchId}
              onChange={this.onChangeMatch}
            >
              {matchIds.map((id) => (
                <option key={id} value={id}>
                  {matchExtraDetails[id].matchDate}
                </option>
              ))}
            </Select>
            <Select placeholder="Select season" onChange={this.onChangeSeason}>
              <option value="all">All season</option>
              {Array.from({ length: 9 }).map((_, index) => (
                <option value={index + 1}>{`Season ${index + 1}`}</option>
              ))}
            </Select>
          </div>
          {this.renderBallToBallHistory()}
          {matchDetail && teamWonMatch ? (
            <React.Fragment>
              <div className="score-history">
                {Object.keys(matchData).map((id) => (
                  <div
                    className={`team-end-result ${
                      Number(id) === teamWonMatch && "team-won"
                    }`}
                  >
                    <h4>{`Team ${id}`}</h4>
                    <div className="team-score">{`${matchData[id].totalScore}/${matchData[id].totalWicketFallen}`}</div>
                  </div>
                ))}
              </div>
              <span className="info">
                {`won by : 
              ${matchDetail.wonBy} ${
                  matchDetail.winType === "by runs" ? "runs" : "wickets"
                }`}
              </span>
            </React.Fragment>
          ) : (
            <span className="info">Match tied</span>
          )}
          <div style={{ width: "100%", marginBottom: "8px" }}>
            <span style={{ marginRight: "8px" }}>
              Team1 :
              <span
                className="team-color-div "
                style={{ background: Inning1Color }}
              ></span>
            </span>
            <span style={{ marginRight: "8px" }}>
              Team2 :
              <span
                className="team-color-div "
                style={{ background: Inning2Color }}
              ></span>
            </span>
            <span>
              Wicket :
              <span
                className="team-color-div"
                style={{ background: "red", borderRadius: "100%" }}
              ></span>
            </span>
          </div>
          {renderGaph}
        </div>
      </div>
    );
  }
}

export default Example;
