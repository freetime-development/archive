import React, { PureComponent } from 'react'
import { Node as INode } from '../../interface'
import './node.css'

interface Props {
  data: INode
  onSave(node: INode)
  onDiscard(nodeId: string)
}

class Node extends PureComponent<Props> {
  render () {
    let { embed, nodeData, favIconUrl } = this.props.data
    embed = embed ? React.createElement(embed.type, embed.props) : null
    return (
      <div className="content-node">
        <div className="content-node-left">
          {embed || nodeData.text}
        </div>
        <div className="content-node-right">
          <div className="title">
            <h3>{nodeData.title}</h3>
          </div>
          <div className="source">
            <img src={favIconUrl} />
            {nodeData.url}
          </div>
          <div className="description-container">
            <textarea autoFocus placeholder="Something you would like to add?" rows={4}></textarea>
          </div>
          <div className="btn-group">
            <button className="btn btn-save" onClick={() => this.props.onSave(this.props.data)}>Save</button>
            <button className="btn btn-discard" onClick={() => this.props.onDiscard(this.props.data.id)}>Discard</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Node
