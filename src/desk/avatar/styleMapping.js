import pictureStyleMapping from '../picture/styleMapping';

export default {

  "default" : {
    picStyles : Object.assign({ groupStyle : "default"}, pictureStyleMapping[ "default" ] ),
    textStyle : "default",
    iconStyle : "default"
  },
  "thumbnail_box" : {
    picStyles : Object.assign({ groupStyle : "thumbnail_group"}, pictureStyleMapping[ "thumbnail_group" ] ),
    textStyle : "thumbnail_text",
    iconStyle : "thumbnail_icon"
  }


}


// "styleId" : [ "pictureStyleId",  "textStylesId" , "iconStyleId" ]
