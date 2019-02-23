const gulp = require('gulp');
// const { src, dest, task, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');

// Compile sass into CSS & auto-inject into browsers

// function browser_sync(done) {
//     browserSync.init({
//         server: "./src"  
//     });
//     done();
// }

function cssProd() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
};

// function js() {
//     return gulp.src(['src/scss/*.scss'])
//         .pipe(sourcemaps.init())
//         .pipe(sass())
//         .pipe(autoprefixer())
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest("src/css"))
//         .pipe(browserSync.stream());
// };

function cssBuild() {
    return gulp.src('src/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
};

// // Move the css and javascript files into our /src/js folder
function cssCopy() {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
};

function jsCopy() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
};


function jsBuild() {
    return gulp.src("src/js/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
};

// Static Server + watching scss/html files

function serve() {

    browserSync.init({
        server: "./src"  
    });
    // browser_sync()

    gulp.watch(['src/scss/*.scss'], cssProd);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
};

gulp.task('default', gulp.series(cssProd, serve));
// gulp.task('default')

gulp.task('start', cssProd);
gulp.task('cssCopy', cssCopy);
gulp.task('jsCopy', jsCopy);
gulp.task('start', cssProd);