# COMPODOC README
## Introduction
This document will assist in working with Compodoc by providing annotation reference with examples. Also, will provide guidelines in developing specific comments to be imported into Compodoc.  This document references the following links:

https://compodoc.app/guides/comments.html
https://compodoc.app/guides/jsdoc-tags.html
https://theyosh.nl/speeltuin/dash/dash.js-2.0.0/build/jsdoc/jsdoc_cheat-sheet.pdf

##  Inserting a Comment 
   /**    Begins the comment 
    *    Starts each new line of a comment
    *   (Blank line) Between each line
    *  Start second line
*/      Ends the comment
Example:  
			/ ** 
			* Returns an Image Object that can be painted on the screen
			* 
			*  The url argument must specify an absolute (@link url). The name
			* 
			* argument is a specifier that is relative to the url argument.
			* <p>
			* 
			* This method always returns immediately, whether or not the
			* 
			* image exists. When this applet attempts to draw the image on
			* 
			* the screen, the data will be loaded. The graphics primitives
			* 
			* that draw the image will incrementally paint on the screen.
			* 
			* [@param] url  an absolute URL giving the base location of the image
			* /
			function processTarget(target:string):number;
###  Common JSDOC Tags
	@returns {Type} Description  Ex: @returns {string} The process target number
	@param {Type} Description  Ex: @param {string} target The process target number
	@ignore (indicates that a symbol in your code should bnnever appear in the documentation) Ex: /** @ignore */
	@example (for giving an example on directives, components and pipe decorators  Ex: /** @example * This is a good example processtargert('yo) */

  Refer to reference for additional JsDoc Tags:
  https://theyosh.nl/speeltuin/dash/dash.js-2.0.0/build/jsdoc/jsdoc_cheat-sheet.pdf


