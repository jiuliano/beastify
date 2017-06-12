/*
beastify():
* removes every node in the document.body,
* then inserts the chosen beast
* then removes itself as a listener
*/
function beastify(request, sender, sendResponse) {
  // removeEverything();
  // insertBeast(request.beastURL);
  switch ( request.selection ) {
      case "Frog":
          cleanUrl("");
          break;
      case "Turtle":
          cleanUrl("?isDebug=1");
          break;
      case "Snake":
          break;
  }
  browser.runtime.onMessage.removeListener(beastify);
}

/*
Clean URL
*/
function cleanUrl(andAlso) {
    if (history.pushState) {
    	re = /B0[0-9][A-Za-z0-9]{7}/i //regex for ASIN
    	path = window.location.pathname
    	found = path.match(re); //returns asin found in URL

      	if(found) {
            alert("found it");
      	    var newurl = window.location.protocol + "//" + window.location.host + "/dp/" + found[0] + andAlso;
            window.location = newurl;
      	    // window.history.pushState({path:newurl},'',newurl);
      	} else {
            alert("did not find it: " + path);
            /*
      		l = path.split("/").length-1
      		y = path.split("/").slice(0,l)
      		x = y.join("/")
      		var newurl = window.location.protocol + "//" + window.location.host + x;
      		window.history.pushState({path:newurl},'',newurl);
            */
      	}
    }
}
/*
Remove every node under document.body
*/
function removeEverything() {
  while (document.body.firstChild) {
    document.body.firstChild.remove();
  }
}

/*
Given a URL to a beast image, create and style an IMG node pointing to
that image, then insert the node into the document.
*/
function insertBeast(beastURL) {
  var beastImage = document.createElement("img");
  beastImage.setAttribute("src", beastURL);
  beastImage.setAttribute("style", "width: 100vw");
  beastImage.setAttribute("style", "height: 100vh");
  document.body.appendChild(beastImage);
}

/*
Assign beastify() as a listener for messages from the extension.
*/
browser.runtime.onMessage.addListener(beastify);
