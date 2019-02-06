//this is how we can include all of our js files 

function dynamicallyLoadScript(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL

    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

//must load in the order of dependence ie t=things on top are visible to files below
dynamicallyLoadScript("character.js")

//main game file --this should probably be lowest
dynamicallyLoadScript("game.js")