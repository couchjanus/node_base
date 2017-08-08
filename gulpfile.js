const gulp = require('gulp'); //Первым делом нужно подключить Gulp в нашем файле.
let sass = require('gulp-sass'); //Подключаем Sass пакет
let prefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');

const sourcemaps = require('gulp-sourcemaps');

const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const del = require('del');

const rename = require('gulp-rename'); 

const rigger = require('gulp-rigger'); 

const imagemin = require('gulp-imagemin');

let uglify = require('gulp-uglify-es').default;

let watch = require('gulp-watch');

gulp.task('hello', function() {
    console.log('Hello Gulp!!');
});


gulp.task('ola', function(callback) {
  console.log("Yo Gulp");
  callback();
});


gulp.task('do:promise', function() {
  return new Promise((resolve, reject) => {
    // ...
    resolve('result');
  });
});


gulp.task('do:stream', function() {
  // reads all from stream (and throws the data away) and then done
  return require('fs').createReadStream(__filename);
});


gulp.task('do:process', function() {
  // returns child process
  return require('child_process').spawn('ls', ['.'], {stdio: 'inherit'});
});


gulp.task('do', gulp.parallel('ola', 'do:promise', 'do:stream', 'do:process'));


gulp.task('sass', function(){ // Создаем таск "sass"
    return gulp.src('src/scss/styles.scss')// Берем источник
    .pipe(sass()) // Конвертируем Sass в CSS с помощью gulp-sass
    .pipe(prefixer()) //Добавим вендорные префиксы
    .pipe(cleanCSS({compatibility: 'ie8'})) //Сожмем
    .pipe(gulp.dest('public/css'));// Выгружаем результата в папку app/css
});


gulp.task('minify', () => {
  return gulp.src('src/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});


gulp.task('sassmap', function(){ // Создаем таск "sass"
    return gulp.src('src/scss/styles.scss')// Берем источник
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError)) // Конвертируем Sass в CSS с помощью gulp-sass
    .pipe(prefixer()) //Добавим вендорные префиксы
    .pipe(cleanCSS({compatibility: 'ie8'})) //Сожмем
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'));// Выгружаем результата в папку app/css
});
  

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('style', function() {

  return gulp.src('src/scss/styles.scss')
      .pipe(gulpIf(isDevelopment, sourcemaps.init()))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulpIf(isDevelopment, sourcemaps.write()))
      .pipe(gulp.dest('public/css'));

});


gulp.task('styles', function() {

  return gulp.src('src/scss/styles.scss')
      .pipe(gulpIf(isDevelopment, sourcemaps.init()))
      .pipe(sass().on('error', sass.logError))
      .pipe(prefixer()) //Добавим вендорные префиксы
      .pipe(cleanCSS({compatibility: 'ie8'})) //Сожмем
      .pipe(gulpIf(isDevelopment, sourcemaps.write()))
      .pipe(gulp.dest('src/frontend/assets/css'));

});

gulp.task('clean', function() {
  return del('public');
});

gulp.task('assets', function() {
  return gulp.src('src/frontend/assets/**')
      .pipe(gulp.dest('public'));
});


gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('styles', 'assets'))
);



const path = {
    build: { // укажем куда складывать готовые после сборки файлы
        html: 'public/',
        js: 'public/js/',
        css: 'public/css/',
        img: 'public/css/images/',
        fonts: 'public/fonts/',
        contentImg: 'public/images/',
    },

    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/template/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/[^_]*.js',//В стилях и скриптах нам понадобятся только main файлы
        jshint: 'src/js/*.js',
        scss: 'src/scss/main.scss',
        cssVendor: 'src/css/vendor/*.*', //Если мы хотим файлы библиотек хранить отдельно
        img: 'src/scss/images/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*',
        contentImg: 'src/images/**/*.*',
        
    },
    
    watch: { // укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/template/**/*.html',
        js: 'src/js/**/*.js',
        scss: 'src/scss/**/*.*',
        img: 'src/scss/images/**/*.*',
        contentImg: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*',
    },
    
    clean: './public', //директории которые могут очищаться
    outputDir: './public' //исходная корневая директория для запуска минисервера
};

gulp.task('fonts:build', () => {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});


gulp.task('scss:build', () => {
    return gulp.src(path.src.scss) //Выберем наш основной файл стилей
        .pipe(sourcemaps.init()) //инициализируем soucemap
        .pipe(sass().on('error', sass.logError)) // Конвертируем Sass в CSS с помощью gulp-sass
        .pipe(prefixer({
            browsers: ['last 3 version', "> 1%", "ie 8", "ie 7"]
        })) //Добавим вендорные префиксы
        .pipe(cleanCSS({compatibility: 'ie8'})) //Сожмем
        .pipe(sourcemaps.write()) //пропишем sourcemap
        .pipe(rename({suffix: '.min'})) //добавим суффикс .min к имени выходного файла
        .pipe(gulp.dest(path.build.css)) //вызгрузим в build
});

// Отдельный таск для внешних стилей: билдинг вендорного css

gulp.task('cssVendor:build', function () {
    return gulp.src(path.src.cssVendor) // Берем папку vendor
        .pipe(sourcemaps.init()) //инициализируем soucemap
        .pipe(cleanCSS({compatibility: 'ie8'})) //Сожмем
        .pipe(sourcemaps.write()) //пропишем sourcemap
        .pipe(gulp.dest(path.build.css)) //выгрузим в build
});

gulp.task('html:build', () => {
    return gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
});

 
gulp.task('img:build', () => {
    return gulp.src(path.src.contentImg)
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.contentImg))
});


// билдим статичные изображения
gulp.task('image:build', () => {
    return gulp.src(path.src.contentImg) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true, //сжатие .jpg
            svgoPlugins: [{removeViewBox: false}], //сжатие .svg
            interlaced: true, //сжатие .gif
            optimizationLevel: 3 //степень сжатия от 0 до 7
        }))
        .pipe(gulp.dest(path.build.contentImg)) //выгрузим в build
});


gulp.task('js:build', () => {
    return gulp.src(path.src.js) 
        .pipe(sourcemaps.init()) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.js))
});


gulp.task('doit', gulp.parallel(
    'html:build',
    'js:build',
    'scss:build',
    'fonts:build',
    'image:build',
    ));

gulp.task('default',
  gulp.series('clean', gulp.parallel(
    'html:build',
    'js:build',
    'scss:build',
    'fonts:build',
    'image:build',
  )));

 
gulp.task('stream', function () {
    // Endless stream mode 
    return watch('css/**/*.css', { ignoreInitial: false })
        .pipe(gulp.dest('build'));
});
 
gulp.task('callback', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event 
    return watch('css/**/*.css', function () {
        gulp.src('css/**/*.css')
            .pipe(gulp.dest('build'));
    });
});

let mocha = require('gulp-mocha');
let gutil = require('gulp-util');

gulp.task('look', function() {
      gulp.watch('mocha');
});

gulp.task('mocha', function() {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

