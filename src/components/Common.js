import React from 'react';

import { format } from 'fecha';

import { format as formatAgo } from 'timeago.js';

export const host = `https://localhost/5000`

export const TimeAgo = ({date}) => <div className="time">{formatAgo(date)}</div>
export const Date = ({date}) => <div className="date">{format(date, 'dddd MMMM Do, YYYY hh:mm:ss')}</div>

export const DateAndTime = ({date}) => {
  const dt = new window.Date(date)
  return <><TimeAgo date={dt} /><Date date={dt} /></>
}

export const Pagination = ({setPage, page, latestData}) => <div className="pagination">
  <button 
    onClick={() => setPage(old => Math.max(old - 1, 1))} 
    disabled={page === 1}>
    Previous Page
  </button>
  <span>{ page }</span>
  <button 
    onClick={() => setPage(old => (!latestData || !latestData.next ? old : old + 1))} 
    disabled={!latestData || !latestData.next}>
    Next page
  </button>
</div>

export const Ticket = ({ ticket }) => <li>{ticket.id}</li>
export const Tickets = ({ tickets }) => <ul>{(tickets || []).map(ticket => <Ticket key={ticket.id} ticket={ticket} />)}</ul>

const DependencyId = ({id}) => <span>{id}</span>
const DependencyTag = ({tag}) => <span>{tag}</span>

const Status = ({status}) => status ? "✅" : "❌"

const DepUnit = ({unit}) => <span className="unit tests"><Status status={unit}/></span>
const DepE2E = ({e2e}) => <span className="e2e tests"><Status status={e2e}/></span>

export const Dependency = ({ dependency }) => {
  const { release, id, tag, e2e, unit } = dependency
  const name = release ? `${id} (${release.id})` : id
  return  <>
      <td className="dependencyId"><DependencyId id={name} /></td>
      <td className="center dependencyTag"><DependencyTag tag={tag} /></td>
      <td className="center"><DepUnit unit={unit} /></td>
      <td className="center"><DepE2E e2e={e2e} /></td>
    </>
}

export const Dependencies = ({ dependencies }) => <div className="changelog">
  <h3>Dependencies</h3>
  <table>
    <thead><th>name</th><th className="center">version</th><th className="center">unit</th><th className="center">e2e</th></thead>
    <tbody>
      {(dependencies || []).map(dependency => <tr ><Dependency  dependency={dependency} /></tr>)}
    </tbody>
</table>
</div>

export const ChangelogEntry = ({ entry }) => <li><span className="entry">{entry}</span></li>
export const Changelog = ({changelog}) => {
  return <div className="changelog">
      <h3>Changelog</h3>
      <ul>{(changelog || []).map(entry => <ChangelogEntry key={entry} entry={entry} />)}</ul>
    </div>
}

export const SearchBox = ({query, setQuery }) => <div className="box">
  <div className="container">
    <span className="icon"><i className="fa fa-search"></i></span>
    <input id="search" className="search" type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
  </div>
</div>  
