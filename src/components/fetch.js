export const fetchTicketReleases = async (key, page, query) => {
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