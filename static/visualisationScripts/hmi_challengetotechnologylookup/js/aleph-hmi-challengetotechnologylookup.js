/*
  Project: HMI Challenge to Technology lookup visualisation
  Filename: aleph-challengetotechnologylookup.js
  Date built: October 2020 to February 2021
  Written By: James Bayliss (Data Vis Developer)
  Tech Stack: HTML5, CSS3, JS ES5/6, D3 (v5), JQuery 
*/

//const { size } = require("lodash")

/* 

USEFUL LINKS:
https://bl.ocks.org/d3noob/06e72deea99e7b4859841f305f63ba85
http://bl.ocks.org/tomshanley/11097618
https://bl.ocks.org/wvengen/cab9b01816490edb7083

*/

// Initialisation of global 'aleph' object construct. Stores all main dynamic variables for UI design and responsiveness
var aleph = {
  bannerBaseHeight: 250,
  url: 'http://HMI-technologySelector.co.uk?',
  margin: {
    top: 40,
    right: 250,
    bottom: 100,
    left: 275,
    axis: -25,
    arrow: 100,
    arrowLeft: 0,
    arrowRight: 0,
  },
  numberOfLevels: 1,
  challengeToTechnologyData: [],
  sourceTechnologyArray: [],
  filteredData: [],
  sourceNodes: [],
  targetNodes: [],
  leftNodeOrder: [],
  rightNodeOrder: [],
  nodeClicked: '',
  layerHistory: {},
  timeLineAxisMinYear: 9999,
  timeLineAxisMaxYear: -9999,
  dataMinYear: 9999,
  dataMaxYear: -9999,
  timeLineAxisPadding: 0,
  transitionDuration: 1250,
  toggleValue: 'source',
  sortToggleValue: 'count',
  onload: true,
  dataWeighting: 'binary',
  toolTipDimensions: {
    /* dimension and positioning attributes for tooltip */ width: 450,
    height: 300,
    verticalLabelSpacing: 50 /* vertical spacing between text lines */,
    margin: { top: 100, right: 10, bottom: 10, left: 25 },
    informationArray: [] /* blank array to contain information extracted from ingested data file to display on tooltip */,
  },
  submitted: false,
  transitionType: 1,
  techIconImageSize: 50,
  thresholdHigh: 8,
  thresholdLow: 1,
  challengeNodeCount: 0,
  technologyNodeCount: 0,
  persistentLinks: false,
}

// initialise JSON objects for containing contents of ingested project 'control' files
var vis = {} // global JSON object containing screen dimension variables. (legacy of useful_full.js support file)
var families = {} // cognitive challenge families
var challenges = {} // cognitiuve challenges
var technologies = {} // 29 current project technologies
var link // global variable for D3 link
var node // an individual Sankey chart node tied to as single technology or cognitive challenge
var svg // global variable for svg base DOM element
var sankey // global variable for D3 Snkey structure
var path // global variable for D3 path component
var parseDate = d3.timeParse('%Y') // time format parser - currently set up to read in integer years (e.g. 2020, 2017). No month or date/day definition
var isScrolling // var to define is window is currently being scrolled up/down by user. Not relevant to horizontal scrolling

// define colour ramp for sankey nodes; based on DSTL primary and secondary colour palletes.
var color = [
  '#14022e' /* midnight purple */,
  '#7b67a8',
  '#36bcee',
  '#2eb5b2',
  '#62bf95' /* ADDED TO MAKE NECESSARY NUMBER */,
  '#96c978',
  '#c9d35b' /* ADDED TO MAKE NECESSARY NUMBER */,
  '#fddd3e',
  '#ef7835',
  '#ce2256' /* rose red */,
]

alertSize() // function call to get current (onload at this point) browser window dimensions

// store window dimensions as aleph object varaiables
aleph.windowWidth = vis.width // updte global width variable
aleph.windowHeight = vis.height // updte global height variable

// definition and initialisation of D3 tooltip
aleph.tooltip = d3
  .selectAll('.aleph-hmiToolTip-Div')
  .style('filter', 'url(#drop-shadow)')
  .attr('class', 'aleph-hmiToolTip-Div aleph-hide')
  .style('position', 'absolute')
  .style('left', 50 + 'px')
  .style('padding', '15px')
  .style('top', 50 + 'px')
  .style('width', aleph.toolTipDimensions.width + 'px')

// append tooltip title label
d3.selectAll('.aleph-hmiToolTip-Div')
  .append('label')
  .attr('class', 'aleph-hmiToolTipTitle-label')
  .style('position', 'relative')
  .style('display', 'block')
  .style('text-anchor', 'middle')
  .text('Test Title Text')

// append tooltip sub-title label
d3.selectAll('.aleph-hmiToolTip-Div')
  .append('label')
  .attr('class', 'aleph-hmiToolTipSubTitle-label')
  .style('position', 'relative')
  .style('left', 10 + 'px')
  .style('display', 'block')
  .text('Test Sub-title Text')

// append tooltip number count label
d3.selectAll('.aleph-hmiToolTip-Div')
  .append('label')
  .attr('class', 'aleph-hmiToolTipNumber-label')
  .style('position', 'relative')
  .style('left', 10 + 'px')
  .style('display', 'block')
  .text('Test Number Text')

// append tooltip span list label
d3.selectAll('.aleph-hmiToolTip-Div')
  .append('label')
  .attr('class', 'aleph-hmiToolTipListTitle-label')
  .style('position', 'relative')
  .style('left', 10 + 'px')
  .style('font-weight', 'bold')
  .style('display', 'block')
  .text('Test Title Text')

// filters go in defs element
var defs = d3.selectAll('.aleph-chart').append('defs')

// create filter with id #drop-shadow
// height=130% so that the shadow is not clipped
var filter = defs.append('filter').attr('id', 'drop-shadow').attr('height', '130%')

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter.append('feGaussianBlur').attr('in', 'SourceAlpha').attr('stdDeviation', 5).attr('result', 'blur')

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter.append('feOffset').attr('in', 'blur').attr('dx', 5).attr('dy', 5).attr('result', 'offsetBlur')

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge = filter.append('feMerge')
feMerge.append('feMergeNode').attr('in', 'offsetBlur')
feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

// call to functions to handle onclick user action on control open/close icon/bakcground
d3.selectAll('.aleph-controls').on('click', function () {
  // if user opens controls ...
  if (d3.selectAll('.aleph-controls').classed('aleph-closeControls')) {
    d3.selectAll('.aleph-controls').classed('aleph-closeControls', false).classed('aleph-openControls', true)

    // else if user closes controls ...
  } else {
    d3.selectAll('.aleph-controls').classed('aleph-closeControls', true).classed('aleph-openControls', false)
  }

  // bring control panel to front
  var sel = d3.selectAll('.aleph-controls')
  sel.moveToFront()

  return
})

// function call based on browser window resize by user.
window.onresize = windowResize

/*
  NAME: onload 
  DESCRIPTION: function called when user loads window. Called on initial opening of visualsation.
                Calls functions necessary to set-up initial view
  ARGUMENTS TAKEN: none
  ARGUMENTS RETURNED: none
  CALLED FROM: renderChallengeToTechnology (in GatsbyBridge.js)
  CALLS:    alertSize();
            loadData();
*/
function onload() {
  alertSize() // function call to get current browser window dimensions
  loadData() // function call to load initial CSV data file

  // store window dimensions as aleph object varaiables
  aleph.windowWidth = vis.width
  aleph.windowHeight = vis.height

  // update dimensions of base container DIV to size of browser window
  d3.selectAll('.aleph-container').style('width', aleph.windowWidth + 'px')

  // update dimensions of base container SVG panel to size of browser window
  d3.selectAll('.aleph-chart').attr('width', aleph.windowWidth).attr('height', aleph.windowHeight)

  // append base Div to contain static fixed controls (sliders, sort order buttons, main title) to visual
  d3.selectAll('.aleph-container')
    .append('div')
    .attr('class', 'aleph-bannerBase aleph-hide')
    .style('width', aleph.windowWidth + 'px')
    .style('height', aleph.bannerBaseHeight + 'px')
    .style('background-color', 'none')
    .style('position', 'fixed')

  // append base SVG to base Div tontain attach static fixed controls (sliders, sort order buttons, main title) to visual
  d3.selectAll('.aleph-bannerBase')
    .append('svg')
    .attr('class', 'aleph-bannerSVGBase')
    .attr('width', aleph.windowWidth)
    .attr('height', aleph.bannerBaseHeight)
    .attr('y', -50)
    .style('background-color', 'none')

  // append base background rectangle
  d3.selectAll('.aleph-bannerSVGBase')
    .append('rect')
    .attr('class', 'aleph-bannerSVGBase-rect')
    .attr('width', aleph.windowWidth)
    .attr('height', aleph.bannerBaseHeight)

  return
} // end function onload

/*
      NAME: windowResize 
      DESCRIPTION: function called when user resizes window. handles updating of content reliant on dimension of window
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: any instance of user resizing window 
      CALLS: alertSize
      setSliderTicks
      submitSelection
  
      http://bl.ocks.org/johangithub/97a186c551e7f6587878
  */
function windowResize() {
  // initial catch-all check for if no echnology has been selected. If none, bail out. If so, continue
  if (aleph.sourceTechnologyArray[0] === undefined) {
    return
  }

  alertSize() // function call to get current browser window dimensions

  // store window dimensions as aleph object varaiables
  aleph.windowWidth = vis.width
  aleph.windowHeight = vis.height

  // update dimensions of base container DIV to size of browser window
  d3.selectAll('.aleph-container')
    .style('width', aleph.windowWidth + 'px')
    .style('height', aleph.windowHeight + 'px')

  // update dimensions of base container SVG panel to size of browser window
  d3.selectAll('.aleph-chart').attr('width', aleph.windowWidth).attr('height', aleph.windowHeight)

  // recalculate width of chart timelines based on browser window width and defined margins.
  d3.selectAll('.aleph-bannerBase').style('width', aleph.windowWidth + 'px')
  d3.selectAll('.aleph-bannerSVGBase').attr('width', aleph.windowWidth)
  d3.selectAll('.aleph-bannerSVGBase-rect').attr('width', aleph.windowWidth)

  // respoition both sort order image buttons and their group base.
  d3.selectAll('.aleph-sortButton-group-base').attr(
    'transform',
    'translate(' + aleph.windowWidth / 2 + ',' + aleph.margin.top / 2 + ')'
  )
  d3.select('#binary').attr('x', aleph.windowWidth / 2 - 350)
  d3.select('#weighted').attr('x', aleph.windowWidth / 2 - 0)

  // reposition main vis title (cognitive challenge family name).
  d3.selectAll('.aleph-mainTitle').attr('x', aleph.windowWidth / 2)

  // function call to update positioning of slider ticks.
  setSliderTicks('#slider-range')

    // append text label instruction user to click node rect...
    d3.select('#aleph-Node-Click-Instruction')
    .attr('x', aleph.windowWidth - aleph.margin.right)

  // append text label instruction user to click node rect...
  d3.select('#aleph-Icon-Click-Instruction')
    .attr('x', aleph.windowWidth)

  // remove chart group element to allow redraw
  d3.selectAll('.aleph-chart-g').remove()

  // call function to submit form selections to create visual
  submitSelection()

  return
} // end function windowResize

/*
      NAME: loadData 
      DESCRIPTION: function called to load required CSV input data files.
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: onload
      CALLS:  resolve
  */
function loadData() {
  return new Promise((resolve, reject) => {
    // store relevant file papth as local variables
    var inputDataFile = `${rootPath}data/challenge-to-technology.csv` // chart visualisation data file
    var inputTechnologyCatalogueFile = `${rootPath}data/technologies.csv` // contorl technology file
    var inputCognitiveChallengeFamiliesFile = `${rootPath}data/cognitiveChallengeFamilies.csv` // control cogn. challenge family file
    var inputCognitiveChallengesFile = `${rootPath}data/cognitiveChallenges.csv` // control cognitive challenge file

    // store all input files as a Promise
    Promise.all([
      d3.csv(inputDataFile),
      d3.csv(inputTechnologyCatalogueFile),
      d3.csv(inputCognitiveChallengeFamiliesFile),
      d3.csv(inputCognitiveChallengesFile),
    ]).then(function (data) {
      // locally store data
      challengeToTechnology = data[0] // chart data
      technologiesFile = data[1] // technologies
      cognitiveChallengeFamiliesFile = data[2] // cogn. challenge families
      cognitiveChallengesFile = data[3] // cogn. challenge.

      aleph.challengeToTechnologyData = challengeToTechnology // store chart data as alpeh JSON element

      // dynamically build reference cogn. challenge family JSON object.
      cognitiveChallengeFamiliesFile.forEach(function (d, i) {
        families[d.family] = { family: d.family, familyName: d.familyName }
      })

      // dynamically build technologies JSON object.
      technologiesFile.forEach(function (d, i) {
        var JSONelement = { technology: d.title, slug: d.slug }
        technologies[Number(i + 1)] = JSONelement
      }) // end forEach

      // dynamically cogn. challenge JSON object.
      cognitiveChallengesFile.forEach(function (d, i) {
        var JSONelement = { family: families[d.family].familyName, challenge: d.challenge }
        challenges[d['ref'].replace('.', '_')] = JSONelement
      }) // end forEach

      resolve(aleph.challengeToTechnologyData)
    }) // end promsie data load
  })
}

/*ion
      NAME: submitSelection 
      DESCRIPTION: function called to initially draw chart
      ARGUMENTS TAKEN: techTaxonomy
      ARGUMENTS RETURNED: none
      CALLED FROM: windowResize
                   HTML slider change
                   renderChallengeToTechnology
      CALLS: CharacterToCharacter
              sankey
              cursorCoords
              navFunc
              changeLinkBase
              attachSVGControls
  */
function submitSelection() {
  // initial catch-all check for if no echnology has been selected. If none, bail out. If so, continue
  if (aleph.sourceTechnologyArray[0] === undefined) {
    return
  }

  // modify classnames of relevant DOM components
  // remove chart group element to allow redraw
  d3.selectAll('.aleph-slideRangeContainer').classed('aleph-hide', false)
  d3.selectAll('.aleph-exampleTechSelector').classed('aleph-hide', true)
  d3.selectAll('.aleph-chart').classed('aleph-hide', false)
  d3.selectAll('.aleph-controls').classed('aleph-hide', false)
  d3.selectAll('.aleph-bannerBase').classed('aleph-hide', false)

  // recalculate chat width and height
  aleph.chartWidth = aleph.windowWidth - aleph.margin.left - aleph.margin.right
  aleph.chartHeight = aleph.windowHeight - aleph.margin.top - aleph.margin.bottom

  // Set the sankey diagram properties
  sankey = d3.sankey().nodeWidth(36).nodePadding(40).size([aleph.chartWidth, 1750])

  // path definiton function call declaration
  path = sankey.link()

  // lets now extract all the data from teh source ingested data to build this chart with.
  // and simultaenously construct arrays to contain the source node definitions. Needed for sorting and user interactions.
  aleph.filteredData = aleph.challengeToTechnologyData.filter(function (d) {
    if (
      aleph.sourceNodes.indexOf(d.COGNITIVE_CHALLENGE_NUMBER.replace('.', '_')) == -1 &&
      d['COGNITIVE_CHALLENGE_FAMILY_NUMBER'] == aleph.sourceTechnologyArray[0]
    ) {
      aleph.sourceNodes.push(d.COGNITIVE_CHALLENGE_NUMBER.replace('.', '_'))
    }
    return d['COGNITIVE_CHALLENGE_FAMILY_NUMBER'] == aleph.sourceTechnologyArray[0]
  }) // end filter.

  // locally store data to check if there is actually data to chart baed on most recent user change (propbably a slider event)
  var dataTopCheckContentOf = aleph.filteredData.filter(function (d) {
    return d[aleph.dataWeighting] != 0 && d['weighted'] >= aleph.thresholdLow && d['weighted'] <= aleph.thresholdHigh
  })

  // check to see if there is any data to plot a chart from; if so, continue, if not, modify display momentarily to alert user this si so, and reset to previous version
  if (dataTopCheckContentOf.length > 0) {
    data = dataTopCheckContentOf
    d3.selectAll('.aleph-nodeCount.aleph-noDataToChart').classed('aleph-hide', true)
  } else {
    d3.selectAll('.aleph-nodeCount.aleph-noDataToChart').classed('aleph-hide', false)
    d3.selectAll('.hideShow')
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .style('opacity', 0.05)
      .transition()
      .delay(2500)
      .duration(2500)
      .ease(d3.easeLinear)
      .style('opacity', 1.0)

    // use set timeout to reset slider range handles to previous values
    setTimeout(function () {
      // Setter
      $('#slider-range').slider('option', 'values', aleph.previousSliderRange)

      // after delay high arning message
      d3.selectAll('.aleph-nodeCount.aleph-noDataToChart').classed('aleph-hide', true)
    }, 3500)

    return
  }

  // if newest requested chart is polttable, update previous slsider range value to current slider range value.
  aleph.previousSliderRange = aleph.currentSliderRange

  // remove necessary chart content to allow chart rebuild
  d3.selectAll('.aleph-chart-g').remove()
  d3.selectAll('.aleph-nodeCount').remove()
  d3.selectAll('.arrow').remove()

  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  svg = d3.select('#aleph-chart').attr('width', aleph.windowWidth).attr('height', 2000)

  // append the svg object to the body of the page
  svg = d3
    .selectAll('.aleph-chart')
    .append('g')
    .attr('class', 'aleph-chart-g hideShow')
    .attr('transform', 'translate(' + aleph.margin.left + ',' + aleph.margin.top * 2 + ')')
  //set up graph in same style as original example but empty
  graph = { nodes: [], links: [] }

  // iniitalise/undate count variables for each bank of chart nodes
  aleph.challengeNodeCount = 0 // left hand side
  aleph.technologyNodeCount = 0 // right hand side

  // loop through data JSON object, constructing grahph.nodes and links components
  data.forEach(function (d, i) {
    // push onto node JSON object
    graph.nodes.push({
      GLOBAL_UID: d.GLOBAL_UID,
      CCF_UID: d.CCF_UID,
      name: d.COGNITIVE_CHALLENGE,
      number: d.COGNITIVE_CHALLENGE_NUMBER,
      index: i,
      family: d.COGNITIVE_CHALLENGE_FAMILY,
      familyNumber: d.COGNITIVE_CHALLENGE_FAMILY_NUMBER,
    })

    // push onto node JSON object
    graph.nodes.push({
      GLOBAL_UID: d.GLOBAL_UID,
      CCF_UID: d.CCF_UID,
      name: d.TECHNOLOGY,
      number: d.TECHNOLOGY_NUMBER,
      index: i,
      family: d.COGNITIVE_CHALLENGE_FAMILY,
      familyNumber: d.COGNITIVE_CHALLENGE_FAMILY_NUMBER,
    })

    // push onto link JSON object
    graph.links.push({
      GLOBAL_UID: d.GLOBAL_UID,
      CCF_UID: d.CCF_UID,
      source: d.COGNITIVE_CHALLENGE_NUMBER,
      target: d.TECHNOLOGY_NUMBER,
      binary: +d.binary,
      weighted: +d.weighted,
      family: d.COGNITIVE_CHALLENGE_FAMILY,
      familyNumber: d.COGNITIVE_CHALLENGE_FAMILY_NUMBER,
      challenge: d.COGNITIVE_CHALLENGE,
      number: d.COGNITIVE_CHALLENGE_NUMBER,
    })
    graph.links[i].value = graph.links[i][aleph.dataWeighting]
  }) // end forEach

  // return only the distinct / unique nodes
  graph.nodes = d3.keys(
    d3
      .nest()
      .key(function (d) {
        return d.number
      })
      .object(graph.nodes)
  )

  // loop through each link replacing the text with its index from node
  graph.links.forEach(function (d, i) {
    graph.links[i].source = graph.nodes.indexOf(graph.links[i].source)
    graph.links[i].target = graph.nodes.indexOf(graph.links[i].target)
  })

  // now loop through each nodes to make nodes an array of objects
  // rather than an array of strings
  graph.nodes.forEach(function (d, i) {
    graph.nodes[i] = { name: d.replace('.', '_'), index: i }
  })

  // generate Saney object
  sankey.nodes(graph.nodes).links(graph.links).layout(32)

  // add in the links
  link = svg
    .append('g')
    .attr('class', 'aleph-link-group')
    .selectAll('.link')
    .data(graph.links)
    .enter()
    .append('path')
    .attr('class', function (d) {
      return (
        'link aleph-link link-source-' +
        CharacterToCharacter(d.source.name, '.', '_') +
        ' link-target-' +
        CharacterToCharacter(d.target.name, '.', '_') +
        ' link-family-' +
        CharacterToCharacter(d.family, ' ', '_')
      )
    })
    .attr('d', path)
    .style('stroke', function (d) {
      // retrun fill colour based on which cogn. challenge is being mapped for.
      if (aleph.sourceNodes.indexOf(d.number.replace('.', '_')) != -1) {
        return color[aleph.leftNodeOrder.indexOf(d.number.replace('.', '_'))]
      } else {
        return color[aleph.leftNodeOrder.indexOf(d.number.replace('.', '_'))]
      }
    })
    .style('stroke-width', function (d) {
      return Math.max(1, d.dy)
    })
    .on('mouseover', function (d) {
      // hide all links and nodes ...
      d3.selectAll('.link').classed('aleph-hide', true)
      d3.selectAll('.node').classed('aleph-hide', true)

      // if user is basing link selection on having SOURCE nodes as the parent/starting point,
      if (aleph.toggleValue == 'source') {
        d3.selectAll('.link.link-source-' + d.source.name).classed('aleph-hide', false)
        d3.selectAll('.node.source-' + d.source.name).classed('aleph-hide', false)
        d3.selectAll('.node.target-' + d.target.name).classed('aleph-hide', false)

        // if user is basing link selection on having TARGET nodes as the parent/starting point,
      } else if (aleph.toggleValue == 'target') {
        d3.selectAll('.link.link-target-' + d.target.name).classed('aleph-hide', false)
        d3.selectAll('.node.target-' + d.target.name).classed('aleph-hide', false)
        d3.selectAll('.node.source-' + d.source.name).classed('aleph-hide', false)
      }

      return
    })
    .on('mouseout', function (d, i) {
      // redisplay all links and nodes
      d3.selectAll('.link').classed('aleph-hide', false)
      d3.selectAll('.node').classed('aleph-hide', false)
      return
    })

  //add the link titles
  link.append('title').text(function (d) {
    return challenges[d.source.name].challenge + ' → ' + technologies[d.target.name].technology
  })

  // add in the nodes
  node = svg
    .append('g')
    .attr('class', 'aleph-node-group')
    .selectAll('.node')
    .data(graph.nodes)
    .enter()
    .append('g')
    .attr('id', function (d) {
      return 'node-' + d.name
    })
    .attr('class', function (d) {
      // initialise str variable to construct classname construct
      var str = ''

      // modify and add additional classnames based on whether node is a cogn. challenge or technology
      // if source (cogn. challenge) node
      if (aleph.sourceNodes.indexOf(d.name) != -1) {
        aleph.challengeNodeCount++
        aleph.margin.arrowLeft = d.x
        str = 'node SOURCE source-' + d.name
      }
      // if target (technology) node
      else {
        aleph.technologyNodeCount++
        aleph.margin.arrowRight = d.x
        str = 'node TARGET target-' + d.name
      }

      if (aleph.sourceNodes.indexOf(d.name) == -1) {
        d.targetLinks.forEach(function (d) {
          var input = d
          str = str + ' source-' + input.source.name
        })
      } // end if ...
      else if (aleph.targetNodes.indexOf(d.name) == -1) {
        d.sourceLinks.forEach(function (d) {
          var input = d
          str = str + ' target-' + input.target.name
        })
      }

      return str
    })
    .attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')'
    })
    .on('mouseover', function (d) {
      // on mouseover of technology node, make tooltip visivble and raise to front
      d3.selectAll('.aleph-hmiToolTip-Div').classed('aleph-hide', false).moveToFront()

      // D3 v4
      // determine current curos mouse position on window
      var x = d3.event.pageX
      var y = d3.event.pageY

      // display tooltip on user interaction
      cursorCoords(d, x, y)

      if (aleph.nodeClicked != '' && aleph.nodeClicked != d.name) {
        aleph.nodeClicked = ''
      } else {
        d3.selectAll('.link').classed('aleph-transparent', true).classed('aleph-no-pointer-events', true)
        d3.selectAll('.node').classed('aleph-transparent', true).classed('aleph-no-pointer-events', true)

        d3.select(this).classed('aleph-transparent', false).classed('aleph-no-pointer-events', false)

        d3.selectAll('.link.link-source-' + d.name)
          .classed('aleph-transparent', false)
          .classed('aleph-no-pointer-events', false)

        d3.selectAll('.link.link-target-' + d.name)
          .classed('aleph-transparent', false)
          .classed('aleph-no-pointer-events', false)

        // modify transparency of link paths based on whether they have common challenge to tech relationships
        if (d.sourceLinks.length > 0) {
          d3.selectAll('.node.source-' + d.name).classed('aleph-transparent', false)
        } else if (d.targetLinks.length > 0) {
          d3.selectAll('.node.target-' + d.name).classed('aleph-transparent', false)
        }
      }

      return
    })
    .on('mousemove', function (d) {
      // D3 v4
      var x = d3.event.pageX
      var y = d3.event.pageY

      // call function to update coordinates and position of tooltip
      cursorCoords(d, x, y)

      return
    })
    .on('mouseout', function (d) {
      // as user moves mourse away from node, hide tooltip
      d3.selectAll('.aleph-hmiToolTip-Div').classed('aleph-hide', true)

      // has user clicked node ...?
      if (aleph.nodeClicked == '') {
        d3.selectAll('.link').classed('aleph-transparent', false)
        d3.selectAll('.node').classed('aleph-transparent', false).classed('aleph-no-pointer-events', false)
        aleph.nodeClicked = ''
      } else {
      }
      return
    })
    .on('click', function (d) {
      // if user clicks node ...
      if (aleph.nodeClicked == d.name) {
        aleph.nodeClicked = ''
        d3.selectAll('.node').classed('aleph-no-pointer-events', false)
      } else {
        aleph.nodeClicked = d.name

        // store detail of clicked node for future use/reference
        if (d3.select('#node-' + d.name).classed('SOURCE') || d3.select('#node-' + d.name).classed('TARGET')) {
          // if it is a technology node ...
          if (technologies[d.name].technology) {
            // determine technology clicked
            var techToUse = CharacterToCharacter(technologies[d.name].technology, ' ', '_')
            techToUse = CharacterToCharacter(techToUse, '-', '_')
            techToUse = CharacterToCharacter(techToUse, '/', '_')
          }

          // else, do nothing (no page opening on a cogn. challenge interaction)
          else {
            // console.log('you have clicked a cognitive challenge')
          }

          /// modify class name defintions of otehr soure and target nodes
          d3.selectAll('.node.SOURCE').classed('aleph-no-pointer-events', true)
          d3.selectAll('.node.TARGET').classed('aleph-no-pointer-events', true)
          d3.select(this).classed('aleph-no-pointer-events', false)
          d3.selectAll('.node.TARGET.source-' + d.name).classed('aleph-no-pointer-events ', false)
        } else {
          aleph.nodeClicked = d.name
        }
      }
      return
    })

  // append left subtitle to chart.
  d3.selectAll('.aleph-chart')
    .append('text')
    .attr('class', function () {
      var classStr = 'aleph-nodeCount counters challenges hideShow'
      if (aleph.toggleValue == 'source') {
        classStr = classStr + ' selected-side'
      }
      return classStr
    })
    .attr('id', 'arrow-left')
    .attr('x', aleph.margin.left - 10)
    .attr('y', aleph.margin.top - 20)
    .text(aleph.challengeNodeCount + ' Challenges')

  // append left arrow to chart.
  d3.selectAll('.aleph-chart')
    .append('svg:image')
    .attr('class', function () {
      var classStr = 'arrow arrow-left hideShow'
      if (aleph.toggleValue != 'source') {
        classStr = classStr + ' aleph-hide'
      }
      return classStr
    })
    .attr('id', 'arrow')
    .attr('xlink:href', `${rootPath}image/arrow.svg`)
    .attr('x', aleph.margin.left)
    .attr('y', 0)
    .attr('width', 25)

  // append text warning label to screen for instances where user modofies link weighting but resultant chart has no data to map.
  d3.selectAll('.aleph-container')
    .append('label')
    .attr('class', 'aleph-nodeCount aleph-noDataToChart aleph-hide')
    .text('Latest selection has no data to map. Chart display has returned to the previous chartable data selection')

  // append right subtitle to chart.
  d3.selectAll('.aleph-chart')
    .append('text')
    .attr('class', function () {
      var classStr = 'aleph-nodeCount counters technologies hideShow'
      if (aleph.toggleValue == 'target') {
        classStr = classStr + ' selected-side'
      }
      return classStr
    })
    .attr('id', 'arrow-right')
    .attr('x', aleph.windowWidth - aleph.margin.right + 30)
    .attr('y', aleph.margin.top - 20)
    .text(aleph.technologyNodeCount + ' Technologies')

  // append right arrow to chart.
  d3.selectAll('.aleph-chart')
    .append('svg:image')
    .attr('class', function () {
      var classStr = 'arrow arrow-right hideShow'
      if (aleph.toggleValue != 'target') {
        classStr = classStr + ' aleph-hide'
      }
      return classStr
    })
    .attr('id', 'arrow')
    .attr('xlink:href', `${rootPath}image/arrow.svg`)
    .attr('x', aleph.windowWidth - aleph.margin.right)
    .attr('y', 0)
    .attr('width', 25)

    console.log("random statement to force new push to master/origin")

  // append text label instruction user to click node rect...
  d3.selectAll('.aleph-chart')
    .append('text')
    .attr('class', 'aleph-Click-Instruction aleph-hide')
    .attr('id', 'aleph-Node-Click-Instruction')
    .attr('x', aleph.windowWidth - aleph.margin.right)
    .attr('y', aleph.margin.top + 20)
    .text('Click to fix/release chart link paths')

  // append text label instruction user to click node rect...
  d3.selectAll('.aleph-chart')
    .append('text')
    .attr('class', 'aleph-Click-Instruction aleph-hide')
    .attr('id', 'aleph-Icon-Click-Instruction')
    .attr('x', aleph.windowWidth)
    .attr('y', aleph.margin.top + 20)
    .text('Click to open Technology Information Page in a new window')

  // define user interaction with chart link paths.
  d3.selectAll('.aleph-nodeCount.counters').on('click', function () {
    d3.selectAll('.aleph-nodeCount.counters').classed('selected-side', false)

    d3.selectAll('.arrow-left').classed('aleph-hide', !d3.selectAll('.arrow-left').classed('aleph-hide'))
    d3.selectAll('.arrow-right').classed('aleph-hide', !d3.selectAll('.arrow-left').classed('aleph-hide'))

    d3.select(this).classed('selected-side', true)
    changeLinkBase(this)
  })

  // add the rectangles for the nodes
  node
    .append('svg:image')
    .attr('class', function (d) {
      if (aleph.sourceNodes.indexOf(d.name) == -1) {
        return 'aleph-techIcon FID' + d.name
      }
    })
    .attr('id', function (d) {
      return 'aleph-techIcon-' + d.name
    })
    .attr('xlink:href', function (d) {
      // define image folder/file path
      if (aleph.sourceNodes.indexOf(d.name) == -1) {
        return `${rootPath}image/svg/black/bFID${d.name}.svg`
      }
    })
    .attr('x', sankey.nodeWidth() + 35)
    .attr('y', 0)
    .attr('width', aleph.techIconImageSize)
    .attr('height', aleph.techIconImageSize)
    .on('mouseover', function () {
      d3.select('#aleph-Icon-Click-Instruction').classed('aleph-hide', false)
      return
    })
    .on('mouseout', function () {
      d3.select('#aleph-Icon-Click-Instruction').classed('aleph-hide', true)
      return
    })
    .on('click', function (d) {
      // determine page slug information
      var name = d.name
      var slug = ''
      technologiesFile.forEach(function (d, i) {
        var tech = d
        if (tech.id == name) {
          slug = d.slug
        }
      })

      // call function to open relted technology infrmation page in new browser window
      navFunc(slug)

      return
    })

  // add the rectangles for the nodes
  node
    .append('rect')
    .attr('class', function (d) {
      return 'aleph-nodeRect' + ' SOURCE-' + CharacterToCharacter(d.name, ' ', '_')
    })
    .attr('height', function (d) {
      return d.dy
    })
    .attr('width', sankey.nodeWidth())
    .style('fill', function (d) {
      // define fill colour of node rectangle
      if (aleph.sourceNodes.indexOf(d.name) != -1) {
        return color[aleph.leftNodeOrder.indexOf(d.name)]
      } else {
        return '#FFF'
      }
    })
    .style('stroke', function (d) {
      if (aleph.sourceNodes.indexOf(d.name) != -1) {
        return color[aleph.leftNodeOrder.indexOf(d.name)]
      } else {
        return '#000'
      }
    })
    .style('stroke-width', function (d) {
      return 1
    })
    .on('mouseover', function (d, i) {
      d3.select('#aleph-Node-Click-Instruction').classed('aleph-hide', false)
    })
    .on('mouseout', function (d, i) {
      d3.select('#aleph-Node-Click-Instruction').classed('aleph-hide', true)
    })

  // add in the title for the nodes
  node
    .append('text')
    .attr('class', 'aleph-nodeCountTitle')
    .attr('x', sankey.nodeWidth() + 5 + aleph.techIconImageSize)
    .attr('y', 12.5)
    .attr('dy', '.5em')
    .attr('text-anchor', 'start')
    .attr('transform', null)
    .text(function (d) {
      if (d.sourceLinks.length != 0) {
        return d.sourceLinks[0].challenge
      } else if (d.targetLinks.length != 0) {
        return technologies[d.name].technology
      }

      return d.name
    })
    .filter(function (d) {
      return d.x < aleph.chartWidth / 2
    })
    .attr('x', -15)
    .attr('y', 10)
    .attr('text-anchor', 'end')

  // the function for moving the nodes
  function dragmove(d) {
    d3.select(this).attr(
      'transform',
      'translate(' + d.x + ',' + (d.y = Math.max(0, Math.min(aleph.chartHeight - d.dy, d3.event.y))) + ')'
    )
    sankey.relayout()
    link.attr('d', path)
  }

  // add in the title for the nodes
  node
    .append('text')
    .attr('class', function (d) {
      var str = 'aleph-nodeCountNumber'
      if (d.x < aleph.chartWidth / 2) {
        str = str + ' source'
      } else {
        str = str + ' target'
      }
      return str
    })
    .attr('x', sankey.nodeWidth() * 1.5)
    .attr('y', 10)
    .attr('dy', '.5em')
    .attr('text-anchor', 'start')
    .attr('transform', null)
    .text(function (d) {
      return d.value
    })
    .filter(function (d) {
      return d.x < aleph.chartWidth / 2
    })
    .attr('x', -sankey.nodeWidth())
    .attr('y', 10)
    .attr('text-anchor', 'end')

  // the function for moving the nodes
  function dragmove(d) {
    d3.select(this).attr(
      'transform',
      'translate(' + d.x + ',' + (d.y = Math.max(0, Math.min(aleph.chartHeight - d.dy, d3.event.y))) + ')'
    )
    sankey.relayout()
    link.attr('d', path)
  }

  // wrap text labelling for cogn. challenge nodes (left bank)
  d3.selectAll('.node.SOURCE').selectAll('.aleph-nodeCountTitle').call(wrapText, 175, -60)

  // wrap text labelling for technology nodes (right bank)
  d3.selectAll('.node.TARGET')
    .selectAll('.aleph-nodeCountTitle')
    .call(
      wrapText,
      aleph.windowWidth - (aleph.windowWidth - aleph.margin.right) - (sankey.nodeWidth() + aleph.techIconImageSize),
      sankey.nodeWidth() + aleph.techIconImageSize + 45
    )

  // bring chart to front of page.
  var sel = d3.selectAll('.aleph-chart')
  sel.moveToFront()

  // if chart isa laoding for the irst tiem,. atach controls via function call.
  if (aleph.onload == true) {
    aleph.onload = false
    attachSVGControls()
  }

  // add/modify slider ticks and their numbering update main title to visual.
  var challengeFamily = challenges[aleph.sourceTechnologyArray[0].replace('FAMILY', '') + '_1'].family
  d3.selectAll('.aleph-mainTitle').text(challengeFamily)
  setSliderTicks('#slider-range')

  return
} // end function submitSelection

/*
    NAME: cursorCoords 
    DESCRIPTION: function called determine dynamically the current positioning of the cursor, and thus where to display toolip on event rectangle mouseover
    ARGUMENTS TAKEN: d: data infomration for interacted with node
                      x: x coordinate of mouse cursor
                      y: y coordinate of mouse cursor
    ARGUMENTS RETURNED: none
    CALLED FROM:submitSelection
    CALLS: none
    USEFULL: // https://stackoverflow.com/questions/16770763/mouse-position-in-d3
*/
function cursorCoords(d, x, y) {
  // remove all previously created instances of tooltip labels.
  d3.selectAll('.aleph-toolTipLabel').remove()
  d3.selectAll('.aleph-hmiToolTipChild-label').remove()

  // select tooltip base diuv and bring to front
  var sel = d3.selectAll('.aleph-hmiToolTip-Div')
  sel.moveToFront()

  // modify class definiton of tooltip 'g' element and current offset position based on mouse cursor position
  d3.selectAll('.aleph-hmiToolTip-Div')
    .classed('aleph-hide', false)
    .style('left', function () {
      if (x < aleph.chartWidth / 2) {
        return x + 15 + 'px' // left half
      } else {
        return x - aleph.toolTipDimensions.width - 15 + 'px' // right half
      }
    })
    .style('top', function () {
      if (y < aleph.chartHeight / 2) {
        return y /*  - 15  */ + 'px' // top half
      } else {
        return y - aleph.toolTipDimensions.height + 'px' // bottom half
      }
    })

  // initialise local variables
  var number = 0
  var string = ''
  var title = ''
  var listTitle = ''

  // if considered node has links related to it ...
  if (d.sourceLinks.length > 0) {
    title = challenges[d.name].family
    string = '<span>' + 'Challenge : ' + '</span>' + d.sourceLinks[0].challenge

    number = '<span>' + 'Number of related technologies: ' + '</span>' + d.sourceLinks.length
    listTitle = 'Technologies: '
  } else if (d.targetLinks.length > 0) {
    title = technologies[d.name].technology
    string = ''
    number = '<span>' + 'Number of related challenges: ' + '</span>' + d.targetLinks.length
    listTitle = 'Challenges: '
  }

  // update tooltip label content
  d3.selectAll('.aleph-hmiToolTipTitle-label').html(title)
  d3.selectAll('.aleph-hmiToolTipSubTitle-label').html(string)
  d3.selectAll('.aleph-hmiToolTipNumber-label').html(number)
  d3.selectAll('.aleph-hmiToolTipListTitle-label').html(listTitle)

  if (d.sourceLinks.length > 0) {
    d.sourceLinks.forEach(function (d, i) {
      d3.selectAll('.aleph-hmiToolTip-Div')
        .append('p')
        .attr('class', 'aleph-hmiToolTipChild-label')
        .text(i + 1 + '. ' + technologies[d.target.name].technology)
    })
  } else if (d.targetLinks.length > 0) {
    d.targetLinks.forEach(function (d, i) {
      d3.selectAll('.aleph-hmiToolTip-Div')
        .append('p')
        .attr('class', 'aleph-hmiToolTipChild-label')
        .text(i + 1 + '. ' + d.challenge)
    })
  } // end forEach loop.

  // bring tooltip to front
  var sel = d3.selectAll('.aleph-hmiToolTip-Div')
  sel.moveToFront()

  return
} // end function cursorCoords

/*
    NAME: wrapText 
    DESCRIPTION: function to wrap long lines to defined width. can be used for labels, strings, axis titles etc.
    ARGUMENTS TAKEN:  text
                      content_width
                      ttmargin
    ARGUMENTS RETURNED: none
    CALLED FROM: submitSelction
    CALLS: none
*/
function wrapText(text, content_width, ttmargin) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 20, // ems
      y = text.attr('y'),
      dy = 1,
      tspan = text.text(null).append('tspan').attr('x', ttmargin).attr('y', y).attr('dy', dy)

    while ((word = words.pop())) {
      line.push(word)

      tspan.text(line.join(' '))
      if (tspan.node().getComputedTextLength() > content_width) {
        line.pop()
        tspan.text(line.join(' '))
        line = [word]
        tspan = text
          .append('tspan')
          .attr('x', ttmargin)
          .attr('y', y)
          .attr('dy', ++lineNumber * lineHeight + dy)
          .text(word)

        vis.lineCount++
      }
    }
  })

  return
} // end function wrapText()

/*
    NAME: copyURL 
    DESCRIPTION: function called when user presses proxy button to 'copy' URL string made for selections made
    ARGUMENTS TAKEN:  none
    ARGUMENTS RETURNED: none
    CALLED FROM: index.hmtl
    CALLS: none
*/
function copyURL() {
  document.getElementById('aleph-url').value = aleph.url.slice(0, -1)
  $('.btn.aleph-technologyButton').prop('disabled', true).addClass('aleph-disabled').addClass('btn-danger')
  return
} // enf function copyURL

/*
    NAME: submitURL 
    DESCRIPTION: function called when user presses proxy button to 'submit' URL string made for selections made
    ARGUMENTS TAKEN:  none
    ARGUMENTS RETURNED: none
    CALLED FROM: index.hmtl
    CALLS: submitSelection
*/
function submitURL() {
  // https://support.clickmeter.com/hc/en-us/articles/211032666-URL-parameters-How-to-pass-it-to-the-destination-URL#:~:text=Any%20word%20after%20the%20question,about%20passing%20parameter%20through%20URL.

  // modify classnames of DOM elements to hide/show
  d3.selectAll('.aleph-exampleTechSelector').classed('aleph-hide', true)
  d3.selectAll('.aleph-chart').classed('aleph-hide', false)
  d3.selectAll('.aleph-controls').classed('aleph-hide', false)

  // cosntruct URL value string
  var url = document.getElementById('aleph-url').value
  url = url.replace('http://HMI-technologySelector.co.uk?', '').replace(':true', '')
  url = CharacterToCharacter(url, '=true', '')
  url = url.split('&')

  aleph.sourceTechnologyArray = url

  // call function to mimic submtting URL string of selections instead of selcting manually crtieria.
  submitSelection()

  return
} // end function submitURL

/*
    NAME: changeLinkBase 
    DESCRIPTION: function called flip the logical direction of source-target direction for highlighting sankey links and nodes
    ARGUMENTS TAKEN: button ; valued added information for button pressed
    ARGUMENTS RETURNED: none
    CALLED FROM: index.hmtl
    CALLS: none
*/
function changeLinkBase(button) {
  // if user has selected the left arrow/subtitle (challenges)
  if (button.id == 'arrow-left') {
    aleph.toggleValue = 'source'
  }

  // if user has selected the right arrow/subtitle (technologies)
  else {
    aleph.toggleValue = 'target'
  }

  return
} // end function changeLinkBase

/*
    NAME: switchWeightingType 
    DESCRIPTION: function called to switch Weighting Type of data displayed
    ARGUMENTS TAKEN: button ; valued added information for button pressed
    ARGUMENTS RETURNED: none
    CALLED FROM: gatsby code
    CALLS: transitionChart
*/
function switchWeightingType(button) {
  d3.selectAll('.aleph-sortButton').classed('aleph-selected-sort', false)

  // if user has selcted weighted button
  if (button.id == 'weighted') {
    aleph.dataWeighting = 'weighted'
    d3.select('#weighted').classed('aleph-selected-sort', true)
  }

  // if user has selcted binary button
  else {
    aleph.dataWeighting = 'binary'
    d3.select('#binary').classed('aleph-selected-sort', true)
  }

  // call function to transition update chart
  transitionChart()
  return
} // end function switchWeightingType

/*
    NAME: transitionChart 
    DESCRIPTION: function called to smoothly transition chart ebtween wieghted linbks and binary width links, and reorder technology nodes accordingly
    ARGUMENTS TAKEN: none
    ARGUMENTS RETURNED: none
    CALLED FROM: switchWeightingType
    CALLS: transitionChart
*/
function transitionChart() {
  graph.links.forEach(function (d, i) {
    graph.links[i].value = graph.links[i][aleph.dataWeighting]
  }) // end forEach

  // generate Sankey object
  sankey.nodes(graph.nodes).links(graph.links).layout(32)

  // select all link paths and transition
  d3.selectAll('.link.aleph-link')
    .transition()
    .duration(1250)
    .ease(d3.easeLinear)
    .attr('d', path)
    .style('stroke-width', function (d) {
      return Math.max(1, d.dy)
    })

  // select all chart node groups and transition
  d3.selectAll('.node')
    .transition()
    .duration(1250)
    .ease(d3.easeLinear)
    .attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')'
    })

  // selecte all the chart node reactangles and transition
  d3.selectAll('.aleph-nodeRect')
    .transition()
    .duration(1250)
    .ease(d3.easeLinear)
    .attr('height', function (d) {
      return d.dy
    })
    .attr('width', sankey.nodeWidth())

  // select all the chart node counter text and transition
  d3.selectAll('.node')
    .selectAll('.aleph-nodeCountNumber')
    .transition()
    .duration(625)
    .ease(d3.easeLinear)
    .style('opacity', 0.0)
    .transition()
    .duration(625)
    .ease(d3.easeLinear)
    .style('opacity', 1.0)
    .text(function (d) {
      return d.value
    })

  return
} // end function transitionChart

/*
    NAME: attachSVGControls 
    DESCRIPTION: function called top attach all SVG based contolrs at the onload point of chart
    ARGUMENTS TAKEN: none
    ARGUMENTS RETURNED: none
    CALLED FROM: subnmitSelection
    CALLS: switchWeightingType
*/
function attachSVGControls() {
  // append maintitle text
  d3.selectAll('.aleph-bannerSVGBase')
    .append('text')
    .attr('x', aleph.windowWidth / 2)
    .attr('y', 40)
    .attr('class', 'aleph-mainTitle')

  // append main base group element
  d3.selectAll('.aleph-bannerSVGBase')
    .append('g')
    .attr('class', 'aleph-sortButton-group-base')
    .attr('transform', 'translate(' + aleph.windowWidth / 2 + ',' + aleph.margin.top / 2 + ')')

  // append binary sort button
  d3.selectAll('.aleph-bannerSVGBase')
    .append('svg:image')
    .attr('class', 'aleph-sortButton aleph-selected-sort')
    .attr('id', 'binary')
    .attr('xlink:href', `${rootPath}image/binary.svg`)
    .attr('x', aleph.windowWidth / 2 - 350)
    .attr('y', 65)
    .attr('width', 350)
    .attr('height', 50)
    .on('click', function () {
      switchWeightingType(this)
    })
    .append('title')
    .text('All Links, Equally Weighted')

  // append weighted sort button
  d3.selectAll('.aleph-bannerSVGBase')
    .append('svg:image')
    .attr('class', 'aleph-sortButton')
    .attr('id', 'weighted')
    .attr('xlink:href', `${rootPath}image/weighted.svg`)
    .attr('x', aleph.windowWidth / 2 - 0)
    .attr('y', 65)
    .attr('width', 350)
    .attr('height', 50)
    .on('click', function () {
      switchWeightingType(this)
    })
    .append('title')
    .text('All Links, Weighted by Relevance')

  return
} // end function attachSVGControls

// Listen for scroll events
window.addEventListener(
  'scroll',
  function (event) {
    d3.selectAll('.scroll').classed('stopped', false).classed('moving', true)

    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling)

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function () {
      // Run the callback
      d3.selectAll('.scroll').classed('stopped', true).classed('moving', false)
    }, 50)
  },
  false
)

/*
    NAME: onscroll 
    DESCRIPTION: anonymous function to handle vertical user scrolling
    ARGUMENTS TAKEN:    ev: scorll event
    ARGUMENTS RETURNED: none
    CALLED FROM: on scrolling
    CALLS:  none

    http://bl.ocks.org/johangithub/97a186c551e7f6587878
*/
window.onscroll = function (ev) {
  if (window.scrollY == 0) {
    // you're at the TOP of the page
    // console.log("you're at the TOP of the page");
    d3.selectAll('.aleph-bannerSVGBase-rect').classed('aleph-isScrolling', false)
  } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    // you're at the BOTTOM of the page
    // console.log("you're at the BOTTOM of the page");
    d3.selectAll('.aleph-bannerSVGBase-rect').classed('aleph-isScrolling', true)
  } else {
    // you're in the MIDDLE of the page
    // console.log("you're at the MIDDLE of the page");
    d3.selectAll('.aleph-bannerSVGBase-rect').classed('aleph-isScrolling', true)
  }

  return
} // end function onscroll

d3.select('#slider-range').append('label').attr('id', 'lowRelevance').text('Low')
d3.select('#slider-range')
  .append('label')
  .attr('id', 'amount')
  .text('Strength of Relationship Between Cognitive Challenge and Technology')
d3.select('#slider-range').append('label').attr('id', 'highRelevance').text('High')

/*
    NAME: slider-range 
    DESCRIPTION: function called to attach and set up HTML slider to top of chart area
    ARGUMENTS TAKEN: none
    ARGUMENTS RETURNED: none
    CALLED FROM: HTML
    CALLS: submitSelection
*/
$(function () {
  $('#slider-range').slider({
    range: true,
    min: 1,
    max: 8,
    values: [1, 8],
    slide: function (event, ui) {
      aleph.thresholdLow = ui.values[0]
      aleph.thresholdHigh = ui.values[1]
      aleph.currentSliderRange = [aleph.thresholdLow, aleph.thresholdHigh]
      submitSelection()
    },
  })
  $('#amount').html('Strength of Relationship Between Cognitive Challenge and Technology')
})

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

/*
    NAME: setSliderTicks
    DESCRIPTION: function called to set slider ticks and labelling for HTML slider component
    ARGUMENTS TAKEN: none
    ARGUMENTS RETURNED: none
    CALLED FROM: HTML
    CALLS: submitSelection
*/
// https://www.sitepoint.com/community/t/custom-range-slider-with-ticks/319324
function setSliderTicks(el) {
  var $slider = $(el)
  var max = $slider.slider('option', 'max')
  var min = $slider.slider('option', 'min')
  var step = $slider.slider('option', 'step')
  var spacing = 100 / ((max - min) / step)

  // remove previuous ticks and labels before redrawing
  $slider.find('.ui-slider-tick-mark').remove()
  $slider.find('.ui-slider-tick-label').remove()

  for (var i = 0; i <= (max - min) / step; i++) {
    $('<span class="ui-slider-tick-mark"></span>')
      .css('left', spacing * i + '%')
      .appendTo($slider)

    $('<span class="ui-slider-tick-label"></span>')
      .text(Number(i + 1))
      .css('left', spacing * i + '%')
      .appendTo($slider)
  }
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
