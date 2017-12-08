import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import style from './css/Icon.css';

var Icon = function (_React$Component) {
  _inherits(Icon, _React$Component);

  function Icon(props) {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, (Icon.__proto__ || _Object$getPrototypeOf(Icon)).call(this, props));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var _icons;

      var icons = (_icons = {
        unknown: "#unknown",
        plusIcon: "#plus",
        checkIcon: "#check",
        dashIcon: "#dash",
        facebookIcon: "#facebook",
        fileBinaryIcon: "#file-binary",
        fileCodeIcon: "#file-code",
        fileDirectoryIcon: "#file-directory",
        fileMediaIcon: "#file-media",
        filePdfIcon: "#file-pdf",
        fileTextIcon: "#file-text",
        fileZipIcon: "#file-zip",
        fileIcon: "#file",
        googlePlusIcon: "#google-plus",
        muteIcon: "#mute",
        pencilIcon: "#pencil",
        searchIcon: "#search",
        threeBarIcon: "#three-bars",
        thumbsUpIcon: "#thumbsup",
        trashCanIcon: "#trashcan",
        triangleDownIcon: "#triangle-down",
        triangleLeftIcon: "#triangle-left",
        triangleRightIcon: "#triangle-right",
        triangleUpIcon: "#triangle-up",
        twitterIcon: "#twitter",
        unMuteIcon: "#unmute",
        xCloseIcon: "#x",
        attachIcon: "#attach",
        globeIcon: "#cpog",
        moreIcon: "#more1",
        ascendIcon: "#ascend",
        descendIcon: "#descend",
        chatIcon: "#chat51",
        chatOut: "#chatog-01",
        chatIn: "#chatrednew-01"
      }, _defineProperty(_icons, 'descendIcon', "#descend"), _defineProperty(_icons, 'editDraft', "#draft_edit"), _defineProperty(_icons, 'facebookIn', "#fbig-01"), _defineProperty(_icons, 'facebookOut', "#fbog-01"), _defineProperty(_icons, 'draft', "#Fdraft"), _defineProperty(_icons, 'twitterIn', "#twitic-01"), _defineProperty(_icons, 'twitterOut', "#twitog-01"), _defineProperty(_icons, 'mailForward', "#mailfor-01"), _defineProperty(_icons, 'mailIn', "#mailic"), _defineProperty(_icons, 'mailOut', "#mailog-01"), _defineProperty(_icons, 'mail', "#mail"), _defineProperty(_icons, 'surveyForward', "#surveyff"), _defineProperty(_icons, 'forumIn', "#forumic"), _defineProperty(_icons, 'forumOut', "#forumoc"), _defineProperty(_icons, 'telePhone', "#telephone98"), _defineProperty(_icons, 'telePhone2', "#telephone-thick"), _defineProperty(_icons, 'phone', "#phone"), _defineProperty(_icons, 'downloadIcon', "#inbox"), _defineProperty(_icons, 'threadComment', "#thread-comments"), _defineProperty(_icons, 'editarticle', "#editarticleicn"), _defineProperty(_icons, 'print', "#printing2"), _defineProperty(_icons, 'clear', "#clearicn"), _defineProperty(_icons, 'star', "#userpopup-star"), _defineProperty(_icons, 'facebook2', "#fb1"), _defineProperty(_icons, 'twitter2', "#twit"), _defineProperty(_icons, 'googlePlus2', "#g-plus"), _defineProperty(_icons, 'globeWeb', "#ch-web"), _defineProperty(_icons, 'moderateTick', "#moderate-tick"), _defineProperty(_icons, 'blockedUser', "#blocked-user"), _defineProperty(_icons, 'norecord', "#norecord"), _defineProperty(_icons, 'pagenotfound', "#pagenotfound"), _defineProperty(_icons, 'servicenotavailable', "#servicenotavailable"), _defineProperty(_icons, 'unautherized', "#unautherized"), _defineProperty(_icons, 'urlnotfound', "#urlnotfound"), _defineProperty(_icons, 'unabletoprocess', "#unabletoprocess"), _defineProperty(_icons, 'facebook3', "#facebook-icn"), _defineProperty(_icons, 'twitter3', "#twitter-icn"), _defineProperty(_icons, 'delete', "#delete2"), _defineProperty(_icons, 'alert', "#exclamation-thincircle"), _defineProperty(_icons, 'reply', "#reply"), _defineProperty(_icons, 'thankusms', "#thankusms"), _defineProperty(_icons, 'levelexpert', "#levelexpert"), _defineProperty(_icons, 'triangleDown', "#triangleDown"), _defineProperty(_icons, 'pdf', "#pdf"), _defineProperty(_icons, 'jpg', "#jpg"), _defineProperty(_icons, 'png', "#png"), _defineProperty(_icons, 'gif', "#gif"), _defineProperty(_icons, 'fla', "#fla"), _defineProperty(_icons, 'bmp', "#bmp"), _defineProperty(_icons, 'tif', "#tif"), _defineProperty(_icons, 'txt', "#txt"), _defineProperty(_icons, 'rar', "#rar"), _defineProperty(_icons, 'zip', "#zip"), _defineProperty(_icons, 'html', "#html"), _defineProperty(_icons, 'xml', "#xml"), _defineProperty(_icons, 'doc', "#NewDoc"), _defineProperty(_icons, 'xls', "#NewXls"), _defineProperty(_icons, 'xlsx', "#NewXls"), _defineProperty(_icons, 'svg', "#NewSvg"), _defineProperty(_icons, 'psd', "#NewPsd"), _defineProperty(_icons, 'mp4', "#NewMp4"), _defineProperty(_icons, 'mp3', "#NewMp3"), _defineProperty(_icons, 'ppt', "#NewPpt"), _defineProperty(_icons, 'json', "#NewJson"), _defineProperty(_icons, 'js', "#NewJs"), _defineProperty(_icons, 'dwg', "#NewDwg"), _defineProperty(_icons, 'exe', "#NewExe"), _defineProperty(_icons, 'avi', "#NewAvi"), _defineProperty(_icons, 'css', "#NewCss"), _defineProperty(_icons, 'ai', "#NewAi"), _defineProperty(_icons, 'commentNew', "#comment-new"), _defineProperty(_icons, 'replyNew', "#reply-new"), _defineProperty(_icons, 'location', "#location2"), _defineProperty(_icons, 'roundArrow', "#round-arrow"), _defineProperty(_icons, 'commonBadge1', "#common-badge-1"), _defineProperty(_icons, 'commonBadge2', "#common-badge-2"), _defineProperty(_icons, 'commonBadge3', "#common-badge-3"), _defineProperty(_icons, 'commonBadge4', "#common-badge-4"), _defineProperty(_icons, 'moreFilter', "#kbmorefilter"), _defineProperty(_icons, 'desk', "#desklogo"), _defineProperty(_icons, 'camera', "#profileCamera"), _defineProperty(_icons, 'zoomIn', "#zoomIn"), _defineProperty(_icons, 'zoomOut', "#zoomOut"), _defineProperty(_icons, 'newTab', "#newtab"), _defineProperty(_icons, 'pullMenu', "#pullMenu"), _defineProperty(_icons, 'pullDown', "#pullDown"), _defineProperty(_icons, 'arrowLeft', "#arrowLeft"), _defineProperty(_icons, 'arrowRight', "#arrowRight"), _defineProperty(_icons, 'minus', "#minus"), _defineProperty(_icons, 'briefcase', "#briefcase"), _icons);
      var _props = this.props,
          icon = _props.icon,
          _props$size = _props.size,
          size = _props$size === undefined ? "" : _props$size,
          iconColor = _props.iconColor,
          hoverColor = _props.hoverColor,
          _props$onClick = _props.onClick,
          onClick = _props$onClick === undefined ? null : _props$onClick;

      var hoverColorClass = hoverColor ? style[hoverColor] : "";
      iconColor = iconColor ? style[iconColor] : "";
      return React.createElement(
        'svg',
        { 'data-testid': 'icon', className: style.icon + " " + style[size] + " " + iconColor + " " + hoverColorClass, onClick: onClick },
        React.createElement('use', { xlinkHref: icons[icon] })
      );
    }
  }]);

  return Icon;
}(React.Component);

export default Icon;


Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
  iconColor: PropTypes.string
};