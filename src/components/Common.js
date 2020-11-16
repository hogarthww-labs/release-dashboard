import React from 'react';

import { format } from 'fecha';

import { format as formatAgo } from 'timeago.js';

export const host = `https://localhost/5000`

export const TimeAgo = ({date}) => <div className="time">{formatAgo(date)}</div>
export const Date = ({date}) => <div className="date">{format(date, 'MMM Do, YYYY hh:mm:ss')}</div>

export const DateAndTime = ({date}) => {
  const dt = new window.Date(date)
  return <div className="date"><TimeAgo date={dt} /><Date date={dt} /></div>
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

export const Ticket = ({ ticket }) => <li>{ticket}</li>

const TicketsList = ({ tickets }) => <ul className="none tickets">{(tickets || []).map(ticket => {
  return <Ticket key={ticket} ticket={ticket} />
})}</ul>


const DisplayTickets = ({ tickets }) => <>
  <h3>Tickets</h3>
  <TicketsList tickets={tickets} />
</>

export const Tickets = ({ tickets }) => !tickets ? "" : <DisplayTickets tickets={tickets} />

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
    <thead><tr><th>name</th><th className="center">version</th><th className="center">unit</th><th className="center">e2e</th></tr></thead>
    <tbody>
      {(dependencies || []).map(dependency => <tr key={dependency.id}><Dependency dependency={dependency} /></tr>)}
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
