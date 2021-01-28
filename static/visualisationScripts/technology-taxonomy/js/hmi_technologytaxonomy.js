/*
  Project: HMI Technology Taxonomy visualisation
  Filename: aleph_himTechnologyComparison.js
  Date built: September 2020 to October 2020
  Written By: James Bayliss (Data Vis Developer)
  Tech Stack: HTML5, CSS3, JS ES5/6, D3 (v5), JQuery 
*/

/* 
https://bl.ocks.org/d3noob/1dbf3d4abe0ab53f8c4c6bd24192bb6b // Tree diagram from csv using v4
https://bl.ocks.org/d3noob/43a860bc0024792f8803bba8ca0d5ecd // Collapsible tree diagram in v4
https://observablehq.com/@d3/collapsible-tree // D3 collapsible tree - d3 Observable

*/

// Initialisation of global 'aleph' object construct. Stores all main dynamic variables for UI design and response
var aleph = {
  url: 'http://HMI-technologySelector.co.uk?' /* text stub to add to to mimic building URL */,
  expandCollapseAll: true /* inintialisation variable to denot onload view of tree */,
  spacer: 100 /* interval integer value to define spacing between vertical tiers of tree */,
  numberOfLevels: 4 /* max number of levels allowed to be selected */,
  taxonomyArray: [] /* initialisation of array to store selected filter values in */,
  nodeLevelsY: [] /* flat array to store y-horizon coordiante values */,
  margin: {
    top: 75,
    right: 75,
    bottom: 25,
    left: 100,
  } /* basic main margins */,
  techIconImageSize: 32,
  displayToSelectedLevel: -1,
  lastSelectedLevelToDisplayTo: Infinity,
}

var i = 0 // iterator
var root // main base treemap variable element
var treemap // main base treemap variable element
var svg // main base SVG element
window.onresize = windowResize // function call based on browser window resize.

// DOM selection to handle onclick user incidents on controls panel
d3.selectAll('.aleph-background')
  .attr('rx', 15)
  .attr('ry', 15)
  .on('click', function () {
    if (d3.selectAll('.aleph-controls').classed('aleph-closeControls')) {
      d3.selectAll('.aleph-controls').classed('aleph-closeControls', false).classed('aleph-openControls', true)
    } else {
      d3.selectAll('.aleph-controls').classed('aleph-closeControls', true).classed('aleph-openControls', false)
    }

    // move controls to front of page
    var sel = d3.selectAll('.aleph-controls')
    sel.moveToFront()

    return
  })

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
  loadData() // function call to load initial CSV data file

  if (aleph.expandCollapseAll == false) {
    d3.select('#expand').classed('aleph-expandCollapseAll', true)
    d3.select('#collapse').classed('aleph-expandCollapseAll', true)
    d3.selectAll('.aleph-controls').classed('aleph-expandCollapseAll', true)
  } else {
    d3.select('#expand').classed('aleph-expandCollapseAll', false)
    d3.select('#collapse').classed('aleph-expandCollapseAll', false)
    d3.selectAll('.aleph-controls').classed('aleph-expandCollapseAll', false)
  }

  // store window dimensions as aleph object varaiables
  aleph.windowWidth = vis.width
  aleph.windowHeight = 2000 - aleph.margin.bottom - aleph.margin.top

  // update dimensions of base container DIV to size of browser window
  d3.selectAll('.aleph-container')
    .style('width', aleph.windowWidth + 'px')
    .style('height', Number(aleph.windowHeight + 50) + 'px')

  // update dimensions of base container SVG panel to size of browser window
  d3.selectAll('.aleph-chart')
    .attr('width', aleph.windowWidth)
    .attr('height', aleph.windowHeight + 50)

  /*
  Use the settings tab to select and submit up to three different categories for grouping technologies. This will produce a hierarchical taxonomy graph like the one below, allowing you to see how different technologies relate to one another.
  */
  // append example chart placeholder image
  d3.selectAll('.aleph-chart')
    .append('svg:image')
    .attr('class', 'aleph-map-image')
    .attr('xlink:href', `${rootPath}image/map.svg`)
    .attr('x', 150)
    .attr('y', 0)
    .attr('width', aleph.windowWidth - aleph.margin.left - aleph.margin.right)
    .attr('height', 900)

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
  // aleph.windowHeight = vis.height;
  aleph.windowHeight = 2000 - aleph.margin.bottom - aleph.margin.top

  // update dimensions of base container DIV to size of browser window
  d3.selectAll('.aleph-container')
    .style('width', aleph.windowWidth + 'px')
    .style('height', Number(aleph.windowHeight + 50) + 'px')

  // update dimensions of base container SVG panel to size of browser window
  d3.selectAll('.aleph-chart')
    .attr('width', aleph.windowWidth)
    .attr('height', aleph.windowHeight + 50)

  // recalculate width of chart timelines based on browser window width and defined margins.
  var width = aleph.windowWidth - aleph.margin.left - aleph.margin.right

  // define treemap variable dimensions
  treemap = d3.tree().size([aleph.windowHeight - aleph.margin.top - aleph.margin.bottom, aleph.windowWidth])

  // if root varible exists...
  // build root variable further ..
  if (root) {
    // Assigns parent, children, height, depth
    root = d3.hierarchy(aleph.treeData, function (d) {
      return d.children
    })
    root.x0 = aleph.windowHeight / 2
    root.y0 = 0

    aleph.spacer = aleph.windowWidth / (root.height + 2)
    aleph.nodeLevelsY = []
    update(root, 0)
    addLevelLabels(aleph.numberOfLevels)
  } else {
    d3.selectAll('.aleph-map-image').attr('width', aleph.windowWidth - aleph.margin.left - aleph.margin.right)
  }
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
  // store relevant file papth as local variable
  var inputDataFile = `${rootPath}data/taxonomy.csv`

  // store all input files as a Promise
  Promise.all([d3.csv(inputDataFile)]).then(function (data) {
    // locally store data
    techTaxonomy = data[0]
    aleph.techTaxonomy = techTaxonomy
  })

  return
} // end function loadData();

/*
      NAME: submitSelection 
      DESCRIPTION: function called to initially draw chart
      ARGUMENTS TAKEN: techTaxonomy
      ARGUMENTS RETURNED: none
      CALLED FROM: none
      CALLS:  none
*/
function submitSelection() {
  // update classes of relevant DOM objects.
  $('#clear').prop('disabled', false).removeClass('aleph-disabled')
  $('#expand').prop('disabled', false).removeClass('aleph-disabled')
  $('#collapse').prop('disabled', false).removeClass('aleph-disabled')

  // remove relevant DOM objects.
  d3.selectAll('.aleph-map-image').remove()
  d3.selectAll('.aleph-taxonomyTree').remove()

  /*
        NAME: rename 
        DESCRIPTION: function called to rename JSON object keys to desired names
        ARGUMENTS TAKEN: value - key name
        ARGUMENTS RETURNED: none
        CALLED FROM: submitSelection
        CALLS: none
  */
  function rename(value) {
    if (!value || typeof value !== 'object') return value
    if (Array.isArray(value)) return value.map(rename)
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [keys[k] || k, rename(v)]))
  }

  // key-value object to define requried JSON object names.
  var keys = {
    key: 'name',
    values: 'children',
    Title: 'name',
  }

  /*
        NAME: createNestingFunction 
        DESCRIPTION: recursive function to build requried JSON object
        ARGUMENTS TAKEN: propertyName - key name
        ARGUMENTS RETURNED: none
        CALLED FROM: submitSelection
        CALLS: none
  */
  function createNestingFunction(propertyName) {
    return function (d) {
      return d[propertyName]
    }
  }

  // https://stackoverflow.com/questions/22512853/d3-js-use-d3-nest-adding-keys-dynamically
  var levels = aleph.taxonomyArray.map(function (d, i) {
    return CharacterToCharacter(d.toLowerCase(), ' ', '_')
  })

  // generate D3 nest object based on data recursion
  var nest = d3.nest()
  for (var i = 0; i < levels.length; i++) {
    nest = nest.key(createNestingFunction(levels[i]))
  }

  // construct updarted strcutre for alpeh tree object
  aleph.treeData = {
    name: 'Taxonomy',
    children: rename(nest.entries(aleph.techTaxonomy)), //compute the nest
  }

  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  /* var */ svg = d3
    .select('.aleph-chart')
    .attr('width', aleph.windowWidth)
    .attr('height', aleph.windowHeight + 50)
    .append('g')
    .attr('class', 'aleph-taxonomyTree')
    .attr('id', 'aleph-taxonomyTree')
    .attr('transform', 'translate(' + aleph.margin.left + ',' + aleph.margin.top + ')')

  // remove all treemap horizon labels.
  d3.selectAll('.aleph-tree-levelLabels-g').remove()

  // reposition group element for all horizon labels
  svg
    .append('g')
    .attr('class', 'aleph-tree-levelLabels-g')
    .attr('transform', 'translate(' + 0 + ',' + -20 + ')')

  // declares a tree layout and assigns the size
  treemap = d3
    .tree()
    .size([
      aleph.windowHeight - aleph.margin.top - aleph.margin.bottom,
      aleph.windowWidth - aleph.margin.left - aleph.margin.right,
    ])

  // Assigns parent, children, height, depth
  root = d3.hierarchy(aleph.treeData, function (d) {
    return d.children
  })
  root.x0 = aleph.windowHeight / 2
  root.y0 = 0
  aleph.spacer = aleph.windowWidth / (root.height + 2)

  // call update function to build taxonomy tree
  update(root, 1250)

  // reinitialise URL string, and loop through array of selected elements to rebuild it.
  aleph.url = 'http://HMI-technologySelector.co.uk?'
  aleph.taxonomyArray.forEach(function (d, i) {
    aleph.url = aleph.url + CharacterToCharacter(d, ' ', '-') + '=true&'
  })

  // update classnames of URL related components
  $('.btn.aleph-copyUrl').prop('disabled', false).removeClass('aleph-disabled')
  $('.btn.aleph-submitUrl').prop('disabled', false).removeClass('aleph-disabled')

  aleph.taxonomyArray.push('Technology')
  aleph.taxonomyArray.unshift('Taxonomy')
  addLevelLabels(aleph.numberOfLevels)

  d3.selectAll('.aleph-tree-levelLabels-g')
    .selectAll('.aleph-tree-levelLabels-branch-g')
    .selectAll('.aleph-tree-levelLabel')
    .on('click', function () {
      return
    })

  return
} // end function submitSelection

/*
      NAME: buildTaxonomyArray 
      DESCRIPTION: function to build up flat array of technologies selected on proxy selection page.
      ARGUMENTS TAKEN: fid - button details
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS: none
*/
function buildTaxonomyArray(fid) {
  event.stopPropagation()

  // localise HTML content of [de]selected technology
  var buttonPressed = d3.select(fid)

  // dynamically modify CSS class declarations attached to all technology selection buttons
  buttonPressed.classed('aleph-btn-unselected', !buttonPressed.classed('aleph-btn-unselected'))

  // dynamically modify CSS class declarations attached to user-selected technology selection buttons
  buttonPressed.classed('aleph-btn-selected', !buttonPressed.classed('aleph-btn-selected'))

  // if user has DESELECTED a taxonomy field ...
  if (buttonPressed.classed('aleph-btn-unselected')) {
    const filterIndex = aleph.taxonomyArray.indexOf(fid.value)
    if (filterIndex > -1) {
      aleph.taxonomyArray.splice(filterIndex, 1)
    }

    // update text on button to suit current state
    d3.select(fid).text(toTitleCase(CharacterToCharacter(fid.value, '_', ' ')).replace('Of', 'of'))

    // loop through array and update dynamic order numbering
    aleph.taxonomyArray.forEach(function (d, i) {
      const filterIndex = aleph.taxonomyArray.indexOf(d)

      d3.select('#' + SpaceToCharacter(d, '-')).text(
        toTitleCase(CharacterToCharacter(d, '_', ' ')).replace('Of', 'of') + ' (' + Number(filterIndex + 1) + ')'
      )
    })
  }
  // else if user has SELECTED a taxonomy field
  else {
    aleph.taxonomyArray.push(fid.value)
    const filterIndex = aleph.taxonomyArray.indexOf(fid.value)
    d3.select(fid).text(
      toTitleCase(CharacterToCharacter(fid.value, '_', ' ')).replace('Of', 'of') + ' (' + Number(filterIndex + 1) + ')'
    )
  }

  // modify classnames if array is maximum legnth (disabled all other buttons)
  if (aleph.taxonomyArray.length == aleph.numberOfLevels) {
    $('.btn.aleph-btn-unselected').prop('disabled', true).addClass('aleph-disabled')
  } else {
    $('.btn.aleph-btn-unselected').prop('disabled', false).removeClass('aleph-disabled')
  }

  // if array is not populated ...
  if (aleph.taxonomyArray.length == 0) {
    $('#submit').prop('disabled', true).addClass('aleph-disabled').addClass('btn-danger').removeClass('btn-success')
    $('#clear').prop('disabled', true).addClass('aleph-disabled')
    $('#expand').prop('disabled', true).addClass('aleph-disabled')
    $('#collapse').prop('disabled', true).addClass('aleph-disabled')
  } else {
    $('#submit').prop('disabled', false).removeClass('aleph-disabled').removeClass('btn-danger').addClass('btn-success')
    $('#clear').prop('disabled', false).removeClass('aleph-disabled')
    $('#expand').prop('disabled', false).removeClass('aleph-disabled')
    $('#collapse').prop('disabled', false).removeClass('aleph-disabled')
  }

  return
} // end function buildTaxonomyArray

/*
      NAME: addLevelLabels 
      DESCRIPTION: function to add level labels to visual
      ARGUMENTS TAKEN: levelsToShow - number of levels to dislay labels for
      ARGUMENTS RETURNED: none
      CALLED FROM: update
      CALLS: wrapNodeLabels
*/
function addLevelLabels(levelsToShow) {
  // remvoe previously created label group
  d3.selectAll('.aleph-tree-levelLabels-branch-g').remove()

  d3.selectAll('.aleph-tree-levelLabels-g')
    .selectAll('.aleph-tree-levelLabels-branch-g')
    .data(aleph.nodeLevelsY)
    .enter()
    .append('g')
    .attr('class', function (d, i) {
      return 'aleph-tree-levelLabels-branch-g aleph-tree-levelLabels-branch-g-' + i
    })
    .attr('transform', function (d, i) {
      return 'translate(' + d + ',' + 0 + ')'
    })
    .on('click', function (d, i) {
      aleph.displayToSelectedLevel = i

      if (aleph.displayToSelectedLevel < aleph.lastSelectedLevelToDisplayTo) {
        root.children.forEach(collapseToSetLevel)
        collapseToSetLevel(root)
        update(root, 1250)
      } else if (aleph.displayToSelectedLevel > aleph.lastSelectedLevelToDisplayTo) {
        expandChart()

        root.children.forEach(collapseToSetLevel)
        collapseToSetLevel(root)
        update(root, 1250)
      } else {
      }

      return
    })
    .append('text')
    .attr('class', function (d, i) {
      return 'aleph-tree-levelLabel' + ' ' + CharacterToCharacter(aleph.taxonomyArray[i], ' ', '_')
    })
    .attr('x', 0)
    .attr('y', 0)
    .text(function (d, i) {
      return toTitleCase(CharacterToCharacter(aleph.taxonomyArray[i], '_', ' '))
    })

  // call function to wrap long node labels
  d3.selectAll('.aleph-tree-levelLabel').call(wrapNodeLabels, aleph.spacer, 0)

  return
} // function end addLevelLabels

/*
      NAME: clearChart 
      DESCRIPTION: function to clear current view.
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS: none
*/
function clearChart() {
  event.stopPropagation()

  // modify classes on relevant DOM content
  d3.selectAll('.btn.aleph-taxonomy-filter')
    .classed('aleph-btn-unselected', true)
    .classed('aleph-btn-selected', false)
    .classed('aleph-disabled', false)

  $('.btn').prop('disabled', false)

  // disable relevant DOM content
  $('#submit').prop('disabled', true).addClass('aleph-disabled').addClass('btn-danger').addClass('btn-success')
  $('#clear').prop('disabled', true).addClass('aleph-disabled')
  $('#expand').prop('disabled', true).addClass('aleph-disabled')
  $('#collapse').prop('disabled', true).addClass('aleph-disabled')

  // remove current taxomnomy tree from display
  d3.selectAll('.aleph-taxonomyTree').remove()

  // initialsie relevant arrays
  aleph.taxonomyArray = []
  aleph.nodeLevelsY = []

  // console.log('end of function statement')

  return
} // end function clearChart();

/*
      NAME: collapse 
      DESCRIPTION: function to collapse tree branch based on node click
      ARGUMENTS TAKEN: d
      ARGUMENTS RETURNED: none
      CALLED FROM: collapse, collapseAll
      CALLS: none
*/
function collapse(d) {
  if (d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
  return
} // end function collapse

/*
      NAME: collapseToSetLevel 
      DESCRIPTION: function to collapse tree branch based on taxonomic filter label
      ARGUMENTS TAKEN: d
      ARGUMENTS RETURNED: none
      CALLED FROM:  on click
      CALLS: collapseToSetLevel
*/
function collapseToSetLevel(d) {
  if (d.children && d.depth >= aleph.displayToSelectedLevel) {
    d._children = d.children
    d._children.forEach(collapseToSetLevel)
    d.children = null
  } else if (d.children) {
    d.children.forEach(collapseToSetLevel)
  }

  aleph.lastSelectedLevelToDisplayTo = aleph.displayToSelectedLevel

  return
} // end function collapseToSetLevel

/*
      NAME: update 
      DESCRIPTION: function to collapse tree branch based on node click
      ARGUMENTS TAKEN: source - var denoting how fucntion has been called
                      duration - duration of transtion (0 or 1250)
      ARGUMENTS RETURNED: none
      CALLED FROM: click, windowResize, update, expandAll, collapseAll, diagonal
      CALLS: addLevelLabels, click
*/
function update(source, duration) {
  // Assigns the x and y position for the nodes
  var treeData = treemap(root)

  // Compute the new tree layout.
  aleph.nodes = treeData.descendants()
  var links = treeData.descendants().slice(1)

  // initialise number of levels var
  // aleph.numberOfLevels = 0;

  // Normalize for fixed-depth.
  aleph.nodes.forEach(function (d, i) {
    d.y = d.depth * aleph.spacer
    if (aleph.nodeLevelsY.indexOf(Number(d.y)) == -1) {
      aleph.nodeLevelsY.push(Number(d.y))
    }
  })

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node').data(aleph.nodes, function (d) {
    return d.id || (d.id = ++i)
  })

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node
    .enter()
    .append('g')
    .attr('class', function (d, i) {
      return 'node'
    })
    .attr('transform', function (d) {
      return 'translate(' + source.y0 + ',' + source.x0 + ')'
    })
    .on('click', click)

  // Add Circle for the nodes
  nodeEnter
    .append('circle')
    .attr('class', function (d) {
      return d._children ? 'node aleph-hasChildren' : 'node'
    })
    .attr('r', function (d) {
      return d._children ? 1e-6 : 0
    })

  nodeEnter
    .append('svg:image')
    .filter(function (d) {
      return d.height == 0
    })
    .attr('class', function (d) {
      return 'aleph-techIcon FID' + d.data.FID
    })
    .attr('id', function (d) {
      return 'aleph-techIcon-' + d.data.FID
    })
    .attr('xlink:href', function (d) {
      if (!d.data.children) {
        return `${rootPath}image/svg/black/bFID${d.data.FID}.svg`
      }
    })
    .attr('x', 0)
    .attr('y', -aleph.techIconImageSize / 2)
    .attr('width', aleph.techIconImageSize)
    .attr('height', aleph.techIconImageSize)

  // Update the nodes...
  d3.selectAll('.aleph-techIcon').on('click', function (d) {
    navFunc(d.data['slug'])
    return
  })

  // Add labels for the nodes
  nodeEnter
    .append('text')
    .attr('class', 'aleph-nodeLabel')
    .attr('dy', '.35em')
    .attr('x', function (d) {
      if (d.data.children) {
        return 0
      } else {
        return aleph.techIconImageSize + 10
      }
    })
    .attr('y', function (d) {
      if (d.data.children) {
        return -20
      } else {
        return 0
      }
    })
    .attr('text-anchor', function (d) {
      if (d.data.children) {
        return 'middle'
      } else {
        return 'start'
      }
    })
    .text(function (d) {
      if (d.data.children) {
        return d.data.name
      } else {
        return d.data.title
      }
    })

  // Add labels for the nodes
  nodeEnter
    .append('text')
    .attr('class', 'aleph-nodeChildCountlabel')
    .attr('dy', '.35em')
    .attr('x', function (d) {
      return 0
    })
    .attr('y', function (d) {
      return 0
    })
    .attr('text-anchor', function (d) {
      return 'middle'
    })
    .text(function (d) {
      if (d.data.children) {
        return d.data.children.length
      }
    })

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node)

  // Transition to the proper position for the node
  nodeUpdate
    .transition()
    .duration(duration)
    .attr('transform', function (d) {
      return 'translate(' + d.y + ',' + d.x + ')'
    })

  // Update the node attributes and style
  nodeUpdate
    .select('circle.node')
    .attr('class', function (d, i) {
      return d._children ? 'node aleph-hasChildren' : 'node'
    })
    /*  .attr("r", 7.5) */
    .attr('r', function (d) {
      if (!d.data.children) {
        return 0
      } else {
        return 8
      }
    })
    .attr('cursor', 'pointer')

  // Remove any exiting nodes
  var nodeExit = node
    .exit()
    .transition()
    .duration(duration)
    .attr('transform', function (d) {
      return 'translate(' + source.y + ',' + source.x + ')'
    })
    .remove()

  // On exit reduce the node circles size to 0
  nodeExit.select('circle').attr('r', 1e-6)

  // On exit reduce the opacity of text labels
  nodeExit.select('text').style('fill-opacity', 1e-6)

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link').data(links, function (d) {
    return d.id
  })

  // Enter any new links at the parent's previous position.
  var linkEnter = link
    .enter()
    .insert('path', 'g')
    .attr('class', 'link')
    .attr('d', function (d) {
      var o = { x: source.x0, y: source.y0 }
      return diagonal(o, o)
    })

  // UPDATE
  var linkUpdate = linkEnter.merge(link)

  // Transition back to the parent element position
  linkUpdate
    .transition()
    .duration(duration)
    .attr('d', function (d) {
      return diagonal(d, d.parent)
    })

  // Remove any exiting links
  var linkExit = link
    .exit()
    .transition()
    .duration(duration)
    .attr('d', function (d) {
      var o = { x: source.x, y: source.y }
      return diagonal(o, o)
    })
    .remove()

  // Store the old positions for transition.
  aleph.nodes.forEach(function (d) {
    d.x0 = d.x
    d.y0 = d.y
  })

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {
    path = `M ${s.y} ${s.x}
        C ${(s.y + d.y) / 2} ${s.x},
          ${(s.y + d.y) / 2} ${d.x},
          ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
      d._children = d.children
      d.children = null
    } else {
      d.children = d._children
      d._children = null
    }
    update(d, 1250)
  }
} // end function click

// Toggle expand branch function
function expand(d) {
  var children = d.children ? d.children : d._children
  if (d._children) {
    d.children = d._children
    d._children = null
  }
  if (children) children.forEach(expand)
}

/*
      NAME: expandAll 
      DESCRIPTION: function to collapse entire tree
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: expandChart
      CALLS: collapse, update
*/
function expandAll() {
  expand(root)
  update(root, 1250)

  return
} // end function

/*
      NAME: collapseAll 
      DESCRIPTION: function to collapse entire tree
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: collapseChart
      CALLS: collapse, update
*/
function collapseAll() {
  root.children.forEach(collapse)
  collapse(root)
  update(root, 1250)

  return
} // end function collapseAll

/*
      NAME: expandChart 
      DESCRIPTION: function to expand entire tree Chart 
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS: expandAll
*/
function expandChart() {
  event.stopPropagation()
  expandAll()

  return
} // end function expandChart

/*
      NAME: collapseChart 
      DESCRIPTION: function to collapse entire tree Chart 
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS: expandAll
*/
function collapseChart() {
  event.stopPropagation()
  collapseAll()

  return
} // end function collapseChart

// function to wrap long lines to defined width. can be used for labels, strings, axis titles etc.
// https://bl.ocks.org/mbostock/7555321
function wrapNodeLabels(text, content_width, ttmargin) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 15 /*1.1*/, // ems
      y = text.attr('y'),
      dy = 15,
      tspan = text.text(null).append('tspan').attr('x', ttmargin).attr('y', y).attr('dy', dy /* + "em"*/)

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
} // end function wrapNodeLabels()

/*
      NAME: copyURL 
      DESCRIPTION: function to copy cosntructed URL string to text box readyfor submission
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS: none
*/
function copyURL() {
  event.stopPropagation()

  document.getElementById('aleph-url').value = aleph.url.slice(0, -1)
  $('.btn.aleph-technologyButton').prop('disabled', true).addClass('aleph-disabled').addClass('btn-danger')

  return
} // enf function copyURL

/*
      NAME: submitURL 
      DESCRIPTION: function to copy constructed URL string to text box ready for submission
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS: CharacterToCharacter, submitSelection
*/
function submitURL() {
  // https://support.clickmeter.com/hc/en-us/articles/211032666-URL-parameters-How-to-pass-it-to-the-destination-URL#:~:text=Any%20word%20after%20the%20question,about%20passing%20parameter%20through%20URL.

  d3.selectAll('.aleph_exampleTechSelector').classed('aleph-hide', true)
  d3.selectAll('.aleph-chart').classed('aleph-hide', false)
  d3.selectAll('.aleph-controls').classed('aleph-hide', false)

  var url = document.getElementById('aleph-url').value
  url = url.replace('http://HMI-technologySelector.co.uk?', '').replace(':true', '')
  url = CharacterToCharacter(url, '=true', '')
  url = url.split('&')

  submitSelection()

  return
} // end function submitURL
