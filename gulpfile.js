const gulp = require('gulp'),
    babel = require('gulp-babel');

gulp.task('es', () =>
    gulp.src(['./src/**', '!./src/swagger/**'])
        .pipe(babel({
            presets: [['@babel/env', {modules: 'commonjs'}]],
            plugins: ['@babel/plugin-transform-runtime']
        }))
        .pipe(gulp.dest('./dist'))
);

gulp.task('swagger', () =>
    gulp.src('./src/swagger/**')
        .pipe(gulp.dest('./dist/swagger'))
);

gulp.task('package', gulp.series('es', 'swagger'));
