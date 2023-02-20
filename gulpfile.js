const gulp        = require('gulp');                        // использование пакета gulp
const browserSync = require('browser-sync');                // использование пакета browser-sync
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');                // для сжатия html файла

// Запуск live сервера
gulp.task('server', function() {          
    browserSync.init({
        server: {
            baseDir: "dist"       // из какой паки запусккается сервер
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {         
    return gulp.src("src/sass/**/*.+(scss|sass)")         // Путь к файлам для изменений
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))    // Компиляция стиля кода, с выводом возможной ошибки
            .pipe(rename({
                prefix: "",
                suffix: ".min"
              }))
            .pipe(autoprefixer()) 
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("dist/css"))                    // Вывод в папку
            .pipe(browserSync.stream());                   // Обновление страницы после выполнение компиляции
});

gulp.task('watch', function(){                                              // Обновление live сервера после изменений файлов
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
    gulp.watch("src/*.html"). on('change', gulp.parallel('html'));                 // Обновление live сервера после изменений html файлов
    gulp.watch("src/js/**/*.js"). on('change', gulp.parallel('scripts'));          
    gulp.watch("src/fonts/**/*"). on('all', gulp.parallel('fonts'));  
    gulp.watch("src/icons/**/*"). on('all', gulp.parallel('icons'));
    gulp.watch("src/img**/*"). on('all', gulp.parallel('images'));  
});

gulp.task('html', function(){
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true}))                       // Убрать все пробелы
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());   
});

gulp.task('scripts', function(){
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"))                                            //функция копирования файлов из src в dist 
        .pipe(browserSync.stream());
});

gulp.task('fonts', function(){
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))                                             //функция копирования файлов из src в dist 
        .pipe(browserSync.stream());
});

gulp.task('icons', function(){
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"))                                             //функция копирования файлов из src в dist 
        .pipe(browserSync.stream());
});

gulp.task('mailer', function(){
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer"))                                             //функция копирования файлов из src в dist 
        .pipe(browserSync.stream());
});

gulp.task('images', function(){
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))                                             //функция копирования файлов из src в dist 
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch','server','styles', 'scripts', 'fonts', 'icons', 'mailer', 'images', 'html'));            // Параллельно запускаем задачи описанные в gulp