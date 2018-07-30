let gulp = require("gulp")
let less = require("gulp-less")
let pug = require("gulp-pug")
let autoprefixer = require("gulp-autoprefixer") // css添加浏览器的前缀
let imagemin = require("gulp-imagemin") // 压缩图片
let babel = require("gulp-babel")  // 解决js压缩报错
let cssmin = require("gulp-minify-css") // 压缩css
let uglify = require("gulp-uglify") // 压缩js
let watch = require("gulp-watch") // 监听修改后实时更新dist文件
let browserSync = require("browser-sync") // 修改后实时同步刷新浏览器
let del = require("del") // 删除文件
let rename = require("gulp-rename") // 重命名
gulp.task('css', function () {
    return gulp.src('src/*/css/*.less')
        .pipe(watch('src/*/css/*.less'))
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['iOS >= 7', 'Android >= 4.1'],
            cascade: true,
            remove: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(cssmin())
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('dist'))
})

gulp.task('pug', function () {
    return gulp.src('src/*/*.pug')
        .pipe(watch('src/*/*.pug'))
        .pipe(pug({
            pretty: true,
            cache: true
        }))
        .pipe(gulp.dest('dist'))
})

gulp.task('images', function () {
    return gulp.src('src/*/images/*')
        .pipe(watch('src/*/images/*'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist'))
})

gulp.task('js', function () {
    return gulp.src('src/*/js/*.js')
        .pipe(watch('src/*/js/*.js'))
        .pipe(gulp.dest('dist'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist'))
})

 gulp.task('serve', function () {
     browserSync.init({
         files: ['**'],
         server: {
             baseDir: 'dist'
         }
     })
 })

gulp.task('clean', function () {
    return del([
         'dist/*'
    ])
})


gulp.task('default', ['css', 'pug', 'images', 'js', 'serve'])