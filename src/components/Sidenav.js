import React from 'react';
import { CombinedReleasesCard } from './Combined';

import { SearchBox } from "./Common"
import { useStore } from './store';

export const Sidenav = ({query, setQuery }) => {
  const selectedReleases = useStore(state => state.releases)
  return <div className="sidebarContainer">
    <SearchBox query={query} setQuery={setQuery} />
    <CombinedReleasesCard releases={selectedReleases} />
  </div>
}
