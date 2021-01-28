var rootPath
var displayLabelsValue = false

function onClickToggle(id, groupId, state) {
  console.log('onClickToggle  id=' + id + ' groupId=' + groupId + ' state=' + state)
  if (id === 'chart-sort-alphabetical') {
    changeSortOrder({ id: 'eventType' })
  }
  if (id === 'chart-sort-impact') {
    changeSortOrder({ id: 'Impact' })
  }
  if (id === 'chart-sort-likelihood') {
    changeSortOrder({ id: 'Likelihood' })
  }
  if (id === 'relational-option-show-labels') {
    displayLabelsValue = state
    displayLabels(displayLabelsValue)
  }
  if (id === 'relational-option-show-linklines') {
    removeLinklines(state)
  }
}

function renderTechnologyComparison(params, prefixedPath, navigateToTechnologyDetailPage) {
  rootPath = prefixedPath
  navFunc = navigateToTechnologyDetailPage

  loadData().then((data) => {
    onload()

    aleph.technologySelectionArray = []
    aleph.selectedTechnologies = {}
    aleph.technologyCounter = 0

    for (var id of params.technologies.split(',')) {
      aleph.technologySelectionArray.push(id)

      // push technology/panel information from master JSON object data store to JSON obj of for selceted technologies
      aleph.selectedTechnologies[id] = aleph.techComparisonMasterObject[id]
      aleph.selectedTechnologies[id].counter = aleph.technologyCounter

      // initialise keys relating to time range start/end for selected technology.
      // One set for the time interval currently selected on the tech's own brush on context chart
      aleph.selectedTechnologies[id].currentInterval = {
        start: null,
        end: null,
      }
      // One set for the time interval defined by the earliest and latest date for an individual event on tech timeline.
      aleph.selectedTechnologies[id].sourceInterval = {
        start: null,
        end: null,
      }

      // One set for the time interval defined by the earliest and latest date that all tech timelines are initially displayed against.
      aleph.selectedTechnologies[id].baseInterval = {
        start: null,
        end: null,
      }

      // increment selected technology' counter by 1
      aleph.technologyCounter++
    }

    // call fucntion to build new timeline [panel] for each tech selected
    addTimeLinePanels()
  })
}
