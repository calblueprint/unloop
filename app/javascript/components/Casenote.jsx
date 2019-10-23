import React from "react";
import ReactDOM from "react-dom"
import PropTypes from "prop-types";
import {Editor, EditorState, RichUtils, KeyBindingUtil} from 'draft-js';
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";


class Casenote extends React.Component {
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

  onBoldClick() {
    console.log('bold was clicked');
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  onItalicClick() {
    console.log('italic was clicked');
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  onUnderlineClick() {
    console.log('underline was clicked');
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  render () {
    return (
      <React.Fragment>
        <button onClick={this.onBoldClick.bind(this)}><b>B</b></button>
        <button onClick={this.onItalicClick.bind(this)}><em>I</em></button>
        <button onClick={this.onUnderlineClick.bind(this)}>U</button>
        <Editor editorState={this.state.editorState} 
        handleKeyCommand={this.handleKeyCommand}
        onChange={this.onChange} 
        />
      </React.Fragment>
    );
  }
}

// ReactDOM.render(
//   <Casenote />,
//   document.getElementById('container')
// );

export default Casenote
