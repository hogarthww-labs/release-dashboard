import React, { useState, useEffect } from 'react';

import { Changelog, Dependencies } from "./Common"

const dependenciesForReleases = (releases) => {
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
      dependency.architecture = 'all'
      const { tag } = dependency
      const existingTag = acc[id] ? acc[id].tag : 0
      acc[id] = !acc[id] || tag > existingTag ? dependency : acc[id]
    })    
    return acc
  }, {})
  return Object.values(requiredDependenciesMap)
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
  return <Changelog changelog={combinedChangelogs} />  
}

const SelectedReleaseNames = ({releases}) => {
  return Object.keys(releases).join(', ')
}

export const RaptlyDependencies = ({dependencies}) => {
  const [deploymentCommand, setDeploymentCommand] = useState("")
    
  useEffect(() => {
    const calcDependencies = () => dependencies.map(dep => `${dep.id}_${dep.tag}_${dep.architecture || 'all'}`).join(' | ')
    const calcCommand = () => calcDependencies()
    setDeploymentCommand(calcCommand())
  }, [dependencies])

  return <div className="deployCommand">{deploymentCommand}</div>
}

const DeployCombinedReleaseAsVersion = ({dependencies}) => {
  const [version, setVersion] = useState("")
  const [_, setDeployment] = useState(false)
    
  return <>
    <div className="deployVersion">
      <input name="version" value={version} onChange={(e) => setVersion(e.target.value) } placeholder="version" />
      <button id="deploy" name="deploy" onClick={() => setDeployment(version)}>Deploy</button>
    </div>
    <RaptlyDependencies dependencies={dependencies} />
  </>
}

const hasReleases = (releases) => Object.keys(releases || []).length > 0  

const NoCombinedReleases = () => <p>No releases selected</p>

const CombinedReleases = ({releases}) => {
  const dependencies = dependenciesForReleases(releases)
  return <div className="combinedContainer">
  <h2>Combined Releases</h2>  
  <div className="cards">
    <div className="card">
      <SelectedReleaseNames releases={releases} />
    </div>
    <div className="card">
      <ChangelogsForReleases releases={releases} />
    </div>
    <div className="card">
      <Dependencies dependencies={dependencies} />
    </div>
  </div>
  <DeployCombinedReleaseAsVersion dependencies={dependencies}/>
</div>
}

export const CombinedReleasesCard = ({releases}) => <div className="card">
  {hasReleases(releases) ? <CombinedReleases releases={releases} /> : <NoCombinedReleases /> }
</div>