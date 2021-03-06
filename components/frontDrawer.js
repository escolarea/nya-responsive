import { React, useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { parseOnlyNumbers } from "../helpers/numbers";
import { parseOnlyLetters, removeHash } from "../helpers/strings";
import _ from "lodash";
import marked from "marked";
import cn from "classnames";
import { showPopUp } from "../store/notSupportedRoutes/action";

const FrontDrawer = ({ leftSideIcons, postIt, showPopUp }) => {

  const handleNotSupportedRoutes = () => showPopUp('download');

  const tryParseIcon = (suffix, data, out, prev, columnRow) => {
    const externalLinkPattern = /(http:\/\/|https:\/\/)/g
    const imageKey = "icon" + suffix;
    const linkKey = "link" + suffix;
    const videoKey = "video" + suffix;
    const prevIconKey = "iconSize" + prev;
    const prevImageKey = "icon" + prev;
    const iconSizeKey = "iconSize" + suffix;
    const performanceLogKey = "performanceLogLink" + suffix;
    const image = data[imageKey];
    const prevIconImage = data[prevImageKey];
    const videoId = data[videoKey];
    const iconSize = data[iconSizeKey];
    const prevIconSize = data[prevIconKey];
    let columnClass = "";
    let gridRow = { gridRow: `${suffix}` };

    if (!image) return;
    if (!_.has(image, "fields.file.url")) return;
    const url = image.fields.file.url;
    const link = videoId
      ? `/video?vimeoId=${videoId}`
      : data[performanceLogKey] || data[linkKey] || "";

    columnRow.push(`'${suffix}'`);

    if (iconSize !== "default" && iconSize !== undefined) {
        columnClass = iconSize;
      if (prevIconSize && prevIconSize == iconSize && prevIconImage) {
        columnClass = "small side-to-side";
        gridRow = { gridRow: `${prev}` };
        columnRow.pop();
      }
    }
    //cases with one small on one row
    if( (prevIconSize == undefined && iconSize == 'small' )|| (prevIconSize == 'small' && iconSize =='default')){
      columnClass = ""
    }
    let path = removeHash(link);
    const token = ""; //getOrastreamToken();
    const orastreamLink = process.env.ORASTREAMLINK + `?user_jwt=${token}`;

    if (
      path.includes("store.neilyoungarchives") ||
      path.includes("nya.orastream")
    ) {
      path = orastreamLink;
    }
    out.push(
      <div
        className={`row ${columnClass} icon-link`}
        key={imageKey}
        style={gridRow}
      >
        {externalLinkPattern.test(path) ? (
          <a href={path} className="icon-link">
            <img className="ui medium centered image" src={url} alt={suffix} />
          </a>
        ) : (
          <img
            className="ui medium centered image"
            src={url}
            alt={suffix}
            onClick={handleNotSupportedRoutes}
          />
        )}
      </div>
    );
  };
  const parseLeftSideIcons = (data, result, leftSideIconsColumns) => {
    const iconkeys = Object.keys(data);
    const keysLength = iconkeys.length;

    for (let i = 0; i <= keysLength; i++) {
      let icon = iconkeys[i];
      if (i >= 1 ||i <= keysLength)
        leftSideIconsColumns.prevIconIndex = parseOnlyNumbers(iconkeys[i - 1]);
      if (icon && parseOnlyLetters(icon) == "icon") {
        let iconArea = parseOnlyNumbers(icon);
        tryParseIcon(
          iconArea,
          data,
          result,
          leftSideIconsColumns.prevIconIndex,
          leftSideIconsColumns.columnRow,
        );
      }
    }
  };
  const parsePostIt = (icon, result) => {
    if (!icon) return null;

    let { url, display, content, style, videoId, id } = icon;

    const type = style.slice(0, -2);
    const typeValue = style.slice(-1);
    let background = `url('')`;

    if (!display || (style.indexOf("paper") !== -1 && display && id !== "top"))
      return null;
    if (type === "paper") {
      background = null;
    } else if (type === "postit") {
      // background = `url('${postits[parseInt(style.slice(-1)) - 1]}')`
    }
    if (!content) {
      return null;
    }
    content = marked(content);
    let cx = cn("post-it", id, type, typeValue);
    let contentCn = cn("content", type);
    const link = videoId ? `/video?vimeoId=${videoId}` : url;
    if (link) {
      let path = removeHash(link);
      result.push(
        <div style={{ backgroundImage: background }} className={cx} key={id}>
          <Link href={path}>
            <div
              className={contentCn}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Link>
        </div>
      );
    }
  };
  const getKeys = (item) => Object.keys(item);

  const getItems = (icons, type) => {
    const keys = getKeys(icons);
    const result = [];
    const leftSideIconsColumns = {
      columnRow: [],
      prevIconIndex: 0,
      columnCount: 0,
      leftSideIconStyle: {},
    };
    let top = "0rem";

    keys.forEach((_key, index) => {
      let icon = icons[_key] || false;

      if (type == "icon") {
        parseLeftSideIcons(icon, result, leftSideIconsColumns);
        top = "50rem";
      } else {
        parsePostIt(icon, result);
      }
    });

    leftSideIconsColumns.columnCount = leftSideIconsColumns.columnRow.length;
    leftSideIconsColumns.columnRow = `"${leftSideIconsColumns.columnRow.toString()}"`.replace(
      /[,"]/g,
      ""
    );
    let columnSizeStyle =
      leftSideIconsColumns.columnCount == 5
        ? "extendedColumn"
        : leftSideIconsColumns.columnCount == 6
        ? "extraColumn"
        : "defaultColumn";
    const leftSideIconStyle = {
      gridTemplateAreas: leftSideIconsColumns.columnRow,
      top,
    };

    if (result.length > 0) {
      return (
        <div
          className={`left-side-icons ${columnSizeStyle}`}
          style={leftSideIconStyle}
        >
          {result}
        </div>
      );
    } else {
      return <div />;
    }
  };
  return (
    <div id="leftside-icons-wrapper" className="ui stackable column grid">
      <div className="eight wide column">{getItems(postIt, "post")}</div>
      <div className="eight wide column link-icons">
        {getItems(leftSideIcons, "icon")}
      </div>
    </div>
  );
};

export default connect(null, {
  showPopUp,
})(FrontDrawer);
