import React, { useState, useEffect } from 'react';
import { RaptlyDependencies } from './Combined';

import { Changelog, DateAndTime, Dependencies, SelectRelease, Tickets } from './Common';

export const VersionRelease = ({ release, addRelease, removeRelease }) => {
  const [selected, setSelected] = useState("")
  const { id, date, tickets, dependencies, changelog } = release
  useEffect(() => {
    selected ? addRelease(id, release) : removeRelease(id)
  }, [id, release, selected, addRelease, removeRelease])

  return (
    <div className="card">
      <h2>{ id }<SelectRelease id={id} selected={selected} setSelected={setSelected} /></h2>      
      <DateAndTime date={date } />
      <Tickets tickets={tickets } />
      <Dependencies dependencies={dependencies } />      
      <Changelog changelog={changelog } />
      <RaptlyDependencies dependencies={dependencies} />          
    </div>
  );
}
