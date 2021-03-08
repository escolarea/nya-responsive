import React from "react";
import Link from "next/link";
import { parseOnlyNumbers } from "../helpers/numbers";
import { parseOnlyLetters, removeHash } from "../helpers/strings";
import _ from "lodash";
import marked from "marked";
import cn from "classnames";
// import postit01 from '../images/filing-cabinet/postit_01.png'
// import postit02 from '../images/filing-cabinet/postit_02.png'
// import postit03 from '../images/filing-cabinet/postit_03.png'
// import postit04 from '../images/filing-cabinet/postit_04.png'
// import postit05 from '../images/filing-cabinet/postit_05.png'

const FrontDrawer = ({leftSideIcons, postIt}) => {
  const tryParseIcon = (suffix, data, out, prev, columnRow) => {
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
    const backgroundImage = `url(${url})`;
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
      <a href={path} key={suffix} className={columnClass} style={gridRow}>
        <div className="icon" style={{ backgroundImage }} />
      </a>
    );
  };
  const parseLeftSideIcons = (data, result, leftSideIconsColumns) => {
    const iconkeys = Object.keys(data);

    for (let i = 0; i <= iconkeys.length; i++) {
      let icon = iconkeys[i];
      if (i >= 1)
        leftSideIconsColumns.prevIconIndex = parseOnlyNumbers(iconkeys[i - 1]);
      if (icon && parseOnlyLetters(icon) == "icon") {
        let iconArea = parseOnlyNumbers(icon);
        tryParseIcon(
          iconArea,
          data,
          result,
          leftSideIconsColumns.prevIconIndex,
          leftSideIconsColumns.columnRow
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
        <div style={{ backgroundImage: background }} className={cx}>
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
    let top = '0rem'

    keys.forEach((_key, index) => {
      let icon = icons[_key] || false;

      if (type == "icon") {
        parseLeftSideIcons(icon, result, leftSideIconsColumns);
        top = '50rem'

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
      top
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
    <div className="front-wrapper">
      {getItems(postIt, "post")}
      {getItems(leftSideIcons, "icon")}
    </div>
  );
};

export default FrontDrawer;
