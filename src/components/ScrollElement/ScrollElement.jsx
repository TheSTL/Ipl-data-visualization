import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { Button, Icon } from "@chakra-ui/core";

class ScrollElement extends React.Component {
  scrollElement = null;

  componentDidMount() {
    this.scrollElement = document.querySelector(".scroll-container");
  }

  onClickForward = () => {
    if (this.scrollElement) {
      this.scrollElement.scrollLeft += 30;
    }
  };

  onClickBackward = () => {
    if (this.scrollElement) {
      this.scrollElement.scrollLeft -= 30;
    }
  };

  render() {
    const { children, scrollStyle, kClass } = this.props;
    return (
      <div style={scrollStyle} className="scroll-container-wrapper">
        <Button variantColor="teal" variant="outline" onClick={this.onClickBackward}>
          <Icon name="chevron-left" />
        </Button>
        <ScrollContainer
          hideScrollbars={true}
          className={`scroll-container ${kClass}`}
        >
          {children}
        </ScrollContainer>
        <Button variantColor="teal" variant="outline" onClick={this.onClickForward}>
          <Icon name="chevron-right" />
        </Button>
      </div>
    );
  }
}

export default ScrollElement;
