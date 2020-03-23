import React from 'react'
import { connect } from 'react-redux'

import { RootState } from '../reducers/rootReducer'
import { initPopup } from '../actions/actions'

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

class App extends React.Component<Props> {
  componentDidMount () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = new URL(tabs[0].url)
      this.props.initPopup(url)
    })
  }

  render () {
    const embed = this.props.embed ? React.createElement(this.props.embed.type, this.props.embed.props) : null
    return (
      <>
        {embed}
        <div className="description-container">
          <textarea autoFocus placeholder="description..." rows={4} cols={40}></textarea>
        </div>
      </>
    )
  }
}

const mapStateToProps = (
  state: RootState
) => ({
  embed: state.embed
})

const mapDispatchToProps = {
  initPopup
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
