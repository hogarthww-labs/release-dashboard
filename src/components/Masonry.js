import React from 'react';

import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
} from 'react-virtualized';

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight: 500,
  defaultWidth: 300,
  fixedWidth: true,
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 2,
  columnWidth: 320,
  spacer: 10,
});

export const MasonryComponent = ({releases}) => {
  function cellRenderer({index, key, parent}) {
    const { ReleaseItem, list, addRelease, removeRelease } = releases
    const release = list[index]

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <ReleaseItem key={release.id} release={release} addRelease={addRelease} removeRelease={removeRelease} />
      </CellMeasurer>
    );
  }

  const { list } = releases  

  return (
    <Masonry
      cellCount={list.length}
      cellMeasurerCache={cache}
      cellPositioner={cellPositioner}
      cellRenderer={cellRenderer}
      height={600}
      width={800}
    />
  );
};