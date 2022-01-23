/** Gulp.js Configurations */ 
import gulp from 'gulp';

// CSS / SCSS
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';
// JS
import terser from 'gulp-terser';
import concat from 'gulp-concat'
// HTML
import gulpHtml from 'gulp-htmlmin';
// IMG / SVG
import imagemin from 'gulp-imagemin';
import svgo from 'imagemin-svgo';
// Font 
import fontSpider from 'gulp-font-spider';

const asset = './asset'
const dist = './dist'

/* SCSS */
const compileSCSS = () => {
  console.log(`---------- gulp: Transpiling SCSS files to CSS files`)

  const sass = gulpSass(dartSass);
  return gulp.src(`${asset}/stylesheet/scss/style.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${asset}/stylesheet/css/`));
}
/* CSS */
const compileCSS = () => {
  console.log(`---------- gulp: Optimizing CSS files`)
  const postcssPlugins = [
    autoprefixer({overrideBrowserslist: ['last 2 versions', '> 2%']}),
    cssnano()
  ];

  return gulp.src(`${asset}/stylesheet/css/style.css`)
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest(`${dist}/css`));
}

/* JS */
const compileJS = () => {
  console.log(`---------- gulp: Optimizing JS files`)
  return gulp.src(`${asset}/js/**/*.js`)
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(gulp.dest(`${dist}/js`));
}

/* HTML */
const minHTML = () => {
  console.log(`---------- gulp: Minimizing HTML file`)
  return gulp.src('./asset/index.html')
    .pipe(gulpHtml({
        collapseWhitespace: true, 
        removeComments: true
    }))
    .pipe(gulp.dest(`${dist}/`))
}

/* SVG */
const minSVG = () => {
  console.log(`---------- gulp: Minimizing SVG files`)
  const config = {
    multipass: true,      
    plugins: [  
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false
          },
        },
      }
    ]
  }
	return gulp.src(`${asset}/img/**/*.svg`)
    .pipe(imagemin([
      svgo(config)
    ]))
		.pipe(gulp.dest(`${dist}/img`))

}

/* Font */
const moveFont = () => {
  console.log(`---------- gulp: Minimizing font files`)
  return gulp.src(`${asset}/font/font-demo.html`)
    .pipe(fontSpider())
    .pipe(gulp.dest(`${dist}/font`))
}

/* Watch SCSS/CSS */
const watchCss = () => {  
  gulp.watch(`${asset}/stylesheet/css/**/*.css`, gulp.series('css'));
}
const watchScss = () => {  
  gulp.watch(`${asset}/stylesheet/scss/**/*.scss`, gulp.series('scss', 'css'));
}
/* Watch HTML/JS */
const watchJS = () => {  
  gulp.watch(`${asset}/js/**/*.js`, gulp.series('html', 'js'));
}

const style = gulp.series(compileSCSS, compileCSS);
const build = gulp.series(compileSCSS, compileCSS, minSVG, compileJS, minHTML);


export { 
  compileJS as js,
  minHTML as html, 
  minSVG as svg, 
  compileCSS as css, 
  compileSCSS as scss,
  moveFont as font
}
export { 
  watchCss as watch_css, 
  watchScss as watch_scss,
  watchJS as watch_js
}
export { style };
export default build;
