import React from 'react';

import { Date, Dependencies, Tickets } from './Common';

export const VersionRelease = ({ release }) => {
  return (
    <div className="card">
      <h3>{ release.id }</h3>
      <Date date={release.date } />
      <Tickets tickets={release.tickets } />
      <Dependencies dependencies={release.dependencies } />      
    </div>
  );
}
