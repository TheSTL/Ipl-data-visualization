import React from "react";
import { Treemap } from "react-vis";
import { Tooltip, Select } from "@chakra-ui/core";
import { colorPalette1 } from "../../constants";

function _getFormatData(data) {
  if (!data) return;

  const leaves = [];
  Object.keys(data).forEach((key, index) => {
    leaves.push({
      name: data[key],
      tooltip: key,
      size: data[key] * 1000,
      style: {
        backgroundColor: colorPalette1[index % colorPalette1.length],
        color: "black",
        border: "thin solid #50514f",
      },
    });
  });
  return {
    title: "",
    children: leaves,
  };
}

class MatchPlayedAt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchPerVenue: props.matchPerVenue,
      matchPerCity: props.matchPerCity,
      matchPerCountry: props.matchPerCountry,
      treemapData: _getFormatData(props.matchPerVenue),
      hoveredNode: false,
      useCirclePacking: true,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.matchPerVenue !== nextProps.matchPerVenue ||
      prevState.matchPerCity !== nextProps.matchPerCity ||
      prevState.matchPerCountry !== nextProps.matchPerCountry
    ) {
      return {
        matchPerVenue: nextProps.matchPerVenue,
        matchPerCity: nextProps.matchPerCity,
        matchPerCountry: nextProps.matchPerCountry,
        treemapData: _getFormatData(nextProps.matchPerVenue),
      };
    }
  }

  onChangeOption = (e) => {
    const value = e.target.value;

    if (!value) return;
    this.setState((prevState) => ({
      treemapData: _getFormatData(prevState[value]),
    }));
  };

  render() {
    const { hoveredNode } = this.state;
    const { visWidth, visHeight } = this.props;
    const treeProps = {
      onLeafMouseOver: (x) => this.setState({ hoveredNode: x }),
      onLeafMouseOut: () => this.setState({ hoveredNode: false }),
      data: this.state.treemapData,
      height: visHeight,
      width: visWidth,
      padding: 4,
      mode: "circlePack",
      getLabel: (x) => x.name,
    };

    return (
      <div className="flex-col-center match-played-wrapper">
        <h2 className="tab-heading">
          Visualization for matches played at different venue, cities and
          countries. Please hover on circle to get name.
        </h2>
        <div className="match-played">
          <div className="select-option">
            <Select placeholder="Select option" onChange={this.onChangeOption}>
              <option selected value="matchPerVenue">
                Venue
              </option>
              <option value="matchPerCity">City</option>
              <option value="matchPerCountry">Country</option>
            </Select>
          </div>
          <div className="match-player-vis">
            <Treemap {...treeProps} />
            <div
              style={{
                display:
                  hoveredNode && hoveredNode.data.tooltip ? "block" : "none",
                position: "absolute",
                top: hoveredNode && hoveredNode.y + 10,
                left: hoveredNode && hoveredNode.x + 10,
              }}
            >
              <Tooltip>
                <span className="vis-tooltip">
                  {hoveredNode && hoveredNode.data.tooltip}
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchPlayedAt;
