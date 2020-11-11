import React from 'react';

import { format } from 'fecha';
import timeAgo from 'javascript-time-ago'

export const host = `https://localhost/5000`

export const TimeAgo = ({date}) => <p>{timeAgo.format(Date.parse(date))}</p>
export const Date = ({date}) => <p>{format(new window.Date(date), 'dddd MMMM Do, YYYY hh:mm:ss')}</p>

export const Ticket = ({ ticket }) => <li>{ticket.id}</li>
export const Tickets = ({ tickets }) => <ul>{(tickets || []).map(ticket => <Ticket key={ticket.id} ticket={ticket} />)}</ul>

export const Dependency = ({ dependency }) => <li><span className="dependencyId">{dependency.id}</span><span className="dependencyTag">{dependency.tag}</span></li>
export const Dependencies = ({ dependencies }) => <ul>{(dependencies || []).map(dependency => <Dependency key={dependency.id} dependency={dependency} />)}</ul>

export const SearchBox = ({query, setQuery }) => <div className="box">
  <div className="container">
    <span className="icon"><i className="fa fa-search"></i></span>
    <input id="search" className="search" type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
  </div>
</div>  
