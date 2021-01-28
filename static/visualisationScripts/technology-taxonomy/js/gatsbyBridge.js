var rootPath;

function renderTechnologyTaxonomy(technologiesParam, prefixedPath, navigateToTechnologyDetailPage) {
  rootPath = prefixedPath;
  navFunc = navigateToTechnologyDetailPage
  onload()
}

function onClickToggle(id, groupId, state) {
  // Don't need to do anything on an individual toggle - wait for the submit
}

function onClickSubmit(groupId, toggledStates, orderedIds) {
  //TODO: Remove or comment out
  console.log('TAXON toggled states: ', toggledStates)
  console.log(`TAXON Order of submitted IDs: [ ${orderedIds} ]`)
  /*
  aleph.taxonomyArray = toggledStates
    .filter((toggle) => {
      return toggle.toggled
    })
    .map((toggle) => {
      return toggle.button
    })
  */
  aleph.taxonomyArray = [...orderedIds]
  console.log('TAXON taxonomy array: ', aleph.taxonomyArray)
  submitSelection()
}

function onClickClear(groupId) {
  aleph.taxonomyArray = []

  
  // remove current taxomnomy tree from display
  d3.selectAll(".aleph-taxonomyTree").remove();

  // initialsie relevant arrays
  aleph.taxonomyArray = [];
  aleph.nodeLevelsY = [];

 // submitSelection()
}
