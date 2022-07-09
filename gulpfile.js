const { src, dest, parallel, series, watch } = require("gulp")
const pump = require("pump")
const postcss = require("gulp-postcss")
const livereload = require("gulp-livereload")
const zip = require("gulp-zip")

// postcss
const autoprefixer = require("autoprefixer")
const tailwindcss = require("tailwindcss")
const cssnano = require("cssnano")
const easyimport = require("postcss-easy-import")

// js
const concat = require("gulp-concat")
const uglify = require("gulp-uglify")
const generateClass = require("./scripts/generate_class")

function serve(done) {
    livereload.listen()
    done()
}

const handleError = (done) => {
    return function (err) {
        if (err) {
            beeper()
        }
        return done(err)
    }
}

function hbs(done) {
    pump([src(["*.hbs", "partials/**/*.hbs"]), livereload()], handleError(done))
}

function css(done) {
    pump(
        [
            src(["assets/css/*.css", "node_modules/@fortawesome/fontawesome-free/css/all.min.css"], {
                sourcemaps: true
            }),
            postcss([easyimport, tailwindcss(), autoprefixer(), cssnano()]),
            dest("assets/built/", { sourcemaps: "." }),
            livereload()
        ],
        handleError(done)
    )
}

function js(done) {
    pump(
        [
            src(
                [
                    // pull in lib files first so our own code can depend on it
                    "assets/js/lib/*.js",
                    "assets/js/*.js"
                ],
                { sourcemaps: true }
            ),
            concat("main.js"),
            uglify(),
            dest("assets/built/", { sourcemaps: "." }),
            livereload()
        ],
        handleError(done)
    )
}

function zipper(done) {
    const filename = require("./package.json").name + ".zip"

    generateClass()

    pump(
        [
            src([
                "**",
                "!node_modules",
                "!node_modules/**",
                "!dist",
                "!dist/**",
                "!yarn-error.log",
                "!yarn.lock",
                "!gulpfile.js",
                "!tailwind.config.js",
                "!.prettierrc",
                "!.prettierignore",
                "!settings",
                "!settings/routes.yaml",
                "!scripts",
                "!scripts/generate_class.js",
                "!scripts/classes.js"
            ]),
            zip(filename),
            dest("dist/")
        ],
        handleError(done)
    )
}

const cssWatcher = () => watch(["*.hbs", "partials/**/*.hbs"], css)
const hbsWatcher = () => watch(["*.hbs", "partials/**/*.hbs"], hbs)
const jsWatcher = () => watch(["assets/js/lib/*.js", "assets/js/*.js"], js)
const watcher = parallel(cssWatcher, hbsWatcher, jsWatcher)
const build = series(css, js)

exports.build = build
exports.zip = series(build, zipper)
exports.default = series(build, serve, watcher)
