import React, { Component } from 'react';
import './NodeElement.css';

class NodeElement extends Component {
  constructor(props){
    super(props);

    // We're setting the state right now.
    this.state = {
      mainPanelId: props.mainPanelId,
      top: 20,
      left: 20,
      mouseXStart: 0,
      mouseYStart: 0,
      mouseX: 0,
      mouseY: 0,
      draggable: false,
      currentWidth: 0,
      currentHeight: 0,
    };
  }

  startDrag = (e) => {
    // We start dragging the mouse in this function.
    // We save the mouse position as both the current and starting positions.
    e.preventDefault();
    console.log(e.target);
    this.setState({
      target: e.target,
      mouseXStart: e.clientX,
      mouseYStart: e.clientY,
      mouseX: e.clientX,
      mouseY: e.clientY,
    }, () => {
      // Once we've recorded the state, we'll add the drag and mouse up function references
      document.onmousemove = this.drag;
      document.onmouseup = this.stopDrag;
    });
  };

  drag = (e) => {
    // For dragging, we just record the current mouse position.
    // console.log(e.target);
    // console.log("currentHeight", e.target.offsetHeight);
    this.setState({
      mouseX: e.clientX,
      mouseY: e.clientY,
      currentWidth: this.state.target.offsetWidth,
      currentHeight: this.state.target.offsetHeight,
    });
  }

  stopDrag = (e) => {
    // We remove the onmousemove and onmouseup event functions so that we no longer
    // affect the elements.
    document.onmousemove = null;
    document.onmouseup = null;

    // Once we're done dragging, we record the new position. We also record the difference
    // between the current position and the start position to determine how many pixels the mouse
    // actually moved. We add that difference to the node's current position to calculate its 
    // new position.
    let newTop = this.state.top + (this.state.mouseY - this.state.mouseYStart);
    let newLeft = this.state.left + (this.state.mouseX - this.state.mouseXStart);

    // We need to calculate the heights of the parent panel and the node
    const nodePanel = document.getElementById(this.state.mainPanelId);
    const panelWidth = nodePanel.offsetWidth;
    const panelHeight = nodePanel.offsetHeight;

    const nodeWidth = this.state.target.offsetWidth;
    const nodeHeight = this.state.target.offsetHeight;

    console.log("newTop", newTop, "newLeft", newLeft);
    console.log("nodeHeight", nodeHeight, "nodeWidth", nodeWidth);
    console.log("panelHeight", panelHeight, "panelWidth", panelWidth);

    // We check that the node's new position doesn't exceed the panel's dimensions.
    // If it does, we snap the current position to the boundary.
    newTop = (newTop + nodeHeight) < panelHeight ? newTop: panelHeight - nodeHeight;
    newLeft = (newLeft + nodeWidth) < panelWidth ? newLeft: panelWidth - nodeWidth;

    console.log("newTop", newTop, "newLeft", newLeft);

    // We continue to check that the node doesn't exceed the panel's dimensions. In this case,
    // we're checking 0 position.
    newTop = newTop > 0 ? newTop: 0;
    newLeft = newLeft > 0 ? newLeft: 0;

    console.log("newTop", newTop, "newLeft", newLeft);

    this.setState({
      top: newTop,
      left: newLeft,
      mouseX: 0,
      mouseY: 0,
      mouseXStart: 0,
      mouseYStart: 0,
    });
  };

  calculateNewNodePosition = () => {

  };

  render(){

    const nodePanel = document.getElementById(this.state.mainPanelId);

    let top = this.state.top + (this.state.mouseY - this.state.mouseYStart);
    if (nodePanel){
      top = top > 0 ? top : 0;
      top = top + this.state.currentHeight < nodePanel.offsetHeight ? top : nodePanel.offsetHeight - this.state.currentHeight;
    }

    let left = this.state.left + (this.state.mouseX - this.state.mouseXStart);
    if (nodePanel){
      left = left > 0 ? left : 0;
      left = left + this.state.currentWidth < nodePanel.offsetWidth ? left : nodePanel.offsetWidth - this.state.currentWidth;
    }

    const nodePosition = {
      top: top,
      left: left,
    };
    
    return (
      <div onMouseDown={this.startDrag} style={nodePosition} className="nodeElement">
        A Node!
      </div>
    );
  }

};

export default NodeElement;