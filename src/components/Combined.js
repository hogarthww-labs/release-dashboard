import React, { useState } from 'react';

import { Changelog, Dependencies } from "./Common"

const DependenciesForReleases = ({releases}) => {
  const requiredDependenciesMap = Object.keys(releases).reduce((acc, key) => {
    const release = releases[key]
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

const ChangelogsForReleases = ({releases}) => {
  const combinedChangelogs = Object.keys(releases).reduce((acc, key) => {
    const release = releases[key]
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

const SelectedReleaseNames = ({releases}) => {
  return Object.keys(releases).join(', ')
}

const DeployCombinedReleaseAsVersion = () => {
  const [version, setVersion] = useState("")
  return <div className="deployVersion">
    <input name="version" value={version} onChange={(e) => setVersion(e.target.value) } placeholder="version" />
    <button id="deploy" name="deploy">Deploy</button>
  </div>
}

const hasReleases = (releases) => Object.keys(releases || []).length > 0  

const NoCombinedReleases = () => <p>No releases selected</p>

const CombinedReleases = ({releases}) => <div className="combinedContainer">
  <h2>Combined Releases</h2>  
  <div className="cards">
    <div className="card">
      <SelectedReleaseNames releases={releases} />
    </div>
    <div className="card">
      <ChangelogsForReleases releases={releases} />
    </div>
    <div className="card">
      <DependenciesForReleases releases={releases} />
    </div>
  </div>
  <DeployCombinedReleaseAsVersion />
</div>

export const CombinedReleasesCard = ({releases}) => <div className="card">
  {hasReleases(releases) ? <CombinedReleases releases={releases} /> : <NoCombinedReleases /> }
</div>