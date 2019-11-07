var g = null;

if (typeof window !== 'undefined') {
    g = window
} else if (typeof global !== 'undefined') {
    g = global
} else if (typeof self !== 'undefined') {
    g = self
} else if (this) {
    g = this
} else {
    g = {}
}

var window;

if (typeof window !== 'undefined') {
  window = window
} else {
  window = {
    // Checks for this to see if touch events should be enabled
    ontouchstart: null,
    addEventListener: function(eventName, eventFunction) {
		console.log('window.addEventListener for ' + eventName)
    }
  }
  
  // HACK! Put window on global object for node_modules we depend on
  g.window = window
}



function addClientCoordsToEvent(event) {
  event.clientX = event.x
  event.clientY = event.y
}

if (!g.TouchEvent) {
  g.TouchEvent = function TouchEvent(event) {
    Object.assign(this, event)
    this.touches.forEach(addClientCoordsToEvent)
    this.changedTouches.forEach(addClientCoordsToEvent)
  }

}
if (!g.MouseEvent)
{
  g.MouseEvent = function MouseEvent(event) {
    Object.assign(this, event)
    this.touches.forEach(addClientCoordsToEvent)
    this.changedTouches.forEach(addClientCoordsToEvent)
  }
}


// Checks for this to see if touch events should be enabled
window.ontouchstart = null

var navigator = {
    platform: 'iPhone',
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
    msPointerEnabled: false,
}

if (g.navigator) {
    navigator = g.navigator;
}

if (!window.navigator) {
    window.navigator = navigator
}

console.log('>>> new window')
console.log(window)

function Document() { }

Document.prototype.createElement = function(elementName) {
	console.log('Create Element ' + elementName)
	return {
	    getContext: function(contextType) {
	        console.log('getContext ' + contextType)
	        return {
	            fillStyle: function() {},
	            fillRect: function() {},
	            drawImage: function() {},
	            getImageData: function() {},
	        }
	    },
	    style: {},
	}
};

Document.prototype.addEventListener = function(eventName, eventFunction) {
    console.log('doc.addEventListener for ' + eventName)
}


var document = new Document();

if (window.document) {
  document = window.document
} else {
  document = new Document();
  window.document = document
}


// module.exports = {
//     window,
//     navigator,
//     document: null,
//     TouchEvent: g.MouseEvent,
//     MouseEvent: g.MouseEvent,
//     global: g
// }

module.exports = {
    window: window,
    navigator: navigator,
    document: document,
    TouchEvent: g.MouseEvent,
    MouseEvent: g.MouseEvent,
    global: g
}
