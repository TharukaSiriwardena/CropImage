# CropImage Plugin
Image Editor for TinyMCE

##Plugin directory structure

This project contains files and folders. The structure of the contents of this folder is outlined below:

##Build/
This contains ‘jquery.Image-Editor.js’ file.

Variable 
$ - jQuery

Functions | Summary
----------|--------
ImageEditor() 	 		| all the variables and functions declared inside of this function.
input()		 		| get the HTML "input" tag
div()  			 	| get the HTML "div"  tag
a()  		 		| get the HTML "a" tag
img()  		 		| get the HTML "img"  tag
removeAreaSelect()  		| remove the selected area of the image
cleanImages()			|clean the source image
setLoading()			|load the progress bar
setOriginalSize()		|set the image original size into image attribute
setImages()			|load the image according to the image attribute
drawImage()			|show image according to the selected area aside of the window
setAreaSelect()			|set the viewport of the selected image
fileAllowed()			|allowed file types (ex- : jpeg, jpg, png, gif only)
readFile()  			|read the cropped image url ( i.e the url in base64 bit values )
handleDragOver() 		|handle drag’n’drop of the image
saveCrop()			|save the crop image

##components/

	components / imgareaselect/ css
This folder contain the styles and gif files

	components / imgareaselect/ scripts
This contains the ‘jquery.imgareaselect.js’ file and it lets user to selecting a rectangle area of an image.

**More details...... http://www.odyniec.net/projects/imgareaselect/usage.html#api-methods"**

##css/
This contains the ‘jquery.Image-Editor.css’ file.

##dialog.html
This shows the editing image window after the click of the TinyMCE  drop down button ‘Tools/CropImage Plugin’.

##plugin.js & plugin.min.js
These jquery files  are the core of this hole plugin and it includes the API of the TinyMCE.



TinyMCE will load the plugin.js file if you use the tinymce.js file in your page. If you use the tinymce.min.js file it will load the plugin.min.js file. 

API           | Summary
--------------|--------
tinymce.PluginManager.add ( ) 	|CropImage plugin that adds a toolbar button and menu item.
editor.addButton ( ) 		|Add a button that opens a window
editor.windowManager.open ( )	|open a window
editor.insertContent ( )	|Insert content when the window form is submitted
editor.addMenuItem ( )		|Adds a menu item to the tools menu


This CropImage plugin can now loaded using the tinymce.init plugins option.

```javascript
	tinymce.init({
			selector: '#mytextarea',
			plugins: 'CropImage'
			});
```


