/** Gulp.js Configurations */ 
import gulp from 'gulp';
// CSS 
// import autoprefixer from 'autoprefixer';
// import cssnano from 'cssnano';
// import postcss from 'gulp-postcss';
// import tailwindcss from 'tailwindcss';
// JS
import terser from 'gulp-terser';
// SVG
import imagemin from 'gulp-imagemin';
import svgo from 'imagemin-svgo';
// Font 
import fontSpider from 'gulp-font-spider';

const asset = './public';
const dist = './build';

/* CSS */
// const compileCSS = () => {
//   console.log(`---------- gulp: Optimizing CSS files`)
//   const postcssPlugins = [
//     tailwindcss({ config: "./config/tailwind.config.js"}),
//     autoprefixer({overrideBrowserslist: ['last 2 versions', '> 2%']}),
//     cssnano()
//   ];

//   return gulp.src(`${asset}/stylesheet/css/style.css`)
//     .pipe(postcss(postcssPlugins))
//     .pipe(gulp.dest(`${dist}/css`));
// }

/* JS */
const compileJS = () => {
  console.log(`---------- gulp: Optimizing JS files`)
  return gulp.src(`${asset}/js/**/*.js`)
    .pipe(terser())
    .pipe(gulp.dest(`${dist}/js`));
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
    // .pipe(gulp.dest(`${dist}/font`))
}

const build = gulp.series(minSVG, compileJS);

export { 
  compileJS as js,
  minSVG as svg, 
//   compileCSS as css, 
  moveFont as font
};
export default build;