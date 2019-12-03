import React, { Component } from 'react';
import './NodePanel.css';

import NodeElement from './NodeElement';

class NodePanel extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const mainPanelId = "mainNodePanel";
    console.log(this);
    return (
      <div id={mainPanelId} className="nodePanel">
        <NodeElement mainPanelId={mainPanelId} />
        <NodeElement mainPanelId={mainPanelId} />
        <NodeElement mainPanelId={mainPanelId} />
        <NodeElement mainPanelId={mainPanelId} />
        <NodeElement mainPanelId={mainPanelId} />
      </div>
    );
  }
  
};

export default NodePanel;