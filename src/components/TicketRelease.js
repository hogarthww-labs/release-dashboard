import React, { useState, useEffect } from 'react';

import { Changelog, DateAndTime, Dependencies, Tickets } from './Common';

const SelectRelease = ({id, selected, setSelected}) => <input name={id} className="selectRelease" selected={selected} type="checkbox" onClick={e => setSelected(e.target.checked)} />

export const TicketRelease = ({ release, addRelease, removeRelease }) => {
  const [selected, setSelected] = useState("")
  const { id, date, tickets, dependencies, changelog } = release
  useEffect(() => {
    console.log({selected})
    selected ? addRelease(id, release) : removeRelease(id)
  }, [id, release, selected, addRelease, removeRelease])

  return (
    <div className="card">
      <h2>{ id }<SelectRelease id={id} selected={selected} setSelected={setSelected} /></h2>      
      <DateAndTime date={date } />
      <Tickets tickets={tickets } />
      <Dependencies dependencies={dependencies } />      
      <Changelog changelog={changelog } />      
    </div>
  );
}
