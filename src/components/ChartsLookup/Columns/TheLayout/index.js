import React, { Fragment } from 'react';

export default function TheLayout() {
  return (
    <Fragment>
      <p>
        Here, another column. This column, again, is 'scrollable'. This section,
        as well as the box on the left, are both identical in layout to the
        items above. Notice that the box that was sticking on the left has moved
        out of the viewport and has been 'replaced' by the 'new' sticky box to
        the left of this section.
      </p>
      <p>The Borders will be removed in the following sections.</p>
    </Fragment>
  );
}
