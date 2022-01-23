/** Gulp.js Configurations */ 
import gulp from 'gulp';

import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';
import terser  from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import svgo from 'imagemin-svgo';

const base = './asset'

/* SCSS */
const compileSCSS = () => {
  const sass = gulpSass(dartSass);
  return gulp.src(`${base}/stylesheet/scss/style.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${base}/stylesheet/css/`));
}
/* CSS */
const compileCSS = () => {
  const postcssPlugins = [
    autoprefixer({overrideBrowserslist: ['last 2 versions', '> 2%']}),
    cssnano()
  ];

  return gulp.src(`${base}/stylesheet/css/style.css`)
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest('./dist/css'));
}

/* JS */
const minJS = () => {
  return gulp.src(`${base}/js/**/*.js`)
    .pipe(terser())
    .pipe(gulp.dest('./dist/js'));
}

/* SVG */
const minSVG = () => {
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
	return gulp.src(`${base}/img/**/*.svg`)
    .pipe(imagemin([
      svgo(config)
    ]))
		.pipe(gulp.dest('./dist/img'))

}

/* Font */
const moveFont = () => {
  return gulp.src(`${base}/font/**/*.ttf`)
    .pipe(gulp.dest('./dist/font'))
}

/* Watch SCSS/CSS */
const watchCss = () => {  
  gulp.watch(`${base}/stylesheet/css/**/*.css`, gulp.series('css'));
}
const watchScss = () => {  
  gulp.watch(`${base}/stylesheet/scss/**/*.scss`, gulp.series('scss', 'css'));
}


const style = gulp.series(compileSCSS, compileCSS);
const build = gulp.series(compileSCSS, compileCSS, minSVG, minJS);


export { 
  minJS as js, 
  minSVG as svg, 
  compileCSS as css, 
  compileSCSS as scss,
  moveFont as font
}
export { 
  watchCss as watch_css, 
  watchScss as watch_scss 
}
export { style };
export default build;
