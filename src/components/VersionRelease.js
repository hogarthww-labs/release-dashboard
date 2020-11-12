import React from 'react';

import { Changelog, DateAndTime, Dependencies, Tickets } from './Common';

export const VersionRelease = ({ release }) => {
  const { id, date, tickets, dependencies, changelog } = release
  return (
    <div className="card">
      <h2>{ id }</h2>
      <DateAndTime date={date } />
      <Tickets tickets={tickets } />
      <Dependencies dependencies={dependencies } />      
      <Changelog changelog={changelog } />      
    </div>
  );
}
