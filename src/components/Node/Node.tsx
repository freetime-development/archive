import React, { PureComponent } from 'react'
import { Node as INode } from '../../interface'
import './node.css'

interface Props {
  data: INode
}

class Node extends PureComponent<Props> {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false
    }
  }

  render () {
    let { logo, embed, meta, text } = this.props.data
    embed = embed ? React.createElement(embed.type, embed.props) : null
    return (
      <div className="content-node">
        <div className="content-node-left">
          <p>
            source: {meta.origin}
            {logo &&
              <img src={logo} height="48px" width="48px" />
            }
          </p>
          <div className="description-container">
            <textarea autoFocus placeholder="description..." rows={4} cols={40}></textarea>
          </div>
          <button>Save</button>
        </div>
        <div className="content-node-right">
          {embed || text}
        </div>
      </div>
    )
  }
}

export default Node
