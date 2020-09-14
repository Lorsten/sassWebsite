# Gulptemplate

## Automatic

### Plugins used
* chache
* BrowserSync
* Uglify
* concat
* imagemin - Used for compressing images to reduced size
* cleanCSS - Using it to minify the css code
* sass - Used for compiling sass code
* del Used for cleaning out the folder of old files

### System
p to start the system, simple type gulp in the when in the directory.
A couple of task is used.
* CopyHTML - copy the html files to the public directory
* jsTack - concat the js files and then uglify them folloed by moving them to pub folder.
* script - Run jstack and the reload function to reload the page when the code changes.
* cssTask - Concat the css files and run cleanCSS to minify it. Moving it to pub/css afterward.
* sasstask - same as csstask expect using sass to compile it and browser sync.stream to reload the page after the code has compiled.


#### Author Olof Andersson
