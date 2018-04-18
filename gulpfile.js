const gulp = require('gulp'),
    babel = require('gulp-babel'),
    gulpSequence = require('gulp-sequence');

gulp.task('es', () =>
    gulp.src(['./src/**', '!./src/swagger/**'])
    .pipe(babel({
        plugins: ['transform-runtime']
    }))
    .pipe(gulp.dest('./dist'))
);

gulp.task('swagger', () =>
    gulp.src('./src/swagger/**')
    .pipe(gulp.dest('./dist/swagger'))
);

gulp.task('package', gulpSequence('es', 'swagger'));