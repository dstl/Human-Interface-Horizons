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
  
  // initialsie relevant arrays
  aleph.taxonomyArray = [];
  aleph.nodeLevelsY = [];

  aleph.taxonomyArray = [...orderedIds]
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
