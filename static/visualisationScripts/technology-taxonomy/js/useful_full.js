vis = {}

function getIso2(input, i) {
  var accessor = 'Common Name'
  var c = countryData.filter(function (d) {
    return d[accessor].toLowerCase() == input.toLowerCase()
  })

  var iso2 = c[0]['ISO 3166-1 2 Letter Code']
  return iso2
}

function getIso3(input, i) {
  var accessor = 'Common Name'

  if (input.toLowerCase() == 'usa') input = 'United States'
  if (input.toLowerCase() == 'cote divoire') input = "Cote d'Ivoire"
  if (input.toLowerCase() == 'gambia') input = 'Gambia, The'
  if (input.toLowerCase() == 'saint kitts  nevis') input = 'Saint Kitts and Nevis'
  if (input.toLowerCase() == 'czech') input = 'Czech Republic'
  if (input.toLowerCase() == 'guineabissau') input = 'Guinea-Bissau'
  if (input.toLowerCase() == 'congo dem rep') input = 'Congo'
  if (input.toLowerCase() == 'congo rep') input = 'Congo, (Congo Â– Brazzaville)'
  if (input.toLowerCase() == 'sao tome  principe') input = 'Sao Tome and Principe'
  if (input.toLowerCase() == 'turks and caicos is') input = 'Turks and Caicos Islands'
  if (input.toLowerCase() == 'dominican') input = 'Dominican Republic'
  if (input.toLowerCase() == 'sint maarten') input = 'Saint Kitts and Nevis'
  if (input.toLowerCase() == 'timorleste') input = 'Timor-Leste'
  if (input.toLowerCase() == 'virgin islands us' || input.toLowerCase() == 'virgin islands, u.s.')
    input = 'U.S. Virgin Islands'
  if (input.toLowerCase() == 'n mariana is') input = 'Northern Mariana Islands'
  if (input.toLowerCase() == 'virgin islands british' || input.toLowerCase() == 'virgin islands, british')
    input = 'British Virgin Islands'
  if (input.toLowerCase() == 'antigua  barbuda') input = 'Antigua and Barbuda'
  if (input.toLowerCase() == 'cabo verde') input = 'Cape Verde'
  if (input.toLowerCase() == 'aland islands') {
    input = 'Aland'
  }
  if (input == 'Åland Islands') {
    input = 'Aland'
  }
  if (input.toLowerCase() == 'st vincent  grenadines') input = 'Saint Vincent and the Grenadines'
  if (input.toLowerCase() == 'palestine') return
  if (input.toLowerCase() == 'unknown') return
  if (input.toLowerCase() == 'sao tome  principe' || input.toLowerCase() == 'sao tome') input = 'Sao Tome and Principe'
  if (input == 'CURAÃ‡AO' || input == 'Curaã‡ao' || input.toLowerCase() == 'curaçao') return
  if (input.toLowerCase() == 'viet nam') input = 'Vietnam'
  if (input.toLowerCase() == 'congo dem. rep.') input = 'Congo'
  if (input.toLowerCase() == 'korea, south') input = 'South Korea'
  if (input.toLowerCase() == "korea, democratic people's republic of") input = 'North Korea'
  if (input.toLowerCase() == 'korea, republic of') input = 'South Korea'
  if (input.toLowerCase() == 'kosovo') input = 'Kosovo'
  if (input.toLowerCase() == 'bolivia, plurinational state of') {
    input = 'Bolivia'
  }
  if (input.toLowerCase() == 'brunei darussalam') {
    input = 'Brunei'
  }
  if (input.toLowerCase() == "côte d'ivoire") {
    input = "Cote d'Ivoire"
  }
  if (input.toLowerCase() == 'congo, the democratic republic of the') {
    input = 'Congo'
  }
  if (input.toLowerCase() == 'falkland islands (malvinas)') {
    input = 'Falkland Islands (Islas Malvinas)'
  }
  if (input.toLowerCase() == 'french guyana') {
    input = 'French Guiana'
  }
  if (input.toLowerCase() == 'micronesia, federated states of') {
    input = 'Micronesia'
  }
  if (input.toLowerCase() == 'cocos islands') {
    input = 'Cocos (Keeling) Islands'
  }
  if (input.toLowerCase() == 'iran, islamic republic of') {
    input = 'Iran'
  }
  if (input.toLowerCase() == 'siachen glacier') return
  if (input.toLowerCase() == 'macao') {
    input = 'Macau'
  }
  if (input.toLowerCase() == 'saint martin (french part)') {
    input = 'Saint Martin'
  }
  if (input.toLowerCase() == 'moldova, republic of') {
    input = 'Moldova'
  }
  if (input.toLowerCase() == 'macedonia, the former yugoslav republic of') {
    input = 'Macedonia'
  }
  if (input.toLowerCase() == 'palestine, state of') return
  if (input.toLowerCase() == 'pitcairn') return
  if (input.toLowerCase() == 'western sahara') return
  if (input.toLowerCase() == 'south georgia and the south sandwich islands') return
  if (input.toLowerCase() == 'saint helena, ascension and tristan da cunha') return
  if (input.toLowerCase() == 'sint maarten (dutch part)') return
  if (input.toLowerCase() == 'taiwan, province of china') {
    input = 'Taiwan'
  }
  if (input.toLowerCase() == 'tanzania, united republic of') {
    input = 'Tanzania'
  }
  if (input.toLowerCase() == 'venezuela, bolivarian republic of') {
    input = 'Venezuela'
  }

  var c = countryData.filter(function (d) {
    return d[accessor].toLowerCase() == input.toLowerCase()
  })

  if (c.length == 0) {
    accessor = 'Formal Name'
    c = countryData.filter(function (d) {
      return d[accessor].toLowerCase() == input.toLowerCase()
    })
  }
  var iso3 = c[0]['ISO 3166-1 3 Letter Code']
  return iso3
}

function getName(input, i) {
  var accessor = 'ISO 3166-1 2 Letter Code'
  if (input.length == 3) accessor = 'ISO 3166-1 3 Letter Code'

  var c = countryData.filter(function (d) {
    return d[accessor].toLowerCase() == input.toLowerCase()
  })

  var name = c[0]['Common Name']

  return name
}

function getGeoRegion(input, i) {
  var accessor = 'Common Name'

  if (input.toLowerCase() == 'usa') input = 'United States'
  if (input.toLowerCase() == 'cote divoire') input = "Cote d'Ivoire"
  if (input.toLowerCase() == 'gambia') input = 'Gambia, The'
  if (input.toLowerCase() == 'saint kitts  nevis') input = 'Saint Kitts and Nevis'
  if (input.toLowerCase() == 'czech') input = 'Czech Republic'
  if (input.toLowerCase() == 'guineabissau') input = 'Guinea-Bissau'
  if (input.toLowerCase() == 'congo dem rep') input = 'Congo'
  if (input.toLowerCase() == 'congo rep') input = 'Congo, (Congo Â– Brazzaville)'
  if (input.toLowerCase() == 'sao tome  principe') input = 'Sao Tome and Principe'
  if (input.toLowerCase() == 'turks and caicos is') input = 'Turks and Caicos Islands'
  if (input.toLowerCase() == 'dominican') input = 'Dominican Republic'
  if (input.toLowerCase() == 'sint maarten') input = 'Saint Kitts and Nevis'
  if (input.toLowerCase() == 'timorleste') input = 'Timor-Leste'
  if (input.toLowerCase() == 'virgin islands us') input = 'U.S. Virgin Islands'
  if (input.toLowerCase() == 'n mariana is') input = 'Northern Mariana Islands'
  if (input.toLowerCase() == 'virgin islands british') input = 'British Virgin Islands'
  if (input.toLowerCase() == 'antigua  barbuda') input = 'Antigua and Barbuda'
  if (input.toLowerCase() == 'cabo verde') input = 'Cape Verde'
  if (input.toLowerCase() == 'aland islands') input = 'Aland'
  if (input.toLowerCase() == 'st vincent  grenadines') input = 'Saint Vincent and the Grenadines'
  if (input.toLowerCase() == 'palestine') return
  if (input.toLowerCase() == 'unknown') return
  if (input.toLowerCase() == 'sao tome  principe' || input.toLowerCase() == 'sao tome') input = 'Sao Tome and Principe'
  if (input.toLowerCase() == 'korea') input = 'South Korea'
  if (input.toLowerCase() == 'russian federation') input = 'Russia'
  if (input.toLowerCase() == 'puerto rico') input = 'united states'
  if (input.toLowerCase() == 'usa') input = 'united states'

  var c = countryData.filter(function (d) {
    return d[accessor].toLowerCase() == input.toLowerCase()
  })

  if (c.length == 0 || c == '') {
    return 'undefined'
  }

  var iso3 = c[0]['Geo Region']
  return iso3
}

function getGeoRegion_usingISO3(input, i) {
  //var accessor = 'Common Name';
  var accessor = 'ISO 3166-1 3 Letter Code'

  var c = countryData.filter(function (d) {
    return d[accessor].toLowerCase() == input.toLowerCase()
  })
  if (c.length == 0 || c == '') {
    return 'undefined'
  }
  var geoRegion = c[0]['Geo Region']

  return geoRegion
}

//function to convert text string tooProperCase ... a.k.a. Sentence/Title Case
String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

//function to return random point in a circle's circumference
function getRandomPoint(radius) {
  var angle = Math.random() * Math.PI * 2
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
}

//function to return inverse of the supplied hexcode color
function invertColour(color) {
  return '#' + ('000000' + (0xffffff ^ parseInt(color.substring(1), 16)).toString(16)).slice(-6)
}

// Random color generator in JavaScript
function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
} // end getRandomColor()

// add comma seperators to numebrs over/under +/-999
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function SpaceToHyphen(str) {
  // the str can be undefined, in this case return nothing
  if (str === undefined) {
    return
  } else {
    return str.split(' ').join('-')
  }
}

function HyphenToSpace(str) {
  return str.split('-').join(' ')
} // end function HyphenToSpace

function CharacterToSpace(str, char) {
  return str.split(char).join(' ')
} // end function CharacterToSpace

function SpaceToCharacter(str, char) {
  return str.split(' ').join(char)
} // end function SpaceToCharacter

function CharacterToCharacter(str, char1, char2) {
  return str.split(char1).join(char2)
} // end function CharacterToCharacter

function toTitleCase(str) {
  if (str == 'USA') {
    return 'United States'
  }

  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
} //end function toTitleCase(str)

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
} // end function toTitleCase

String.prototype.trunc = function (n, useWordBoundary) {
  if (this.length <= n) {
    return this
  }
  var subString = this.substr(0, n - 1)
  return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + '...'
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

// function to wrap long lines to defined width. can be used for labels, strings, axis titles etc.
function wrap(text, content_width, ttmargin) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 10 /*1.1*/, // ems
      y = text.attr('y'),
      dy = 1,
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
} // end function wrap()

function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i)
  }
  return indexes
}

function compareStrings(a, b) {
  // Assuming you want case-insensitive comparison
  a = a.toLowerCase()
  b = b.toLowerCase()

  return a < b ? -1 : a > b ? 1 : 0
}

function findDeviceOrientation() {
  if (window.innerHeight > window.innerWidth) {
    console.log('this is portrait!')
    return 'portrait'
  } else {
    console.log('this is landscape!')
    return 'landscape'
  }
} // end function findDeviceOrientation()

// browser window screen widths and heights
// https://andylangton.co.uk/blog/development/get-viewportwindow-size-width-and-height-javascript
// http://ryanve.com/lab/dimensions/

//	If you are using jQuery, you can get the size of the window or the document using jQuery methods:
//
//	$(window).height();   // returns height of browser viewport
//	$(document).height(); // returns height of HTML document (same as pageHeight in screenshot)
//	$(window).width();   // returns width of browser viewport
//	$(document).width(); // returns width of HTML document (same as pageWidth in screenshot)
//	For screen size you can use the screen object in the following way:
//
//	screen.height;
//	screen.width;

// online world boundaries...
// works with ... .datum(topojson.feature(world, world.objects.land))
// https://gist.githubusercontent.com/abenrob/787723ca91772591b47e/raw/8a7f176072d508218e120773943b595c998991be/world-50m.json

vis = {}

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

function splitToLocationsSent(data, countryFrom) {
  var destinationCountries = []

  data.forEach(function (d, i) {
    var locationTo = d
    var index = locationTo.lastIndexOf('~')
    var destinationCountry = locationTo.substring(index + 2, locationTo.length)

    if (
      destinationCountries.indexOf(destinationCountry) == -1 &&
      destinationCountry != '' &&
      destinationCountry != countryFrom
    ) {
      destinationCountries.push(destinationCountry)
    }
  })

  return destinationCountries
} // end function splitToLocationsSent()

function BrowserDetection() {
  //Check if browser is IE
  if (navigator.userAgent.search('MSIE') >= 0) {
    vis.browser = 'MSIE'
  }
  //Check if browser is Chrome
  else if (navigator.userAgent.search('Chrome') >= 0) {
    vis.browser = 'Chrome'
  }
  //Check if browser is Firefox
  else if (navigator.userAgent.search('Firefox') >= 0) {
    vis.browser = 'Firefox'
  }
  //Check if browser is Safari
  else if (navigator.userAgent.search('Safari') >= 0) {
    vis.browser = 'Safari'
  }
  //Check if browser is Opera
  else if (navigator.userAgent.search('Opera') >= 0) {
    vis.browser = 'Opera'
  }

  return vis.browser
}
alertSize()
BrowserDetection()
console.log('Browser is: ' + vis.browser)
console.log('Width = ' + vis.width, 'Height = ' + vis.height)
