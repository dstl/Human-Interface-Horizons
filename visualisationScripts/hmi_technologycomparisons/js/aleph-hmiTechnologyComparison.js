/*
  Project: HMI Technology Comparisons visualisation
  Filename: aleph-himTechnologyComparison.js
  Date built: July 2020 to January 2021
  Written By: James Bayliss (Data Vis Developer)
  Tech Stack: HTML5, CSS3, JS ES5/6, D3 (v5), JQuery 
*/

// Initialisation of global 'aleph' object construct. Stores all main dynamic variables for UI design and response
var aleph = {
  url: 'http://HMI-technologySelector.co.uk?',
  windowWidth: null /* current width of browser window; updates afer during window resizing */,
  windowHeight: null /* current height of browser window; updates afer during window resizing */,
  technologySelectionArray: [],
  selectedTechnologies: {} /* empty object to store information from ingested data file of technologies selected by user */,
  techComparisons_rolledData: [] /* empty array to contained nested, rolled data based on technology names as keys */,
  techComparisonMasterObject: {} /* empty object to contained nested, rolled data based on technology names as keys; used for comparison purposes */,
  currentSVGbaseHeight: 0 /* variable storing current height of main SVG panel; increments/decrements with height of 'timeLineHeight' with addition/removal of a tech timeline */,
  timeLineHeight: /* 450 */ 400 /* fixed height of a single timeline (all content) */,
  technologyCounter: 0 /*number of currenlty selected technologies */,
  timeLineAxisPadding: 1 /* unit of years; code add this value onto start and end of full time interval calculated to cover all events to ensure no single event butts against edge fo graph frame */,
  timeLineAxisMinYear: 3000 /* starting value to reduce from to determine and store minimum ingested event start year */,
  timeLineAxisMaxYear: -3000 /* starting value to reduce from to determine and store maximum ingested event end year */,
  previousAxisSort:
    'alpha' /* intial value to determine is new y axis domain is same or different to domain of newly selected y-axis */,
  margin: {
    top: 35,
    right: 50,
    bottom: 135 /* change this */,
    left: 225,
  } /* defined margins for upper 'focus' chart */,
  margin2: {
    top: /* 345 */ 295,
    right: 50,
    bottom: 45,
    left: 225,
  } /* defined margins for lower 'context' chart */,
  eventRectHeight: 15 /* height of event rectangles */,
  eventRectSpacing: 2.0 /* vertical spacing ebtween event rectangles */,
  curveType: 'basis' /* defines whether linklines are angular (linear) or curved (basis) */,
  toolTipDimensions: {
    /* dimension and positioning attributes for tooltip */ width: 400,
    height: 300,
    verticalLabelSpacing: 35 /* vertical spacing between text lines */,
    margin: { top: 40, right: 20, bottom: 5, left: 20 },
    informationArray: [] /* blank array to contain information estracted from ingested data file to display on tooltip */,
  },
  allowDrag: false,
  linkLines: {} /* JSON object to contain information on linklines required to display with persistence */,
  yAxisDomains: {} /* JSON object to contain information on y-axis domains for individual timmelines. Updates after each time y-axis sort/display mechanism is changed by user. helps with event rectangle transitioning on requied chart only  */,
  minAllowed: 2,
  maxAllowed: 5,
  disruptionFilters: ['step', 'incremental', 'disruptive'],
  sensoryFilters: ['audio', 'tactile', 'visual'],
  environmentFilters: ['air', 'land', 'maritime'],
  justResetTimelines: false,
  iconPlacement: 'top' /*   top / bottom */,
  brushExtentType: 'revertTo',
}

// function call based on browser window resize.
window.onresize = windowResize

/*
  NAME: onload 
  DESCRIPTION: function called when user loads window. Called on initial opening of visualsation.
                Calls functions necessary to set-up initial view
  ARGUMENTS TAKEN: none
  ARGUMENTS RETURNED: none
  CALLED FROM: body tag in index.html
  CALLS:    alertSize();
            loadData();
*/
function onload() {
  alertSize() // function call to get current browser window dimensions

  // store window dimensions as aleph object varaiables
  aleph.windowWidth = vis.width
  aleph.windowHeight = vis.height

  // update dimensions of base container DIV to size of browser window
  d3.selectAll('.aleph-exampleTechSelector')
    .style('background-color', 'white')
    .style('width', aleph.windowWidth + 'px')
    .style('height', aleph.windowHeight + 'px')

  // update dimensions of base container DIV to size of browser window
  d3.selectAll('.aleph-container')
    .style('width', aleph.windowWidth + 'px')
    .style('height', function () {
      if (aleph.technologyCounter == 1) {
        return '450px !important'
      } else {
        return aleph.windowHeight + 'px'
      }
    })

  // update dimensions of base container SVG panel to size of browser window
  d3.selectAll('.aleph-chart').attr('width', aleph.windowWidth).attr('height', aleph.currentSVGbaseHeight)

  return
} // end function onload

/*
      NAME: windowResize 
      DESCRIPTION: function called when user resizes window. handles updating of content reliant on dimension of window
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: none
      CALLS:  none
  
      http://bl.ocks.org/johangithub/97a186c551e7f6587878
  */
function windowResize() {
  alertSize() // function call to get current browser window dimensions

  // store window dimensions as aleph object varaiables
  aleph.windowWidth = vis.width
  aleph.windowHeight = vis.height

  // update dimensions of base container DIV to size of browser window
  d3.selectAll('.aleph-container')
    .style('width', aleph.windowWidth + 'px')
    .style('height', function () {
      if (aleph.technologyCounter == 1) {
        return '450px !important'
      } else {
        return aleph.windowHeight + 'px'
      }
    })
  // console.log('2 windowResize - aleph-chart aleph.windowWidth:', aleph.windowWidth)
  // update dimensions of base container SVG panel to size of browser window
  d3.selectAll('.aleph-chart.aleph-hmiTecnhnologyComparison')
    .attr('width', aleph.windowWidth)
    .attr('height', aleph.currentSVGbaseHeight)

  // recalculate width of chart timelines based on browser window width and defined margins.
  var width = aleph.windowWidth - aleph.margin.left - aleph.margin.right

  // recalculate chat width and height
  aleph.chartWidth = aleph.windowWidth - aleph.margin.left - aleph.margin.right
  aleph.chartHeight = aleph.windowHeight - aleph.margin.top - aleph.margin.bottom

  // currently redundant code; may be useful down in future development to prevent resetting of cotnext brushes on window resize
  if (x) {
    // // console.log("Some timelines displayed by user");
  } else {
    // // console.log("no timelines displayed by user");
    return
  }

  // update range of tiemline chart x-axes
  x.range([0, width])
  x2.range([0, width])

  // call ALL x axes that are currently visible and update with new width value
  d3.selectAll('.focus').selectAll('.axis.axis--x').call(xAxis)
  d3.selectAll('.aleph-falseFullPanelBackground').attr('width', aleph.windowWidth + aleph.margin.right)
  d3.selectAll('.aleph-falsePanelBackground').attr('width', aleph.windowWidth + aleph.margin.right)
  d3.selectAll('.showHideIcon.icon-hide').attr('x', aleph.windowWidth - aleph.margin.right)

  // update full-width y-axis ticks at offsets to category tick intervals.
  d3.selectAll('.yAxisTicks').attr('x1', x(x.domain()[0])).attr('x2', x(x.domain()[1]))

  var ticks = d3.selectAll('.axis.axis--x').selectAll('.tick text').style('display', 'inline')

  ticks.each(function (_, i) {
    if (i % 2 !== 0 && aleph.windowWidth < 992) {
      d3.select(this).style('display', 'none')
    }
  })

  // modify x axis start position and width of eventType obect bars
  d3.selectAll('.focus')
    .selectAll('.focusBar')
    .attr('x', function (d) {
      return x(parseDate(d.eventStartDate))
    })
    .attr('width', function (d) {
      return x(parseDate(d.eventEndDate)) - x(parseDate(d.eventStartDate))
    })

  // modify width of ALL zoom rectangles on chart focuses (upper chart on each timeline)
  d3.selectAll('.focus').selectAll('.zoom').attr('width', width)

  // modify width of ALL x axes  on chart contexts (lower chart on each timeline)
  d3.selectAll('.context').selectAll('.axis.axis--x').call(xAxis2)

  // modify x axis start position and width of eventType obect bars
  d3.selectAll('.context')
    .selectAll('.contextBar')
    .attr('x', function (d) {
      return x2(parseDate(d.eventStartDate))
    })
    .attr('width', function (d) {
      return x2(parseDate(d.eventEndDate)) - x2(parseDate(d.eventStartDate))
    })

  // update dimensions (i.e. namely width) of all context brushes
  brush.extent([
    [0, 0],
    [width, height2],
  ])

  // call brush function to update all brushes across all charts.
  d3.selectAll('.context').selectAll('.brush').call(brush).call(brush.move, x.range())

  return
} // end function windowResize

/*
      NAME: loadData 
      DESCRIPTION: function called to load single CSV input data file.
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: none
      CALLS:  none
  */
function loadData() {
  return new Promise((resolve, reject) => {
    // store relevant file papth as local variable
    var inputDataFile = `${rootPath}data/timelines.csv`
    var inputTechnologyCatalogueFile = `${rootPath}data/technologies.csv`

    // store all input files as a Promise
    Promise.all([d3.csv(inputDataFile), d3.csv(inputTechnologyCatalogueFile)]).then(function (data) {
      // locally store data
      techComparisons = data[0]
      technologiesFile = data[1]

      technologiesFile.forEach(function (d, i) {
        var JSONelement = { FID: d.id, technology: d.title, slug: d.slug }
        technologies_new[Number(i + 1)] = JSONelement
      })
      technologies = technologies_new

      // roll up data to JSON object using techName field as primary 'key'
      aleph.techComparisons_rolledData = d3
        .nest()
        .key(function (d) {
          return 'FID' + d.FID
        })
        .entries(techComparisons)

      // dynamically construct a JSON object of all data from source input data to necessary construction
      aleph.techComparisons_rolledData.forEach(function (d) {
        d.displayState = 'inline'
        var LHS = d.key.replace('FID', '')
        var RHS = d.values
        var techName = d.values[0].techName

        // create new JSON element defining display state of technology timeline ...
        aleph.techComparisonMasterObject[LHS] = {
          technology: LHS,
          technologyName: techName,
          values: RHS,
          displayState: d.displayState,
        }
      })
      resolve(aleph.techComparisonMasterObject)
    })
  }) // end promsie data load
}

/*
      NAME: showHideTechnologyTimeLine 
      DESCRIPTION: function called to just show/hide technology timeline panel
      ARGUMENTS TAKEN: fid - button information
      ARGUMENTS RETURNED: none
      CALLED FROM: proxy HTML buttons in index.html
      CALLS: none
  */
function showHideTechnologyTimeLine(fid) {
  event.stopPropagation()

  // locally store information on button pressed
  var buttonPressed = d3.select(fid)

  // extract out technology selected
  var technology = fid.id.replace('showHideIcon-', '')

  // check current state of 'displayState' key.
  if (aleph.selectedTechnologies[technology]) {
    // locally store value of counter for selected panel. Helps determine which subsequent panels to move up.
    var counter = aleph.selectedTechnologies[technology].counter

    // modofiy display state of tiemline for selcted technology
    d3.selectAll('.timeline-g-' + technology).style('display', aleph.selectedTechnologies[technology].displayState)

    // for each technology currently displayed on UI
    for (var tech in aleph.selectedTechnologies) {
      // console.log(tech)
      // if its own counter is greater than counter of technology selected to hide/show
      if (aleph.selectedTechnologies[tech].counter > counter) {
        // extract out y-axis transition value
        var y = Number(
          d3
            .selectAll('.timeline-g-' + tech)
            .attr('transform')
            .replace('translate(0,', '')
            .replace(')', '')
        )

        // modify position up/down of remaining tech timelines below timeline hidden/displayed
        d3.selectAll('.timeline-g-' + tech)
          .transition()
          .duration(1250)
          .ease(d3.easeLinear)
          .attr('transform', function () {
            if (buttonPressed.classed('icon-show')) {
              return 'translate(0,' + Number(y - aleph.timeLineHeight + 35) + ')'
            } else if (buttonPressed.classed('icon-hide')) {
              return 'translate(0,' + Number(y + aleph.timeLineHeight - 35) + ')'
            }
          })
      }
    }
  } else {
    // // console.log("tech has NOT been selected");
  }

  setTimeout(function () {
    d3.selectAll('.btn.aleph-visibility.aleph-control.btn-primary.aleph-halfWidth.aleph-btn-selected').classed(
      'aleph-no-pointer-events',
      false
    )
  }, 2000)

  return
} // end function showHideTechnologyTimeLine

/*
      NAME: add_removeTimeLinePanel 
      DESCRIPTION: function call to physically add/remove  timeline panel of technology selected by user
      ARGUMENTS TAKEN: fid - button information
      ARGUMENTS RETURNED: none
      CALLED FROM:  proxy HTML buttons in index.html
      CALLS: buildTimeLineChart - function to build construct of new timeline panel based on information for selected technology
*/
function add_removeTimeLinePanel(panel, modifyType, technology, buttonPressed) {
  // if modifyType is "add"
  if (modifyType == 'add') {
    // extract out current height of background base SVG panel...
    aleph.currentSVGbaseHeight = Number(d3.selectAll('.aleph-chart').attr('height')) + aleph.timeLineHeight

    //... and modify/calculate new height after adding new timeline panel
    d3.selectAll('.aleph-chart').attr('height', Number(aleph.currentSVGbaseHeight + 50))

    // call function to build construct of new timeline panel based on information for selected technology
    buildTimeLineChart(panel, aleph.currentSVGbaseHeight)
  }

  // if modifyType is "remove"
  else if (modifyType == 'remove') {
    // extract out current height of background base SVG panel...
    aleph.currentSVGbaseHeight = Number(d3.selectAll('.aleph-chart').attr('height')) - aleph.timeLineHeight

    //... and modify/calculate new height after removing old timeline panel
    d3.selectAll('.aleph-chart').attr('height', Number(aleph.currentSVGbaseHeight) /* + 50 */)

    // physically remove timeline panel 'g' from DOM
    d3.selectAll('.timeline-g-' + technology).remove()

    // for each technology currently displayed on UI
    for (var tech in aleph.selectedTechnologies) {
      // if its own counter is greater than counter of technology selected to hide/show
      if (aleph.selectedTechnologies[tech].counter > panel.counter) {
        // extract out y-axis transition value
        var y = d3
          .selectAll('.timeline-g-' + tech)
          .attr('transform')
          .replace('translate(0,', '')
          .replace(')', '')

        // modofiy position up/down of remaining tech timelines below timeline hidden/displayed
        d3.selectAll('.timeline-g-' + tech)
          .transition()
          .duration(1250)
          .ease(d3.easeLinear)
          .attr('transform', 'translate(0,' + (y - aleph.timeLineHeight) + ')')
      }
    }
  }

  return
} // end function add_removeTimeLinePanel

/*
      NAME: addTechnologyButtonsToControls 
      DESCRIPTION: function call to physically add/remove buttons to controls panels for each tech selected. these buttons allow users to hide/show timelines to improve viewability
      ARGUMENTS TAKEN: fid - panel
      ARGUMENTS RETURNED: none
      CALLED FROM: addTimeLinePanels
      CALLS: showHideTechnologyTimeLine(this)
*/
function addTechnologyButtonsToControls(panel) {
  // append new group element to controls dialog
  d3.selectAll('.aleph-controls')
    .append('g')
    .attr('class', 'aleph-tech-button-group aleph-tech-button-group-' + panel.counter)
    .attr('transform', 'translate(0,0)')

  // append new horizontal rule spacer element to controls dialog
  d3.selectAll('.aleph-tech-button-group-' + panel.counter)
    .append('hr')
    .attr('class', 'aleph-hr')

  // append new label element to controls dialog with selected tech name
  d3.selectAll('.aleph-tech-button-group-' + panel.counter)
    .append('label')
    .attr('class', 'aleph-controlsLabels aleph-technologyLabel')
    .text(panel.technologyName)

  // append new button element to controls dialog to allow user to hide/show tech timeline
  d3.selectAll('.aleph-tech-button-group-' + panel.counter)
    .append('button')
    .attr('class', 'btn aleph-visibility aleph-control btn-primary aleph-halfWidth aleph-btn-selected')
    .attr('id', 'FID' + panel.technology)
    .attr('value', panel.technology)
    .on('click', function () {
      showHideTechnologyTimeLine(this)
      return
    })
    .text('Hide')

  return
} // end function addTechnologyButtonsToControls(panel)

/*
      NAME: addTimeLinePanels 
      DESCRIPTION: function call to physically add/ ALL timeline panels for technologies selected by user on proxy tech selector page
      ARGUMENTS TAKEN: technologies - array fo technology names selected by user on previous screen
      ARGUMENTS RETURNED: none
      CALLED FROM: submitSelection
      CALLS: buildTimeLineChart - function to build construct of new timeline panel based on information for selected technology
              addTechnologyButtonsToControls
*/
function addTimeLinePanels() {
  // for each selected technology in array
  d3.selectAll('.aleph-chart').attr('height', 0)
  for (var selectedTechnology of Object.values(aleph.selectedTechnologies)) {
    panel = selectedTechnology

    // calculate current height
    aleph.currentSVGbaseHeight = Number(d3.selectAll('.aleph-chart').attr('height')) + aleph.timeLineHeight

    //... and modify/calculate new height after adding new timeline panel
    d3.selectAll('.aleph-chart').attr('height', Number(aleph.currentSVGbaseHeight) /* + 50 */)

    // call function to add tech display buttons and build timeline chartss
    addTechnologyButtonsToControls(panel)

    buildTimeLineChart(panel, aleph.currentSVGbaseHeight)
  } // end forEach

  d3.selectAll('.aleph-chart').attr('height', Number(aleph.currentSVGbaseHeight) + 50)

  return
} // end function addTimeLinePanels

/*
      NAME: submitSelection 
      DESCRIPTION: function call to submit user selection of technologies to view .. 
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS: addTimeLinePanels
*/
function submitSelection() {
  d3.selectAll('.aleph-exampleTechSelector').classed('aleph-hide', true)
  d3.selectAll('.aleph-chart').classed('aleph-hide', false)
  d3.selectAll('.aleph-controls').classed('aleph-hide', false)

  // recalculate chat width and height
  aleph.chartWidth = aleph.windowWidth - aleph.margin.left - aleph.margin.right
  aleph.chartHeight = aleph.windowHeight - aleph.margin.top - aleph.margin.bottom

  var selectedIcons = document.querySelectorAll('img:not(.aleph-technology-deselected)')

  // for each selected technology icons
  selectedIcons.forEach(function (d) {
    var button = d
    var id = button.id.replace('FID', '')
    aleph.technologySelectionArray.push(id)
    aleph.url = aleph.url + id + '=true&'

    // push technology/panel information from master JSON object data store to JSON obj of for selceted technologies
    aleph.selectedTechnologies[id] = aleph.techComparisonMasterObject[/* button. */ id]

    // add 'counter' key to panel information for selected technology
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

    // update modifyBy variable to "add"
    modifyBy = 'add'

    // increment selected technology' counter by 1
    aleph.technologyCounter++
  })

  // call fucntion to build new timeline [panel] for each tech selected
  addTimeLinePanels()

  // clear filter arrays
  aleph.environmentFilters = []
  aleph.disruptionFilters = []
  aleph.sensoryFilters = []

  return
} // end function submitSelection

/*
      NAME: copyURL 
      DESCRIPTION: function call to copy constructed URL string
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS: none
*/
function copyURL() {
  document.getElementById('aleph-url').value = aleph.url.slice(0, -1)
  $('.btn.aleph-technologyButton').prop('disabled', true).addClass('aleph-disabled')
  return
} // end function copyURL

/*
      NAME: submitURL 
      DESCRIPTION: function call to submit constructed URL string
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS: addTimeLinePanels();
*/
function submitURL() {
  // https://support.clickmeter.com/hc/en-us/articles/211032666-URL-parameters-How-to-pass-it-to-the-destination-URL#:~:text=Any%20word%20after%20the%20question,about%20passing%20parameter%20through%20URL.

  d3.selectAll('.aleph-exampleTechSelector').classed('aleph-hide', true)
  d3.selectAll('.aleph-chart').classed('aleph-hide', false)
  d3.selectAll('.aleph-controls').classed('aleph-hide', false)

  var url = document.getElementById('aleph-url').value
  url = url.replace('http://HMI-technologySelector.co.uk?', '').replace(':true', '')
  url = CharacterToCharacter(url, '=true', '')
  url = url.split('&')

  url.forEach(function (d) {
    // push technology/panel information from master JSON object data store to JSON obj of for selceted technologies
    aleph.selectedTechnologies[d] = aleph.techComparisonMasterObject[d]

    // add 'counter' key to panel information for selected technology
    aleph.selectedTechnologies[d].counter = aleph.technologyCounter

    // initialise keys relating to time range start/end for selected technology.
    // One set for the time interval currently selected on the tech's own brush on context chart
    aleph.selectedTechnologies[d].currentInterval = {
      start: null,
      end: null,
    }
    // One set for the time interval defined by the earliest and latest date for an individual event on tech timeline.
    aleph.selectedTechnologies[d].sourceInterval = {
      start: null,
      end: null,
    }

    // update modifyBy variable to "add"
    modifyBy = 'add'
    aleph.technologyCounter++
  })

  addTimeLinePanels()

  aleph.url = 'http://HMI-technologySelector.co.uk?'

  return
} // end function submitURL

/*
      NAME: submitURL 
      DESCRIPTION: function call to return to proxy example tech selector page
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS: none
*/
function returnToTechSelector() {
  // show legend
  d3.selectAll('.aleph-legendBase').classed('aleph-hide', true)

  $('.btn.btn-secondary')
    .prop('disabled', false)
    .removeClass('aleph-filter-deselected')
    .addClass('aleph-filter-selected')
  $('.aleph-technology-icon').prop('disabled', false).removeClass('aleph-technology-deselected')

  $('#aleph-submit').prop('disabled', true).removeClass('btn-success').addClass('btn-danger').addClass('aleph-disabled')

  aleph.disruptionFilters = ['step', 'incremental', 'disruptive']
  aleph.sensoryFilters = ['audio', 'tactile', 'visual']
  aleph.environmentFilters = ['air', 'land', 'maritime']

  // remove  tech selector button array
  d3.selectAll('.aleph-tech-button-group').remove()

  // modify class styling of copy/submit form items.
  $('.btn.aleph-copyUrl').prop('disabled', false).removeClass('aleph-disabled')
  $('.btn.aleph-submitUrl').prop('disabled', false).removeClass('aleph-disabled')

  // modify class styling of DOM items.
  d3.selectAll('.aleph-exampleTechSelector').classed('aleph-hide', false)
  d3.selectAll('.aleph-chart').classed('aleph-hide', true)
  d3.selectAll('.aleph-controls').classed('aleph-hide', true).style('height', 'auto')

  // reinitialise arrays
  aleph.technologySelectionArray = []
  aleph.selectedTechnologies = {}

  // grab references to all buttons.
  var buttons = d3.selectAll('.btn.aleph-technologyButton')._groups[0]

  // for each button referecne...
  buttons.forEach(function (d) {
    if (d.innerText.indexOf('(') != -1) {
      var index = d.innerText.indexOf('(')
      d.innerText = d.innerText.slice(0, index)
    }
  })

  // modify class styling of DOM tech buttons.
  d3.selectAll('.btn.aleph-technologyButton').classed('aleph-btn-selected', false).classed('aleph-btn-unselected', true)

  // remove tiemline group element
  d3.selectAll('.timeline-g').remove()

  d3.select('.aleph-chart').attr('height', 0)
  aleph.technologyCounter = 0

  return
} // end function returnToTechSelector

/*
      NAME: filterTechnologiesByEnvironment 
      DESCRIPTION: function call to filter tech icons by environment var
      ARGUMENTS TAKEN: button - info on DOM button pressed
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS: filterTechnologies_correctly
*/
function filterTechnologiesByEnvironment(button) {
  // localised button variable
  var buttonPressed = d3.select(button)

  // modify classname styling/defs
  buttonPressed.classed('aleph-filter-deselected', !buttonPressed.classed('aleph-filter-deselected'))

  // modify classname styling/defs
  buttonPressed.classed('aleph-filter-selected', !buttonPressed.classed('aleph-filter-selected'))

  // localise HTML content of [de]selected technology
  var buttonPressed = d3.select(button)
  var filterValue = button.value

  if (aleph.environmentFilters.indexOf(filterValue) == -1) {
    aleph.environmentFilters.push(filterValue)
  } else {
    const filterIndex = aleph.environmentFilters.indexOf(filterValue)
    if (filterIndex > -1) {
      aleph.environmentFilters.splice(filterIndex, 1)
    }
  }
  // call function to correcly filter tech icons.
  filterTechnologies_correctly()

  return
} // end function filterTechnologiesByEnvironment

/*
      NAME: filterTechnologiesByDisruptiveness 
      DESCRIPTION: function call to filter tech icons by disruptiveness var
      ARGUMENTS TAKEN: button - info on DOM button pressed
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS: filterTechnologies_correctly
*/
function filterTechnologiesByDisruptiveness(button) {
  // localised button variable
  var buttonPressed = d3.select(button)

  // modify classname styling/defs
  buttonPressed.classed('aleph-filter-deselected', !buttonPressed.classed('aleph-filter-deselected'))

  // modify classname styling/defs
  buttonPressed.classed('aleph-filter-selected', !buttonPressed.classed('aleph-filter-selected'))

  // localise HTML content of [de]selected technology
  var buttonPressed = d3.select(button)
  var filterValue = button.value

  if (aleph.disruptionFilters.indexOf(filterValue) == -1) {
    aleph.disruptionFilters.push(filterValue)
  } else {
    const filterIndex = aleph.disruptionFilters.indexOf(filterValue)
    if (filterIndex > -1) {
      aleph.disruptionFilters.splice(filterIndex, 1)
    }
  }

  // call function to correcly filter tech icons.
  filterTechnologies_correctly()

  return
} // end function filterTechnologiesByDisruptiveness

/*
      NAME: filterTechnologiesBySensory 
      DESCRIPTION: function call to filter tech icons by disruptiveness var
      ARGUMENTS TAKEN: button - info on DOM button pressed
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS: filterTechnologies_correctly
*/
function filterTechnologiesBySensory(button) {
  // localised button variable
  var buttonPressed = d3.select(button)

  // modify classname styling/defs
  buttonPressed.classed('aleph-filter-deselected', !buttonPressed.classed('aleph-filter-deselected'))

  // modify classname styling/defs
  buttonPressed.classed('aleph-filter-selected', !buttonPressed.classed('aleph-filter-selected'))

  // localise HTML content of [de]selected technology
  var buttonPressed = d3.select(button)
  var filterValue = button.value

  if (aleph.sensoryFilters.indexOf(filterValue) == -1) {
    aleph.sensoryFilters.push(filterValue)
  } else {
    const filterIndex = aleph.sensoryFilters.indexOf(filterValue)
    if (filterIndex > -1) {
      aleph.sensoryFilters.splice(filterIndex, 1)
    }
  }

  // call function to correcly filter tech icons.
  filterTechnologies_correctly()

  return
} // end function filterTechnologiesBySensory

/*
      NAME: filterTechnologies_correctly 
      DESCRIPTION: function call to filter tech icons by all retaiend filters simultaneously
      ARGUMENTS TAKEN: button - info on DOM button pressed
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS: filterTechnologies_correctly
*/
function filterTechnologies_correctly() {
  // get reference for all technology icons.
  var technologyIcons = d3.selectAll('.aleph-technology-icon')._groups[0]
  var id = '' // initial id variable

  // for eh technology references ...
  technologyIcons.forEach(function (d) {
    // get its class listing
    var classList = d.classList['value'].split(' ')

    // get its ID
    id = d.id

    // check that at least one disruption filter retained is present in tech class listing
    const foundDisruption = classList.some((r) => aleph.disruptionFilters.includes(r))

    // check that at least one sensory filter retained is present in tech class listing
    const foundSensory = classList.some((r) => aleph.sensoryFilters.includes(r))

    // check that at least one environment filter retained is present in tech class listing
    const foundEnvionment = classList.some((r) => aleph.environmentFilters.includes(r))

    // construct temp array store for boolean values fo each filter group
    var filterCheck = [foundDisruption, foundSensory, foundEnvionment]

    // any of the filter groups has not been found ...
    if (filterCheck.indexOf(false) != -1) {
      d3.select('#' + id)
        .classed('aleph-technology-selected', false)
        .classed('aleph-technology-deselected', true)
    } else {
      d3.select('#' + id)
        .classed('aleph-technology-selected', true)
        .classed('aleph-technology-deselected', false)
    }
  }) // end forEach

  var countStillSelected = d3.selectAll('.aleph-technology-icon.aleph-technology-selected')

  if (
    countStillSelected._groups[0].length >= aleph.minAllowed &&
    countStillSelected._groups[0].length <= aleph.maxAllowed
  ) {
    $('#aleph-submit')
      .prop('disabled', false)
      .removeClass('aleph-disabled')
      .removeClass('btn-danger')
      .addClass('btn-success')
  } else {
    $('#aleph-submit')
      .prop('disabled', true)
      .addClass('aleph-disabled')
      .removeClass('btn-success')
      .addClass('btn-danger')
  }

  return
} // end filterTechnologies_correctly();

/*
      NAME: manuallyFilterTechnology 
      DESCRIPTION: function called to manually filter a tech if remaing techs are to many to view. 
      ARGUMENTS TAKEN: button - info on DOM button pressed
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS: filterTechnologies_correctly
*/
function manuallyFilterTechnology(button) {
  // localise ID
  var id = button.id

  // localise HTML content of [de]selected technology
  if (d3.select('#' + id).classed('aleph-technology-deselected')) {
    d3.select('#' + id)
      .classed('aleph-technology-selected', true)
      .classed('aleph-technology-deselected', false)
  } else {
    d3.select('#' + id)
      .classed('aleph-technology-selected', false)
      .classed('aleph-technology-deselected', true)
  }

  var countStillSelected = d3.selectAll('.aleph-technology-icon.aleph-technology-selected')

  if (
    countStillSelected._groups[0].length >= aleph.minAllowed &&
    countStillSelected._groups[0].length <= aleph.maxAllowed
  ) {
    $('#aleph-submit')
      .prop('disabled', false)
      .removeClass('aleph-disabled')
      .removeClass('btn-danger')
      .addClass('btn-success')
  } else {
    $('#aleph-submit')
      .prop('disabled', true)
      .addClass('aleph-disabled')
      .removeClass('btn-success')
      .addClass('btn-danger')
  }

  return
} // end function  manuallyFilterTechnology

Array.prototype.contains = function (...args) {
  return [...args].every((c) => this.includes(c))
}

function reset(button) {
  d3.selectAll('.aleph-technology-icon')
    .classed('aleph-technology-selected', true)
    .classed('aleph-technology-deselected', false)

  d3.selectAll('.btn.aleph-filter').classed('aleph-filter-selected', true).classed('aleph-filter-deselected', false)

  aleph.disruptionFilters = ['step', 'incremental', 'disruptive']
  aleph.sensoryFilters = ['audio', 'tactile', 'visual']
  aleph.environmentFilters = ['air', 'land', 'maritime']

  return
} // end function reset
