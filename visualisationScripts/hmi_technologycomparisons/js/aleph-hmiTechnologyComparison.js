/*
  Project: HMI Technology Comparisons visualisation
  Filename: aleph-himTechnologyComparison.js
  Date built: July 2020 to February 2021
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

vis = {}

// function call based on browser window resize.
window.onresize = windowResize

/*
  NAME: onload 
  DESCRIPTION: function called when user loads window. Called on initial opening of visualsation.
                Calls functions necessary to set-up initial view
  ARGUMENTS TAKEN: none
  ARGUMENTS RETURNED: none
  CALLED FROM: renderTechnologyComparison
  CALLS:    alertSize();
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
      CALLED FROM: user window resizing
      CALLS: alertSize
  
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

  // store locally the chart tick selection
  var ticks = d3.selectAll('.axis.axis--x').selectAll('.tick text').style('display', 'inline')

  // if browser window is small, only display alternating tick labels to avoid overlap
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
      CALLED FROM: renderTechnologyComparison
      CALLS: resolve
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
} // end function loadData

/*
      NAME: showHideTechnologyTimeLine 
      DESCRIPTION: function called to just show/hide technology timeline panel
      ARGUMENTS TAKEN: fid - button information
      ARGUMENTS RETURNED: none
      CALLED FROM: addTechnologyButtonsToControls
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
        d3.selectAll('.timeline-g-' + tech).attr('transform', function () {
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

  // setTimeout(function () {
  //   d3.selectAll('.btn.aleph-visibility.aleph-control.btn-primary.aleph-halfWidth.aleph-btn-selected').classed(
  //     'aleph-no-pointer-events',
  //     false
  //   )
  // }, 2000)

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
              renderTechnologyComparison
              submitURL
      CALLS: zsbuildTimeLineChart - function to build construct of new timeline panel based on information for selected technology
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

    // call function to add tech display buttons and build timeline charts
    buildTimeLineChart(panel, aleph.currentSVGbaseHeight)
  } // end forEach

  // update height of bse SVG panel
  d3.selectAll('.aleph-chart').attr('height', Number(aleph.currentSVGbaseHeight) + 50)

  return
} // end function addTimeLinePanels

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

Array.prototype.contains = function (...args) {
  return [...args].every((c) => this.includes(c))
}

/*
    NAME: CharacterToCharacter
    DESCRIPTION: change one character type to another in a text string
    ARGUMENTS TAKEN: str: text string to consider
                      char1: character to find and change
                      char2 : character to change to .
    ARGUMENTS RETURNED: modified string
    CALLED FROM: submitSelection
    CALLS: none
*/
function CharacterToCharacter(str, char1, char2) {
  return str.split(char1).join(char2)
} // end function CharacterToCharacter

/*
    NAME: alertSize
    DESCRIPTION: determine current width and height dimensions of window
    ARGUMENTS TAKEN: none
    ARGUMENTS RETURNED: none
    CALLED FROM: submitSelection
                windowResize
    CALLS: none
*/
function alertSize() {
  var myWidth = 0,
    myHeight = 0
  if (typeof window.innerWidth == 'number') {
    //Non-IE
    myWidth = window.innerWidth
    myHeight = window.innerHeight
  } else if (
    document.documentElement &&
    (document.documentElement.clientWidth || document.documentElement.clientHeight)
  ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth
    myHeight = document.documentElement.clientHeight
  } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
    //IE 4 compatible
    myWidth = document.body.clientWidth
    myHeight = document.body.clientHeight
  }

  vis.width = myWidth
  vis.height = myHeight

  return
}

// http://stackoverflow.com/questions/14167863/how-can-i-bring-a-circle-to-the-front-with-d3
d3.selection.prototype.moveToFront = function () {
  return this.each(function () {
    this.parentNode.appendChild(this)
  })
}
d3.selection.prototype.moveToBack = function () {
  return this.each(function () {
    var firstChild = this.parentNode.firstChild
    if (firstChild) {
      this.parentNode.insertBefore(this, firstChild)
    }
  })
}
