import React, { useState, useEffect } from 'react';

import { usePaginatedQuery, useQueryCache } from 'react-query';

import { Changelog, Dependencies, Pagination, SearchBox } from './Common';
import { TicketRelease } from './TicketRelease';
import create from 'zustand'

const fetchTicketReleases = async (key, page, query) => {
  // const res = await fetch(`${host}/ticket-releases/?page=${page}`);
  const res = await fetch('data/tickets.json', {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  })
  const data = await res.json()  
  const filteredData = query ? data.filter(item => item.id.includes(query)) : data
  return filteredData;
}

const DependenciesForReleases = ({selectedReleases}) => {
  const requiredDependenciesMap = Object.keys(selectedReleases).reduce((acc, key) => {
    const release = selectedReleases[key]
    const dependencyMap = release.dependencies.reduce((acc, dep) => {
      dep.release = release
      acc[dep.id] = dep
      return acc
    }, {})
    const ids = release.dependencies.map(dep => dep.id)
    ids.map(id => {
      const dependency = dependencyMap[id]
      const { tag } = dependency
      const existingTag = acc[id] ? acc[id].tag : 0
      acc[id] = !acc[id] || tag > existingTag ? dependency : acc[id]
    })    
    return acc
  }, {})
  const requiredDependencies = Object.values(requiredDependenciesMap)
  return <Dependencies dependencies={requiredDependencies} />
}

const ChangelogsForReleases = ({selectedReleases}) => {
  const combinedChangelogs = Object.keys(selectedReleases).reduce((acc, key) => {
    const release = selectedReleases[key]
    const log = release.changelog.reduce((acc, entry) => {      
      entry = `${entry} (${release.id})`
      acc.push(entry)
      return acc
    }, [])
    return acc.concat(log)
  }, [])
  console.log({combinedChangelogs})
  return <Changelog changelog={combinedChangelogs} />  
}

const SelectedReleaseNames = ({selectedReleases}) => {
  return Object.keys(selectedReleases).join(', ')
}

const DeployCombinedReleaseAsVersion = ({selectedReleases}) => {
  const [version, setVersion] = useState("")
  return <div className="deployVersion">
    <input name="version" value={version} onChange={(e) => setVersion(e.target.value) } placeholder="version" />
    <button id="deploy" name="deploy">Deploy</button>
  </div>
}

const hasReleases = (releases) => Object.keys(releases).length > 0  

const NoCombinedReleases = () => <p>No releases selected</p>

const CombinedReleases = ({selectedReleases}) => <>
  <h2>Combined Releases</h2>
  <SelectedReleaseNames selectedReleases={selectedReleases} />
  <div className="releases">
    <div className="card changelog">
      <ChangelogsForReleases selectedReleases={selectedReleases} />
    </div>
    <div className="card">
      <DependenciesForReleases selectedReleases={selectedReleases} />
    </div>
  </div>
  <DeployCombinedReleaseAsVersion selectedReleases={selectedReleases}/>
</>

const CombinedReleasesCard = ({selectedReleases}) => <div className="card">
  {hasReleases(selectedReleases) ? <CombinedReleases selectedReleases={selectedReleases} /> : <NoCombinedReleases /> }
</div>

const ReleasesList = ({list, addRelease, removeRelease}) => <div>
  { list.map(release => <TicketRelease key={release.id} release={release} addRelease={addRelease} removeRelease={removeRelease} /> ) }
</div>

const useStore = create(set => ({
  releases: {},
  addRelease: (id, release) => set(state => {
    const newReleases = {
      ...state.releases,
      [id]: release
    }    
    return { 
      releases: newReleases
    }
  }),
  removeRelease: (id) => set(state => {
    const newReleases = {...state.releases }
    delete newReleases[id]
    return { 
      releases: newReleases,
    }
  }),
}))


const TicketReleases = ({query}) => {
  const [ page, setPage ] = useState(1);
  const addRelease = useStore(state => state.addRelease) 
  const removeRelease = useStore(state => state.removeRelease) 
  const selectedReleases = useStore(state => state.releases)

  const { 
    resolvedData, 
    latestData, 
    status 
  } = usePaginatedQuery(['TicketReleases', page, query], fetchTicketReleases);
  const queryCache = useQueryCache()

  useEffect(() => {
    queryCache.invalidateQueries('VersionedReleases')
    return () => {
      // console.log('refetch', { query })
    }
  }, [query, queryCache])


  return (
    <div>
      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
        <>          
          <CombinedReleasesCard selectedReleases={selectedReleases} />
          <div className="releases">
            <ReleasesList list={resolvedData} addRelease={addRelease} removeRelease={removeRelease} />
          </div>
          <Pagination setPage={setPage} page={page} latestData={latestData} />
        </>
      )} 
    </div>
  );
}
 
export default TicketReleases;