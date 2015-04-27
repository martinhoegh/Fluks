var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var path = require('path');
var rename = require("gulp-rename");
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var paths = {
	styles: ['styles/less/*.less'],
  stylesminified: ['styles/dev/*.css'],
	markup: ['jade/*.jade']
}

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./",
        },
        open: false
    //    tunnel: "virkforfanden"
    });
});

gulp.task('jade', function() {
  gulp.src(paths.markup)
    .pipe(jade({
    	pretty: true
    }))
    .pipe(gulp.dest('./'))    
    .pipe(reload({stream:true}));
});

gulp.task('less', function () {
  gulp.src(paths.styles)
    .pipe(less({
      paths: [ path.join(__dirname, 'less') ]
    }))
    .pipe(gulp.dest('./styles/dev'))
    .pipe(reload({stream:true}));
});

gulp.task('minify-css', function() {
  gulp.src('./styles/dev/*.css')
    .pipe(minifyCSS({
      keepBreaks:false,
      keepSpecialComments: 0
    }))
    .pipe(rename({
            suffix: '.min'
        }))
    .pipe(gulp.dest('./styles'))
});

gulp.task('default', ['jade', 'less', 'minify-css', 'browser-sync'], function(){
    gulp.watch(paths.styles, ['less']);
    gulp.watch(paths.stylesminified, ['minify-css']);
    gulp.watch(paths.markup, ['jade']);

});