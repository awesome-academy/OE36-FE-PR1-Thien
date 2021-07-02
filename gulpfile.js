const { src, dest, parallel, watch, series } = require("gulp");
const concat = require("gulp-concat");
var sass = require('gulp-sass')(require('sass'));
const pug = require("gulp-pug");
const browserSync = require("browser-sync").create();

const FilesPath = {
    scssFiles: "./scss/*.scss",
    pugFiles: "./pug/pages/*.pug",
};
const { scssFiles, pugFiles } = FilesPath;


function scssTask() {
    return src(scssFiles)
        .pipe(sass())
        .pipe(concat("style.css"))
        .pipe(dest("./dist/css"))
        .pipe(browserSync.stream());
}

function pugTask() {
    return src(pugFiles)
        .pipe(pug({ pretty: true }))
        .pipe(dest("./dist"))
        .pipe(browserSync.stream());
}

function assetsTask() {
    return src("assets/**/*")
        .pipe(dest("./dist/assets"));
}

function serve() {
    browserSync.init({ server: { baseDir: './dist' } });
    watch(scssFiles, scssTask);
    watch(pugFiles, pugTask);
}

exports.sass = scssTask;
exports.pug = pugTask;
exports.assets = assetsTask;
exports.default = series(parallel(scssTask, pugTask, assetsTask));
exports.serve = series(serve, parallel(scssTask, pugTask, assetsTask));
