let gulp = require("gulp")
let less = require("gulp-less")
let pug = require("gulp-pug")
let autoprefixer = require("gulp-autoprefixer") // css添加浏览器的前缀
let imagemin = require("gulp-imagemin") // 压缩图片
let cssmin = require("gulp-minify-css") // 压缩css
let uglify = require("gulp-uglify") // 压缩js
let watch = require("gulp-watch") // 监听修改后实时更新dist文件
let browserSync = require("browser-sync") // 修改后实时同步刷新浏览器
let del = require("del") // 删除文件
let rename = require("gulp-rename") // 重命名
let plumber = require("gulp-plumber") // 构建异常捕获，防止构建进程崩掉；出错不中断
let rollup = require("gulp-better-rollup") // 处理读取文件，构建依赖关系树，转换内容，然后编写转换后的文件 下面四个一起使用,js打包模块
let babel = require("rollup-plugin-babel") // es6转为es5
let commonjs = require("rollup-plugin-commonjs") // 将非ES6语法的包转为ES6可用；node_modules中的包大部分都是commonjs格式的，要在rollup中使用必须先转为ES6语法，为此需要安装这个插件
let resolve = require("rollup-plugin-node-resolve")  //帮助 rollup 查找外部模块，帮助寻找node_modules里的包;rollup无法识别node_modules中的包,需要使用这个插件，然后在plugins中使用
gulp.task('css', function () {
    return gulp.src('src/*/css/*.less')
        .pipe(watch('src/*/css/*.less'))
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['iOS >= 7', 'Android >= 4.1'],
            cascade: true,
            remove: true
        }))
        .pipe(gulp.dest('dist'))
})

gulp.task('css:min', function () {
    return gulp.src('src/*/css/*.less')
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
        .pipe(plumber())
        .pipe(rollup({plugins: [resolve(), commonjs(), babel({
                runtimeHelpers: true,
                exclude: 'node_modules/**'
            })]}, 'umd'))
        .pipe(gulp.dest('dist'))
})

gulp.task('js:min', function () {
    return gulp.src('src/*/js/*.js')
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
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