/*! Built with http://stenciljs.com */
App.loadBundle("chunk-af2d1071.js",["exports"],function(n){window.App.h;var o="SET_REQUEST_ERROR";function t(n){return{type:o,error:n}}n.searchBooks=function(n){return function(o){o({type:"START_SEARCH"});var e="https://www.googleapis.com/books/v1/volumes?q="+n.split("").join("+")+"&maxResults=40";fetch(e).then(function(n){return n.json()},function(){return o(t("An unexpected problem occured"))}).then(function(n){n.items?o({type:"SET_BOOKS",items:n.items}):o(t("No results..."))})}},n.START_SEARCH="START_SEARCH",n.SET_REQUEST_ERROR=o,n.SET_BOOKS="SET_BOOKS",n.SAVE_BOOK="SAVE_BOOK",n.saveBook=function(n){return function(o){o({type:"SAVE_BOOK",book:n})}},n.REMOVE_BOOK="REMOVE_BOOK",n.removeBook=function(n){return function(o){return o({type:"REMOVE_BOOK",book:n})}}});