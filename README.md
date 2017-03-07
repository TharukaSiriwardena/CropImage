# CropImage
Image Editor for TinyMCE

## Synopsis about this Plugin

This plugin enables the user to choose, crop and  insert an image into TinyMCE's editable area.
 In toolbar you can click the button ‘ Tools/CropImage plugin ‘ and then browse image and crop that image as you wish. Then insert it into the TinyMCE editor by clicking the Insert button.
This plugin is useful to reduce the size of an image or to remove non-important aspects of an image.
Jquery, bootstrap, html, css and javascript are the developing languages of this plugin.

## Options

•	Select Image by File Select, Url or Drag'n'Drop
•	Crop Image to specific size in modal window
•	Upload image with selected area coordinates

## Getting started

You can download the ‘CropImage’ folder and put it into the following folder structure
	
  	\tinymce\js\tinymce\plugins\
  
Then create an index.html file and include the below code

```
  <html>
	<head>
		<script src='tinymce\js\tinymce\tinymce.min.js'></script>
		<script>
			tinymce.init({
			selector: '#mytextarea',
			plugins: 'CropImage'
			});
		</script>
	</head>
	
	<body>
		<h1>TinyMCE Quick Start Guide</h1>
		<form method="post">
			<textarea id="mytextarea">Hello, World!</textarea>
		</form>
	</body>
</html>
```

* Note-: This plugin we can use in online as the bootstrap.min.css, bootstrap.min.js and jquery.min.js loaded to the interface using online. *
