import React from 'react';
export default function FolioItem({
  title,
  subText,
  textContext,
  aLink,
  techList,
  imgClass,
}) {
  return (
    <div className="col-3-4 hover-v2">
      <div target="_blank" className={`box ${imgClass} `}>
        <div className="caption">
          <p>{title}</p>
          <hr />
          <p className="sub-text">
            {subText}
            <br />
            {textContext && (
              <sup>
                <i>{textContext}</i>
              </sup>
            )}
          </p>
          {aLink && <a href={aLink} target="_blank" className="open"></a>}
          <ul>
            {techList.map((itm, itmIdx) => (
              <li key={`tech-list-${title}-${itmIdx}`}>{itm}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
