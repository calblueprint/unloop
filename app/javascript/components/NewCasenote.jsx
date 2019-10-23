import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {Editor, EditorState, RichUtils, KeyBindingUtil} from 'draft-js';
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE, ENTITY_TYPE } from "draftail";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";

const initial = JSON.parse(sessionStorage.getItem("draftail:content"))

const onSave = (content) => {
  console.log("saving", content)
  sessionStorage.setItem("draftail:content", JSON.stringify(content))
}

class NewCasenote extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({editorState});
    //this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  render () {
    return (
      <DraftailEditor
        rawContentState={initial || null}
        onSave={onSave}
        blockTypes={[
          { type: BLOCK_TYPE.HEADER_ONE },
          { type: BLOCK_TYPE.HEADER_TWO },
          { type: BLOCK_TYPE.HEADER_THREE },
          { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
          { type: BLOCK_TYPE.ORDERED_LIST_ITEM },
        ]}
        inlineStyles={[{ type: INLINE_STYLE.BOLD }, { type: INLINE_STYLE.ITALIC }, { type: INLINE_STYLE.UNDERLINE }]}
        entityTypes={[
          {
            type: ENTITY_TYPE.LINK,
            // [...]
          },
        ]}
      />
    );
  }
}

//ReactDOM.render(editor, document.querySelector("[data-mount]"));

export default NewCasenote;
