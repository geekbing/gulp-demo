// 载入外挂
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify')

// 样式
gulp.task('styles', function () {
    return gulp.src('src/css/**/*.css')
        .pipe(concat('index.css'))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({message: 'Styles task complete'}));
});

// 脚本
gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({message: 'Scripts task complete'}));
});

// 图片
gulp.task('images', function () {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(gulp.dest('dist/img'))
        .pipe(notify({message: 'Images task complete'}));

    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

// gulp.task('images', function () {
//     return gulp.src('src/img/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/img'))
//         .pipe(notify({message: 'Images task complete'}));
// });

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
});


// 清理
gulp.task('clean', function () {
    return gulp.src(['dist/css', 'dist/js', 'dist/img'], {read: false})
        .pipe(clean());
});

// 预设任务
gulp.task('default', ['clean'], function () {
    gulp.start('styles', 'scripts', 'images');
});