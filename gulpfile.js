// Loading required files
const gulp = require("gulp");
const {src, dest, watch,series,parallel } = require("gulp");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sass = require('gulp-sass');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const cache = require("gulp-cache");


//Search paths
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    sassPath: "src/**/*.scss",
    jsPath: "src/**/*.js",
    imgPath: "src/images/*.{jpg,png,svg}"

}
/*
Function for deleting old files at the start using the plugin del
*/
const clean = (done) => {
    del.sync("pub/**");
    done();
}

// a function for copying the hmtl files to pub
const copyHTML = () => {
    return src(files.htmlPath)
        .pipe(dest('pub'));
}

/*
Clear the img folder in pub. 
Used for deleting a image when the source image is deleted
*/
const clearImages = (done) =>{
    del.sync("pub/images/**");
    done();
}

/*
Function for handling the images
Using the plugin cache to cache the minify image so it doesn't have to repeat the process everytime this function is ran
THe plugin imagemin is used to minify images
*/
const handleImg = () => {
    return src(files.imgPath)
    .pipe(cache(imagemin({
        interlaced: true
      })))
        .pipe(dest('pub/images'));
}
/*
Function for first cleaning the image folder using clearImages and then running handleIMG
Using a callback to run each function after it's done
*/
const manageImages = (done) =>{
    return series(
       clearImages,
       handleImg,
       done =>{
           done();
       }
    )(done)
}

/*
 Task for javascript files
 Merge js files and then minify 
 */
const jsTask = () => {
    return src(files.jsPath)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest('pub/js'))
}

/*
Function using browserSync to reload the page 
*/
const reloading = (done) => {
    browserSync.reload();
    done();
}

/* Task for running  the function 
jstack aswell as reloading the page when the code has compiled usingh browsersync */
const script = (done) => {
    return gulp.series(
        jsTask,
        reloading,
        done => {
            done();
        }
    )(done)
}

/*
Function for handling the css File 

*Merging two or more files into on with concat

Using cleanCSS to minify the file.

Then placing the file in pub/css
*/
const cssTask = () => {
    return src(files.cssPath)
        .pipe(concat("style.css"))
        .pipe(cleanCSS())
        .pipe(dest("pub/css"))
}


/*
Same as cssTask expect for sass
* Merging two or more files into on with concat

* Compile the files using the plugin sass

* Using browsersync stream to reload the page after the file has been compiled
*/  
const sassTask = () => {
    return src(files.sassPath)
        .pipe(concat("style.css"))
        .pipe(sass().once('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(dest("pub/css"))
        .pipe(browserSync.stream());
}

/*
Function for watching all the task.
Setting up browsersync here to allow automatic reloading whenever a file is changed
*/
const watchTask = () => {
    browserSync.init({
        server: {
            baseDir: "./pub",
            index: "/index.html"
        }
    });
  
    /* watching the html files separately, 
    and running a manual reload whenever the files changes using browsersync*/
    watch(files.htmlPath).on("change", series(copyHTML, reload));

    watch([files.cssPath, files.jsPath, files.sassPath,files.imgPath],
        parallel(cssTask, script, sassTask, manageImages)
    );
}

// Export as default task
exports.default = series(
    parallel(clean, copyHTML, cssTask, jsTask, sassTask, handleImg),
    watchTask
);