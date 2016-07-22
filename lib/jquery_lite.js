/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DomNodeCollection = __webpack_require__(1);

	window.$l = function (selector){
	  
	  // string (selector)
	  // function (dom content loaded)
	  // html element
	  // console.log(document.querySelectorAll(selector).constructor);
	  if((typeof selector) === "string"){
	    let domNodeCollection = DomNodeCollection.constructFromString(selector);
	    return domNodeCollection;











	  } else if ((typeof selector) === "function"){
	    console.log('is function');


	  } else if(selector instanceof HTMLElement){
	    let domNodeCollection = DomNodeCollection.constructFromHTML(selector);
	    return domNodeCollection;

	  } else {
	    throw "error";
	  }


	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	function DomNodeCollection(nodeArray) {
	  this.nodeArray = nodeArray;
	}

	DomNodeCollection.prototype.test = function() {
	};

	DomNodeCollection.constructFromString = function(string) {
	  var nodeList  = document.querySelectorAll(string),
	      nodeArray = Array.from(nodeList);
	  return new DomNodeCollection(nodeArray);
	};

	DomNodeCollection.constructFromHTML = function(htmlElement) {
	  var nodeArray = [htmlElement];
	  return new DomNodeCollection(nodeArray);
	};

	DomNodeCollection.prototype.html = function(string) {
	  if (this.nodeArray.length === 0) {
	    throw "can't work with html for empty DOMNodeCollection";
	  }

	  if (string === undefined) {
	    return this.nodeArray[0].innerHTML;
	  } else if (string){
	    this.nodeArray.forEach( function(htmlElement, index) {
	      htmlElement.innerHTML = string;
	    });

	    return this;
	  }
	};

	DomNodeCollection.prototype.empty = function(){
	  this.nodeArray.forEach(function(node){
	    node.innerHTML = "";

	  });
	  this.nodeArray = [];
	  return this;
	};

	DomNodeCollection.prototype.append = function(passedInArgument){
	  // string
	  // DOM nodeCollection
	  // HTML element
	  if(    (typeof passedInArgument) === "string"    ){
	    this.nodeArray.forEach(function(htmlElement, index) {
	      let currentInnerHTML = htmlElement.innerHTML;
	      htmlElement.innerHTML = currentInnerHTML + passedInArgument;
	    }.bind(this));




	  } else if (passedInArgument instanceof HTMLElement) {
	    // find duplicating method


	    this.nodeArray.forEach(function(htmlElement, index) {
	      let clonedNodeInAllItsGlory = passedInArgument.cloneNode(true);
	      htmlElement.appendChild(clonedNodeInAllItsGlory);
	    }.bind(this));


	    console.log("its an HTMLElement!");



	  } else if (passedInArgument instanceof DomNodeCollection) {

	    this.nodeArray.forEach(function(htmlElement, index, array) {

	      // let clonedArgument = htmlElement.cloneNode(true);
	      passedInArgument.nodeArray.forEach(function(htmlElementToAppend, index, subarray) {
	        // debugger
	        let clonedNode = htmlElementToAppend.cloneNode(true);
	        //   console.log(clonedNode + "hello");
	        htmlElement.appendChild(clonedNode);

	      }.bind(this));

	    }.bind(this));


	    // attach all nodes
	    console.log("its a DomNodeCollection!");
	  } else {
	    console.log("oh noesss!");
	  }


	  return this;
	};





















	DomNodeCollection.prototype.attr = function(attributeName, newAttributeValue){
	  if (this.nodeArray.length === 0) {
	    return this;
	  }

	  if (newAttributeValue === undefined) {
	      let firstHTMLElement = this.nodeArray[0];
	      return firstHTMLElement.getAttribute(attributeName);
	  } else {
	    this.nodeArray.forEach(function(htmlElement, index, array) {
	      htmlElement.setAttribute(attributeName, newAttributeValue);
	    }.bind(this));
	  }

	};

	DomNodeCollection.prototype.addClass = function(newClassName)  {
	  this.nodeArray.forEach(function (htmlElement) {
	    let oldClassNames = htmlElement.className,
	        newClassNames = oldClassNames + " " + newClassName;

	        htmlElement.className = newClassNames;
	  });
	};

	DomNodeCollection.prototype.removeClass = function(classNameToRemove)  {
	  this.nodeArray.forEach(function (htmlElement) {
	    let oldClassNames = htmlElement.className.split(" ");

	    if (oldClassNames.length === 0 || !oldClassNames.includes(classNameToRemove) ) {
	      console.log("class already removed");
	      return this;
	    } else {
	      let locationToDelete = oldClassNames.indexOf(classNameToRemove);
	      oldClassNames.splice(locationToDelete, 1);
	      htmlElement.className = oldClassNames;
	    }



	  });
	};



	module.exports = DomNodeCollection;


/***/ }
/******/ ]);