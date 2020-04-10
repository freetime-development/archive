import React, { PureComponent } from 'react'
import { Node as INode } from '../../interface'
import './node.css'

interface Props {
  data: INode
  onSave(node: INode)
  onDiscard(nodeId: string)
  onAnnotate(nodeId: string, data: string)
  onTopic(nodeId: string, data: string)
}

class Node extends PureComponent<Props> {
  render () {
    let { embed, nodeData, saved, error } = this.props.data
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
            <img src={nodeData.favIconUrl} />
            {nodeData.url}
          </div>
          <label className="topic">
            Topic:
            <input
              type="text"
              value={this.props.data.nodeData.topic}
              onChange={(e) => this.onTopic(e.target.value)}
            />
          </label>
          <div className="description-container">
            <textarea
              autoFocus
              placeholder="Something you would like to add?"
              rows={4}
              onChange={(e) => this.onAnnotate(e.target.value)}
              value={this.props.data.nodeData.annotation}
            ></textarea>
          </div>
          {!saved ?
            <div className="btn-group">
              <button className="btn btn-save" onClick={() => this.props.onSave(this.props.data)}>Save</button>
              <button className="btn btn-discard" onClick={() => this.props.onDiscard(this.props.data.id)}>Discard</button>
            </div>
            :
            <div className="node-saved">
              Successfully saved
            </div>
          }
          {error &&
            <div className="error">Error</div>
          }
        </div>
      </div>
    )
  }

  onAnnotate = (value: string) => {
    this.props.onAnnotate(this.props.data.id, value)
  }

  onTopic = (value: string) => {
    this.props.onTopic(this.props.data.id, value)
  }
}

export default Node
