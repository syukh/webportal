// 'use strict';
// var
//   gulp = require('gulp'),
//   sass = require('gulp-sass'),
//   rename = require('gulp-rename'),
//   concat = require('gulp-concat'),
//   autoprefixer = require('gulp-autoprefixer'),
//   del = require('del'),
//   pug = require('gulp-pug'),
//   cleanCSS = require('gulp-clean-css'),
//   //uglify = require('gulp-uglify'),
//   //sourcemaps = require('gulp-sourcemaps'),
//   notify = require('gulp-notify'), // обрабатывает и отправляет сообщения об ошибке
//   plumber = require('gulp-plumber'), // обработчик ошибок к каждому pipe
//   browserSync = require('browser-sync').create(); // живая перезагрузка



// //---- DEVELOPMENT ----//

// //---- Sass -> Css ----//
// gulp.task('sass', function () {
//   return gulp.src('app/sass/**/*.sass', {
//       //since: gulp.lastRun('sass')
//     })
//     .pipe(plumber({
//       errorHandler: notify.onError(function (err) {
//         return {
//           title: 'Sass',
//           message: err
//         };
//       })
//     }))
//     .pipe(sass()) //sass({outputStyle: 'compressed' }) сжимаем код
//     .pipe(rename({ // переименовываем файл
//       suffix: '.min',
//       prefix: ''
//     }))
//     .pipe(autoprefixer(['last 17 versions']))
//     .pipe(gulp.dest('app/css')); // получаем сборку main.min.css
// });

// //---- JS ----//
// gulp.task('js', function () {
//   return gulp.src([
//       'app/js/jquery.min.js',
//       'node_modules/slick-slider/slick/slick.min.js',
//       'app/js/simplebar.js',
//       'app/js/common.js', // Всегда в конце
//     ])
//     .pipe(concat('scripts.min.js'))
//     // .pipe(uglify()) // Минифицируем
//     .pipe(gulp.dest('app/js'))
//     .pipe(browserSync.reload({
//       stream: true
//     }))
// });


// //---- Pug ----//
// gulp.task('pug', function () {
//   return gulp.src('app/pug/*.pug')
//     .pipe(plumber({
//       errorHandler: notify.onError(function (err) {
//         return {
//           title: 'Pug',
//           message: err
//         };
//       })
//     }))
//     .pipe(pug({
//       pretty: true
//     }))
//     .pipe(gulp.dest('app'))
// });


// //---- Build ----//
// gulp.task('build',
//   gulp.parallel(
//     gulp.series('sass'),
//     gulp.series('js')
//   )
// );

// //----- BrowserSinc ----//
// gulp.task('browser-sync', function () {
//   browserSync.init({
//     server: 'app'
//   });
//   browserSync.watch('app/**/*.*').on('change', browserSync.reload);
// });

// //---- Watch ----//

// gulp.task('watch', function () {
//   gulp.watch('app/sass/**/*.*', gulp.series('sass'));
//   gulp.watch('app/pug/**/*.*', gulp.series('pug'));
//   gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.series('js'));

// });

// gulp.task('default', gulp.series('build', gulp.parallel('watch', 'browser-sync')));

// //---- PRODACTION ----//

// //---- Сlean ----//
// gulp.task('clean', function () {
//   return del('public');
// });

// //---- Public ----//
// gulp.task('public', function (callbakc) {
//   var buildFiles = gulp.src(
//       'app/*.html',
//       'app/.htaccess')
//     .pipe(gulp.dest('public'));

//   var buildCss = gulp.src(
//       'app/css/main.min.css')
//     .pipe(gulp.dest('public/css'));

//   var buildJs = gulp.src(
//       'app/js/scripts.min.js')
//     .pipe(gulp.dest('public/js'));

//   var buildFonts = gulp.src(
//       'app/fonts/**/*.*')
//     .pipe(gulp.dest('public/fonts'));

//   callbakc();
// });




'use strict';

let prepros = 'sass'; // или less. Название препроцессора с которым работаем
 
const { src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const less = require('gulp-less');
const pug = require('gulp-pug');
// const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const notify = require('gulp-notify'); // обрабатывает и отправляет сообщения об ошибке
const plumber = require('gulp-plumber'); // обработчик ошибок к каждому pipe


function browsersync(){
  browserSync.init({
    server : {
        baseDir: './app'
    },
    notify : false,
    online : true,       // false для работы без интерната 
});
};

// ----  Sass -> Css ----//
function styles() {
  return src('app/'+prepros+'/main.'+prepros+'')
    .pipe(eval(prepros)())
    .pipe(concat('main.min.css'))
    // .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
    // .pipe(cleanCSS({level: {1: {specialComments: 0 } }, /* format: 'beautify' */ }))
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream());
};

// --- Js --- //
function scripts(){
  return src('app/js/common.js')
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

// --- Pug -> Html --- //
function pug2Html() {
  return src('app/pug/*.pug')
  .pipe(plumber({
    errorHandler: notify.onError(function (err) {
      return {
        title: 'Pug',
        message: err
      };
    })
  }))
  .pipe(pug({
    pretty: true
  }))
  .pipe(dest('app/'))
  .pipe(browserSync.stream());
};

// --- Libs --- //
function libsCss(){
  return src('app/libs/libs.sass')
    .pipe(sass())
    .pipe(concat('libs.min.css'))
    // .pipe(autoprefixer({overrideBrowserslist: ['last 17 versions'], grid: true}))
    // .pipe(cleanCSS({level: {1: {specialComments: 0 } }, /* format: 'beautify' */ }))
    .pipe(dest('app/css/'))
}


function libsJs(){
  return src([
    // '...',           // Подключаем файлы JS
    'node_modules/jquery/dist/jquery.min.js',
    // 'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/slick-slider/slick/slick.min.js',
    'app/js/simplebar.js',

  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

// ---End Libs --- //

function startWach(){
  watch(['app/**/'+ prepros +'/**/*'], styles);
  watch(['app/pug/**/*.pug'], pug2Html);
  watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.libsCss = libsCss;
exports.libsJs = libsJs;

exports.default = parallel(libsCss, libsJs, styles, scripts, browsersync, startWach)   