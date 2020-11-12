import create from 'zustand'

export const useStore = create(set => ({
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