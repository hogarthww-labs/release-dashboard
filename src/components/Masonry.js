import React from 'react';

import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
} from 'react-virtualized';

// Array of images with captions
const list = [];

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 200,
  fixedWidth: true,
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: 200,
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