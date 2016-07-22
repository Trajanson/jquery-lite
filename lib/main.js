const DomNodeCollection = require('./dom_node_collection.js');

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
