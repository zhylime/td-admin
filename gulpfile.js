var express = require('express'),
app = express(),
server = null,
bs = null,
locals = {},
logger = require('morgan'),
fs = require('fs'),
path = require('path'),
gulp = require('gulp'),
babel = require('gulp-babel'),
coffee = require('gulp-coffee'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
stylus = require('gulp-stylus'),
jshint = require('gulp-jshint-classic'),
stylish = require('jshint-stylish'),
jade = require('gulp-jade'),
gutil = require('gulp-util'),
watch = require('node-watch'),
insert = require('gulp-insert'),
exec = require('child_process').exec,
rename = require('gulp-rename'),
changedFile = null,
featureEnabled = {},
inputArguments = [],
through = require('through2'),
imagemin = null,
sourcemaps = require('gulp-sourcemaps'),
defaultTasks = ['server', 'locale', 'watch-vendor', 'watch-all'],
spawn = require('child_process').spawn,
run = require('run-sequence'),
kouto = require('kouto-swiss'),
packageJson = require('./package.json'),
nib = require('nib');
featureEnabled.lr = '';
featureEnabled.style = 'stylint';
featureEnabled.noserver = featureEnabled.maps = false;
featureEnabled.simpleWatch = true;

var merge = function(object1, object2) {
  for (var attrname in object2) object1[attrname] = object2[attrname];
  return object1;
};

var config = {
  moduleTag: '__',
  styleguide: 'styleguide.html',
  home: 'index.html',
  firstPage: '404.html',
  busy: './bin/busy.json',
  language: 'en',
  build: __dirname + '/build/',
  jsFile: 'app.js',
  root: './',
  src: './src/',
  jsLang: 'js',
  host: 'http://127.0.0.1:5000',
  deployHost: '//host.proferochina.com',
  port: 5000,
  name: packageJson.name,
  header: '/* (c) '+packageJson.name+' v'+packageJson.version+' '+new Date()+' */'
};

var generateStyleguide = function() {
  changedFile = config.styleguide;
  exec('npm run style', generalCallback);
};

var toggle = function(feature, featureEnabled, args) {
  if (featureEnabled) {
    if (args && args.name)
      gutil.log(gutil.colors.blue('..with ' + args.name +' enabled.'));
    return args && args.params ? feature(args.params) : feature();
  } 
  return through.obj(function(file, enc, cb) {
    cb(null, file);
  });
};

var paths = {
  build: config.build,
  static: config.build + 'assets/',
  buildJs: config.build + 'assets/js/',
  img: config.build + 'assets/img/',
  css: config.build + 'assets/css/',
  js: config.src + 'js/',
  vendorJs: config.src + 'vendor/js/',
  coffee: config.src + 'coffee/',
  srcStylus: config.src + 'stylus/app*.styl',
  srcJs: [config.src + 'js/helpers/_*.js', config.src + 'js/modules/_*.js'],
  srcCoffee: [config.src + 'coffee/helpers/_*.coffee', config.src + 'coffee/modules/_*.coffee'],
  srcJade: config.src + 'jade/pages/**/*.jade',
  srcImg: config.src + 'img/*',
  styles: config.src + 'stylus/',
  locale: config.src + 'locale/'+ config.language +'.json',
  jade: config.src + 'jade/'
};

var printChanged = function(changedFile) {
  if (changedFile) {
    gutil.log(gutil.colors.blue(changedFile));
  }
};

var generalCallback = function(error, stdout, stderr) {
  printChanged(changedFile);

  if (error) {
    gutil.log(gutil.colors.red('exec error: ' + error));
  }
  if (changedFile != config.styleguide && defaultTasks.indexOf('stylint') > -1) {
    generateStyleguide(); 
  }

};

var getLocals = function() {
  locals = merge({'config': config}, require(paths.locale));
  return merge({'paths': paths}, locals);
};

var getPage = function(req){
  if (req.params[0].indexOf('home/') != -1) {
    req.params[0] = 'index';
  }
  var page = req.params[0];
  return page.replace('.html', '');
};

var contains = function(haystack, needle) {
  return haystack.indexOf(needle) > -1;
};

var stream = function(ls, task) {
  var error = false;

  ls.stdout.on('data', function (data) {
    gutil.log(''+data);
  });

  ls.stderr.on('data', function (data) {
    error = true;
    gutil.log(gutil.colors.red(''+data));
  });

  ls.on('close', function (code) {
    gutil.log(gutil.colors.yellow('Finished with code (1/error occurred, 0/no error): ' + code));
    if (!error && task) {
      ls = spawn('gulp', [task]);
      stream(ls);
    }
  });
};

process.argv.forEach(function (val, index, array) {
  var arg = '';
  switch(val) {
    case '-stylus': 
      featureEnabled.style = 'stylus';
    break;
    case '-js':
      config.jsLang = 'js';
    break;
    case '-lr':
      arg = val; 
      gutil.log('livereload/browser-sync...');
      featureEnabled.lr = 'lr';
    break;
    case '-img':
      imagemin = require('gulp-imagemin')
      arg = val; 
      defaultTasks.push('images');
    break;
    case '-maps':
      arg = val; 
      featureEnabled.maps = true;
    break;
    case '-con':
      arg = val;
      featureEnabled.noserver = true;
    break;
    case '-f':
      config.singleJade = true;
    break;
    case '-deploy':
    case '-d':
      arg = val;
      locals.host = config.deployHost;
      featureEnabled.deploy = true;
    break;
    default:
      if (contains(val, 'port='))
        config.port = parseInt(val.split('=')[1]);
    break;
  }
  if (index >= 2)
    inputArguments.push(arg);
});

gulp.task('images', function() {
  return gulp.src(paths.srcImg)
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(paths.img));
});

gulp.task('stylus', function() {
    gulp.src(paths.srcStylus)
    .pipe(stylus({
      use: [nib(), kouto()],
      import:['nib'],
      compress: true
    }))
    .on('error', gutil.log)
    .pipe(toggle(insert.prepend, featureEnabled.deploy, {params: config.header, name: 'deploy - css header'}))
    .pipe(gulp.dest(paths.css));
});

gulp.task('stylus-success', function() {
  run('stylus');
  generateStyleguide();
});

gulp.task('stylint', function() {
  ls = spawn('npm', ['run', 'stylint']);
  stream(ls, 'stylus-success');
});

/* Jade */

var jadePathIsSet = function(path) {
  var pos = path.indexOf(config.moduleTag),
  tagLength = config.moduleTag.length;
  if (pos > -1) {
    var pos2 = path.indexOf(config.moduleTag, (pos+tagLength)),
    start = pos + tagLength;
    if (pos2 > -1)
      return path.substr(start, pos2 - start);
    else 
      return false;

  } else {
    return false;
  }
};

var getJadePath = function() {
  var _path = config._jadePath || paths.srcJade,
  file = process.argv[3];
  _path = config.singleJade ? paths.jade + 'pages/' + file.split('=')[1] : _path;
  gutil.log(gutil.colors.yellow(_path));
  config._jadePath = _path;
  return _path;
};

gulp.task('jade', function() {
  
  var _path = getJadePath(),
  _build = paths.build,
  _root =  config.root,
  _locals = getLocals(),
  folderName = jadePathIsSet(_path);

  if (folderName) {
    _build += folderName + '/';
    _root = config.root2;
    ls = spawn('mkdir', ['-p', _build]);
    stream(ls);
  }

  gulp.src(_path)
    .pipe(jade({
      locals: merge({_root: _root}, locals),
      pretty: true
    }))
    .on('error', gutil.log)
    .pipe(rename(function (path) {
      var fn = jadePathIsSet(path.dirname);
      if (fn) {
        path.dirname = fn;
      }
    }))
    .pipe(gulp.dest(_build));
});

/* End Jade */

var unsetBusy = function() {
  setBusy('0');
};

var setBusy = function(busy) {
  fs.writeFile(config.busy, '{ "busy": "'+busy+'"}', function (err) {
    if (err)
      gutil.log(gutil.colors.red(err));
  });
};

var getBusy = function() {
  return require(config.busy).busy;
};

var reload = function(file) {
  if (file.indexOf('/'+config.firstPage) > -1) {
    bs.reload(paths.build+config.home);
  }
  setTimeout(function() {
    if (bs && (getBusy() == '0')) {
      bs.reload(['*.css', '*.js']);
    }
    config._jadePath = null;
  }, 2000);
};

var initServerBase = function(ops) {
  ops = ops || featureEnabled;
  if (ops.lr && !bs) {
    bs = require('browser-sync')({
      logPrefix: config.name,
      logSnippet: false,
      port: 8080
    }); 
    app.use(require('connect-browser-sync')(bs));
    bs.watch(paths.build + '**').on('change', reload);
    bs.reload();
  }

  app.use(logger('dev'));
  app.use(express.static(__dirname + '/build/'));
  app.set('views', path.join(__dirname, paths.jade + 'pages/'));
  app.set('view engine', 'jade');
  var render = function(req, res) {
    var page = getPage(req),
    _locals = getLocals(),
    _root = jadePathIsSet(page) ? config.root2 : config.root;
    var data = merge({page: page, _root: _root}, _locals);
    res.render(page, data);
  };
  app.get('/*', function (req, res) {
    render(req, res);
  });
  app.post('/*', function (req, res) {
    render(req, res);
  });

  /* Handle errors */
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('index', merge(getLocals(), {
        message: err.message,
        error: err,
        _root: jadePathIsSet(req.baseUrl) ? config.root2 : config.root
    }));
  });
};

gulp.task('server', function(cb) {

  if (!featureEnabled.noserver) {

    gutil.log(gutil.colors.yellow('Starting server...'));
    config.port = process.env.PORT || config.port;

    var portOps = 'PORT=' + config.port, ls = null,
    spawnOps = [portOps, './node_modules/.bin/nodemon', './bin/www', '--ignore', 'build/', '--ignore', 'node_modules',  '--ignore', 'src/', featureEnabled.lr];

    if (config.port == 80) {
      ls = spawn('sudo', spawnOps);
    } else {
      process.env.PORT = config.port;
      ls = spawn('./node_modules/.bin/nodemon', spawnOps.slice(2));
    }
    stream(ls);
  } else {
    initServerBase();
  }

});

gulp.task('coffee', function() {
  return gulp.src(paths.srcCoffee) /* Use an array of files instead if need to concat in order. e.g gulp.src(['_file1.coffee', '_file2.coffee']) */
    .pipe(toggle(sourcemaps.init, featureEnabled.maps))
      .pipe(coffee({ bare: true }).on('error', gutil.log))
      .pipe(toggle(uglify, featureEnabled.deploy, {name: 'deploy - uglifyjs'}))
      .pipe(concat(config.jsFile))
      .pipe(toggle(insert.prepend, featureEnabled.deploy, {params: config.header + '\n(function(){"use strict";', name: 'deploy - wrap prepend'}))
      .pipe(toggle(insert.append, featureEnabled.deploy, {params: '\n})();', name: 'deploy - wrap append'}))
    .pipe(toggle(sourcemaps.write, featureEnabled.maps, {params: '../maps', name: 'source maps'}))
    .pipe(gulp.dest(paths.buildJs));
});

gulp.task('js', function() {
  return gulp.src(paths.srcJs)
    .pipe(toggle(sourcemaps.init, featureEnabled.maps))
    .pipe(jshint({ 
      unused: true, 
      camelcase: true,
      esnext: true,
      indent: 2, 
      globals: ['$']
    }))
    .pipe(jshint.reporter(stylish))
    // .pipe(jshint.reporter('fail'))
    .on('error', gutil.log)
    .pipe(babel({
      presets: ['es2015']
    }))
    .on('error', gutil.log)
    .pipe(toggle(uglify, featureEnabled.deploy, {name: 'deploy - uglifyjs'}))
    .pipe(concat(config.jsFile))
    .pipe(toggle(insert.prepend, featureEnabled.deploy, {params: config.header + '\n(function(){"use strict";', name: 'deploy - wrap prepend'}))
    .pipe(toggle(insert.append, featureEnabled.deploy, {params: '\n})();', name: 'deploy - wrap append'}))
    .pipe(gulp.dest(paths.buildJs))
    .pipe(uglify())
    .pipe(rename("app.min.js"))
    .pipe(gulp.dest(paths.buildJs));
});

gulp.task('vendor-js', function() {
  exec('cat '+ paths.vendorJs +'*.js | uglifyjs -m -c > '+ paths.buildJs +'vendor.min.js', generalCallback);
});

gulp.task('watch-vendor', function() {
  watch(paths.vendorJs, function(file) {
    changedFile = file;
    unsetBusy();
    gulp.start('vendor-js');
  });
});

gulp.task('watch-all', function() {
  watch(paths.jade, function(file) {
    printChanged(file);
    
    if (((file.match(/\//g) || []).length >= 3)) {
      setBusy("1");
      var folderName = jadePathIsSet(file);
      if (folderName) {
        config._jadePath = paths.jade + 'pages/'+config.moduleTag+ folderName +config.moduleTag+'/*.jade';
      }
      gutil.log(gutil.colors.blue('Partial file...'));
    }
    else {
      unsetBusy();
      config._jadePath = config.root + file;
    }
    gulp.start('jade');
  });
  watch(paths.styles, function(file) {
    printChanged(file);
    unsetBusy();
    gulp.start([featureEnabled.style]);
  });
  watch(paths[config.jsLang], function(file) {
    changedFile = file;
    unsetBusy();
    gulp.start([config.jsLang]);
  });
});

gulp.task('locale', function() {
  watch(paths.locale, function(file) {
    printChanged(file);
    ls = spawn('gulp', ['jade']);
    stream(ls);
  });
});

gulp.task('default', defaultTasks);

unsetBusy();

app.init = initServerBase;
module.exports = app;