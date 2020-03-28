import React from 'react'
import { connect } from 'react-redux'

import { RootState } from '../reducers/rootReducer'
import Node from './Node/Node'
import { saveNode, discardNode, annotateNode } from '../actions/nodeActions'

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

class App extends React.Component<Props> {
  render () {
    return (
      <>
        <button className="btn btn-close icon icon-cross" onClick={this.closeExtension}></button>
        <div className="nodes">
          {this.props.nodes.map((node) =>
            <Node
              key={node.id}
              data={node}
              onSave={this.props.saveNode}
              onDiscard={this.props.discardNode}
              onAnnotate={this.props.annotateNode}
            />
          )}
        </div>
      </>
    )
  }

  closeExtension = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { msg: 'close_extension' })
    })
  }
}

const mapStateToProps = (
  state: RootState
) => ({
  nodes: state.nodes
})

const mapDispatchToProps = {
  saveNode,
  discardNode,
  annotateNode
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
