import React, { Component } from 'react';
import PropTypes from 'prop-types';
import selectn from 'selectn';

import { encodeForHtml, editorContentValidate } from '../../utils/common';

export default class TextEditor extends Component {

	constructor(props){
		super(props);
		this.editorCallback = this.editorCallback.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		let  { id, value } = this.props;
		if(id && global.ZohoDeskEditor){
			ZohoDeskEditor.create && ZohoDeskEditor.create({
				id : id,
				content : value,
				callback : this.editorCallback,
				imageuploadcallback : this.handleUpload,
				contentChanged : this.handleChange
			});
		}
	}

	componentWillUnmount(np){
		global.editor = {}
	}

	// componentWillReceiveProps(np){
	// 	if(this.props.value !== np.value){
	// 		this.state.editorObj && this.state.editorObj.setContent(np.value);
	// 	}
	// }

	handleUpload( file, successCallback, failureCallback, target, description ){
		let { onUpload, getImgViewURL } = this.props;
		onUpload && onUpload(file).then(res=>{
			let payload ={};
			let attachmentId = res.data.result;
			// url : getImgViewURL ? getImgViewURL(attachmentId) : "",
			payload[0] ={
				url : "sdfsd",
				desc : description
			}
			successCallback(payload,target);
		},(error)=>{
			failureCallback(target);
		});
	}

	handleChange(){
		let { onChange,id } = this.props;
		let editorObj = editor[id] ? editor[id] : {}
		let content =  editorObj.getContent ? editorObj.getContent() : "";
		if(!editorContentValidate(editorObj)){
			content = "";
		}
		content = editorObj.mode == "plaintext" ? encodeForHtml(content) : content;
		onChange && onChange(content.trim(),id);
	}

	editorCallback(editorObj){
		let {id} = this.props;
		global.editor = global.editor || {};
		var css = 'blockquote {margin:0 0 0 4px; }',
    		head =editorObj.doc.head || editorObj.doc.getElementsByTagName('head')[0],
    		style = document.createElement('style');
			style.type = 'text/css';
			if (style.styleSheet){
			  style.styleSheet.cssText = css;
			} else {
			  style.appendChild(editorObj.doc.createTextNode(css));
			}

		head.appendChild(style);
		let moreOptElement = selectn("toolbarobject.moreoptions",editorObj) || {};
		let moreIconElement = "<svg class='icon size15' style='color: #8f8f8f;top:-6px;transform: rotate(90deg);'><use xlink:href='#more1'></use></svg>"
  		moreOptElement.innerHTML = moreIconElement;
		if(!editor[id]){
			editor[id] = editorObj;
		};
		// this.setState({editorObj})
	}

	render() {

		let { id,content } =  this.props;

		return  (<div className="editDraft"  >

	       			<div id={id} ></div>

	      </div>)
	}
}


TextEditor.propTypes={
	id:PropTypes.string,
	value:PropTypes.string,
	onUpload:PropTypes.func.isRequired,
	getImgViewURL:PropTypes.func,
	onChange:PropTypes.func.isRequired,
	content: PropTypes.string
}
