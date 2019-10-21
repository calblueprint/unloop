import React from "react"
import PropTypes from "prop-types"
import {Editor, EditorState, RichUtils} from 'draft-js';

class NewCasenote extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({editorState});
    //this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not handled';
  }

  _onBoldClick() {
    console.log('bold was clicked');
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  render () {
    return (
      <React.Fragment>
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <Editor editorState={this.state.editorState} 
        handleKeyCommand={this.handleKeyCommand}
        onChange={this.onChange} 
        />
      </React.Fragment>
    );
  }
}

// ReactDOM.render(
//   <NewCasenote />,
//   document.getElementById('container')
// );

export default NewCasenote
