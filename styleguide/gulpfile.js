/******************************************************
 * Nerdschool: Custom variables for our own build tasks
******************************************************/
var sass = require('gulp-sass'); // To compile our sass partials
var sassGlob = require('gulp-sass-glob'); // Allows us to compile folders of sass partial, so we don't have to specify each partial explicitly (uses globbing pattern)
var plumber = require('gulp-plumber'); // Errors messages that don't break streams
var notify = require("gulp-notify"); // Get better error notifications
var svgSprite = require('gulp-svg-sprite'); // Lets us create a sprite from a folder of SVGs

/******************************************************
 * Nerdschool: Custom functions
******************************************************/

// Function for improved error notifications
function errorAlert(error) {
  notify.onError({title: "Build Error", message: "Check your terminal", sound: "Sosumi"})(error); //Error Notification
  console.log(error.toString()); //Prints Error to Console
  this.emit("end"); //End function
}

/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GULP
 * The gulp wrapper around patternlab-node core, providing tasks to interact with the core library and move supporting frontend assets.
******************************************************/
var gulp = require('gulp'),
  path = require('path'),
  browserSync = require('browser-sync').create(),
  argv = require('minimist')(process.argv.slice(2));

function resolvePath(pathInput) {
  return path.resolve(pathInput).replace(/\\/g,"/");
}

/******************************************************
 * Nerdschool: Custom gulp tasks
******************************************************/

gulp.task('compile-sass', function () {
  return gulp.src(['scss/*.scss'], {cwd: path.resolve(paths().source.css)})
  .pipe(plumber({errorHandler: errorAlert}))
  .pipe(sassGlob()) // Forårsaker muligens treigere kompilering. Dump dersom det blir for plagsomt. Sjekk ut watchify?
  .pipe(sass())
  .pipe(gulp.dest(path.resolve(paths().source.css)))
  .pipe(browserSync.stream());
});

gulp.task('create-sprite', function () {
  return gulp.src('sprite/*.svg', {cwd: path.resolve(paths().source.images)})
    .pipe(svgSprite({
      shape: {
        spacing: { // Add padding
          padding: 0
        }
      },
      mode: {
        css: {
          dest : '../source',
          sprite : '../images/sprite.svg',
          layout: 'diagonal',
          dimensions: true,
          bust: false,
          render: {
            scss: {
              dest: '../css/scss/02-generic/_sprite.scss'
            }
          }
        }
      }
    }))
    .on('error', function (error) {
      console.log(error);
    })
    .pipe(gulp.dest(path.resolve(paths().source.css)))
});

/******************************************************
 * COPY TASKS - stream assets from source to destination
******************************************************/
// JS copy
gulp.task('pl-copy:js', function(){
  return gulp.src('**/*.js', {cwd: resolvePath(paths().source.js)} )
    .pipe(gulp.dest(resolvePath(paths().public.js)));
});

// Images copy
gulp.task('pl-copy:img', function(){
  return gulp.src('**/*.*',{cwd: resolvePath(paths().source.images)} )
    .pipe(gulp.dest(resolvePath(paths().public.images)));
});

// Favicon copy
gulp.task('pl-copy:favicon', function(){
  return gulp.src('favicon.ico', {cwd: resolvePath(paths().source.root)} )
    .pipe(gulp.dest(resolvePath(paths().public.root)));
});

// Fonts copy
gulp.task('pl-copy:font', function(){
  return gulp.src('*', {cwd: resolvePath(paths().source.fonts)})
    .pipe(gulp.dest(resolvePath(paths().public.fonts)));
});

// CSS Copy
gulp.task('pl-copy:css', function(){
  return gulp.src(resolvePath(paths().source.css) + '/*.css')
    .pipe(gulp.dest(resolvePath(paths().public.css)))
    .pipe(browserSync.stream());
});

// Styleguide Copy everything but css
gulp.task('pl-copy:styleguide', function(){
  return gulp.src(resolvePath(paths().source.styleguide) + '/**/!(*.css)')
    .pipe(gulp.dest(resolvePath(paths().public.root)))
    .pipe(browserSync.stream());
});

// Styleguide Copy and flatten css
gulp.task('pl-copy:styleguide-css', function(){
  return gulp.src(resolvePath(paths().source.styleguide) + '/**/*.css')
    .pipe(gulp.dest(function(file){
      //flatten anything inside the styleguide into a single output dir per http://stackoverflow.com/a/34317320/1790362
      file.path = path.join(file.base, path.basename(file.path));
      return resolvePath(path.join(paths().public.styleguide, '/css'));
    }))
    .pipe(browserSync.stream());
});

/******************************************************
 * PATTERN LAB CONFIGURATION - API with core library
******************************************************/
//read all paths from our namespaced config file
var config = require('./patternlab-config.json'),
  patternlab = require('patternlab-node')(config);

function paths() {
  return config.paths;
}

function getConfiguredCleanOption() {
  return config.cleanPublic;
}

function build(done) {
  patternlab.build(done, getConfiguredCleanOption());
}

gulp.task('pl-assets', gulp.series(
  gulp.parallel(
    'pl-copy:js',
    'pl-copy:img',
    'pl-copy:favicon',
    'pl-copy:font',
    'pl-copy:css',
    'pl-copy:styleguide',
    'pl-copy:styleguide-css'
  ),
  function(done){
    done();
  })
);

gulp.task('patternlab:version', function (done) {
  patternlab.version();
  done();
});

gulp.task('patternlab:help', function (done) {
  patternlab.help();
  done();
});

gulp.task('patternlab:patternsonly', function (done) {
  patternlab.patternsonly(done, getConfiguredCleanOption());
});

gulp.task('patternlab:liststarterkits', function (done) {
  patternlab.liststarterkits();
  done();
});

gulp.task('patternlab:loadstarterkit', function (done) {
  patternlab.loadstarterkit(argv.kit, argv.clean);
  done();
});

// NERDSCHOOL: We define our own build task in order to also compile sass on build

// gulp.task('patternlab:build', gulp.series('pl-assets', build, function(done){
//   done();
// }));

gulp.task('patternlab:build', gulp.series('compile-sass', 'pl-assets', build, function(done){
  done();
}));

gulp.task('patternlab:installplugin', function (done) {
  patternlab.installplugin(argv.plugin);
  done();
});

/******************************************************
 * SERVER AND WATCH TASKS
******************************************************/
// watch task utility functions
function getSupportedTemplateExtensions() {
  var engines = require('./node_modules/patternlab-node/core/lib/pattern_engines');
  return engines.getSupportedFileExtensions();
}
function getTemplateWatches() {
  return getSupportedTemplateExtensions().map(function (dotExtension) {
    return resolvePath(paths().source.patterns) + '/**/*' + dotExtension;
  });
}

function reload() {
  browserSync.reload();
}

function reloadCSS() {
  browserSync.reload('*.css');
}

function watch() {
  gulp.watch(resolvePath(paths().source.css) + '/**/*.css', { awaitWriteFinish: true }).on('change', gulp.series('pl-copy:css', reloadCSS));
  gulp.watch(resolvePath(paths().source.styleguide) + '/**/*.*', { awaitWriteFinish: true }).on('change', gulp.series('pl-copy:styleguide', 'pl-copy:styleguide-css', reloadCSS));

  // NERDSCHOOL watch tasks
  gulp.watch(path.resolve(paths().source.css, 'scss/**/*.scss'), { awaitWriteFinish: true }).on('change', gulp.series('compile-sass'));

  var patternWatches = [
    resolvePath(paths().source.patterns) + '/**/*.json',
    resolvePath(paths().source.patterns) + '/**/*.md',
    resolvePath(paths().source.data) + '/*.json',
    resolvePath(paths().source.fonts) + '/*',
    resolvePath(paths().source.images) + '/*',
    resolvePath(paths().source.meta) + '/*',
    resolvePath(paths().source.annotations) + '/*'
  ].concat(getTemplateWatches());

  console.log(patternWatches);

  gulp.watch(patternWatches, { awaitWriteFinish: true }).on('change', gulp.series(build, reload));
}

gulp.task('patternlab:connect', gulp.series(function(done) {
  browserSync.init({
    server: {
      baseDir: resolvePath(paths().public.root)
    },
    snippetOptions: {
      // Ignore all HTML files within the templates folder
      blacklist: ['/index.html', '/', '/?*']
    },
    notify: {
      styles: [
        'display: none',
        'padding: 15px',
        'font-family: sans-serif',
        'position: fixed',
        'font-size: 1em',
        'z-index: 9999',
        'bottom: 0px',
        'right: 0px',
        'border-top-left-radius: 5px',
        'background-color: #1B2032',
        'opacity: 0.4',
        'margin: 0',
        'color: white',
        'text-align: center'
      ]
    }
  }, function(){
    console.log('PATTERN LAB NODE WATCHING FOR CHANGES');
    done();
  });
}));

/******************************************************
 * COMPOUND TASKS
******************************************************/
gulp.task('default', gulp.series('patternlab:build'));
gulp.task('patternlab:watch', gulp.series('patternlab:build', watch));
gulp.task('patternlab:serve', gulp.series('patternlab:build', 'patternlab:connect', watch));

/******************************************************
 * Nerdschool: CUSTOM TASKS
******************************************************/
gulp.task('serve', gulp.series('patternlab:build', 'patternlab:connect', watch));
gulp.task('sprite', gulp.series('create-sprite', 'pl-copy:img', 'compile-sass'));
