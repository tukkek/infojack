define('app',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);
  };
});
define('empty',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Example = exports.Example = function Example() {
        _classCallCheck(this, Example);
    };
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('infojack-mainmenu',['exports', 'aurelia-framework', './modules/sound', './modules/save'], function (exports, _aureliaFramework, _sound, _save) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MainMenu = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var MainMenu = exports.MainMenu = (_dec = (0, _aureliaFramework.inject)(_sound.Sound, _save.Save), _dec(_class = function () {
        function MainMenu(sound, save) {
            _classCallCheck(this, MainMenu);

            this.sound = sound;
            this.save = save;

            this.hide = false;
        }

        MainMenu.prototype.showpending = function showpending() {
            this.sound.play(this.sound.ERROR);
            setTimeout(function () {
                alert('Operation pending!');
            }, 100);
        };

        MainMenu.prototype.startgame = function startgame() {
            if (confirm('Are you sure you want to start a new game? Any previous progress will be lost!')) {
                this.save.clear();
                this.save.save();
                alert('Game started');
                this.hide = true;
            }
        };

        MainMenu.prototype.loadgame = function loadgame() {
            if (!this.save.load()) {
                this.playerrorsound("No save game found! Please check you're using the exact same address as before!");
            }
        };

        MainMenu.prototype.openrepository = function openrepository() {
            window.open('https://github.com/tukkek/infojack');
        };

        return MainMenu;
    }()) || _class);
});
define('infojack-radio',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Radio = exports.Radio = function () {
        function Radio() {
            _classCallCheck(this, Radio);

            this.active = false;
        }

        Radio.prototype.play = function play() {
            this.audio.play();
            if (!this.active) {
                this.audio.play();
            } else {
                this.audio.pause();
            }
            return true;
        };

        return Radio;
    }();
});
define('infojack-topmenu',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var TopMenu = exports.TopMenu = function () {
        function TopMenu() {
            _classCallCheck(this, TopMenu);

            this.hideradio = true;
        }

        TopMenu.prototype.open = function open() {
            this.hideradio = !this.hideradio;
        };

        return TopMenu;
    }();
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/save',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Save = exports.Save = function () {
        function Save() {
            _classCallCheck(this, Save);
        }

        Save.prototype.load = function load() {
            var data = localStorage.getItem('infojack-save');
            if (data === null) {
                return false;
            }
            this.populate(data);
            this.initialize();
            return true;
        };

        Save.prototype.populate = function populate(data) {};

        Save.prototype.initialize = function initialize() {};

        Save.prototype.clear = function clear() {
            localStorage.setItem('infojack-save', null);
        };

        Save.prototype.save = function save() {
            localStorage.setItem('infojack-save', 'something');
        };

        return Save;
    }();
});
define('modules/sound',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Sound = exports.Sound = function () {
        function Sound() {
            _classCallCheck(this, Sound);

            this.PREFIX = '../../sounds/';
            this.ERROR = 'Computer Error Alert-SoundBible.com-783113881.mp3';
        }

        Sound.prototype.play = function play(file) {
            new Audio(this.PREFIX + file).play();
        };

        return Sound;
    }();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!empty.css', ['module'], function(module) { module.exports = " \n"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./infojack-topmenu\"></require><require from=\"./infojack-mainmenu\"></require><top-menu></top-menu><main-menu></main-menu></template>"; });
define('text!infojack-mainmenu.css', ['module'], function(module) { module.exports = "div{text-align:center;}\nhr{width:50%;} \n#mainmenu{z-index:-1;}\n"; });
define('text!empty.html', ['module'], function(module) { module.exports = "<template><require from=\"./infojack-example.css\"></require></template>"; });
define('text!infojack-radio.css', ['module'], function(module) { module.exports = "#radio-container{\n    display:inline;\n    position:fixed;\n    right:2em;\n    top:4em;\n    text-align:center;\n    padding:.5em;\n    z-index:2;\n}\n#radio-control{\n    margin-bottom:1em;\n} \n"; });
define('text!infojack-mainmenu.html', ['module'], function(module) { module.exports = "<template><require from=\"./infojack-mainmenu.css\"></require><div class=\"centered center panel\" id=\"mainmenu\" hidden.bind=\"hide\"><h1>Infojack</h1><hr><div><button click.trigger=\"startgame()\">Start new game</button></div><div><button click.trigger=\"loadgame()\">Load saved game</button></div><div><button click.trigger=\"showpending()\">How to play</button></div><div><button click.trigger=\"openrepository()\">Source code</button></div><hr></div></template>"; });
define('text!infojack-topmenu.css', ['module'], function(module) { module.exports = "#topmenu img{\n    height:1.5em;\n    cursor:pointer;\n    margin:0em .25em 0em .25em;\n}\n#topmenu {\n    position:fixed;\n    right:2em;\n    top:1em;\n    background-color:lightgrey;\n    border:.25em solid lightgrey;\n    border-radius:1em;\n}\n"; });
define('text!infojack-radio.html', ['module'], function(module) { module.exports = "<template><require from=\"./infojack-radio.css\"></require><div id=\"radio-container\" class=\"panel\"><audio id=\"radio-player\" type=\"audio/mpeg\" src=\"http://ice1.somafm.com/defcon-128-mp3\" preload=\"none\" ref=\"audio\"></audio><div id=\"radio-control\"><input ref=\"radioactive\" type=\"checkbox\" click.trigger=\"play()\" checked.bind=\"active\"> Enable music</div><div>Audio courtesy of <a href=\"https://somafm.com/defcon/directstreamlinks.html\">DEF CON radio</a></div></div></template>"; });
define('text!infojack.css', ['module'], function(module) { module.exports = "body{\n    background-color: #161616;\n    color:lightgray;\n    font-family:Orbitron;\n}\na{\n    color:lightblue;\n}\n.panel{\n    background-color:#357c2b;\n    border:.3em solid #383838;\n    border-radius:1em;\n    border-style:groove;\n}\n.center{\n    margin: auto;\n    width: 50%;\n    padding: 1em;\n    padding: 1em;\n    position:absolute;\n    top:25%;\n    left:25%;\n    right:25%;\n    bottom:25%;\n}\nh1{\n    color:darkgreen;\n    font-size:3em;\n    text-shadow: 0.025em .025em black;\n    font-family:Orbitron;\n}\nbutton {\n    cursor: pointer;\n    background-color: black;\n    color: white;\n    border: none;\n    margin: .1em;\n    padding: .3em;\n    font-weight: 800;\n    font-family:Orbitron;\n    width:50%;\n    outline:0;\n}\n\nbutton:hover {\n    background-color: #4CAF50;\n    color: white;\n    border: .2em solid black ;\n    padding:.15em;\n}\nhr{ border-color:gray;}\n"; });
define('text!infojack-topmenu.html', ['module'], function(module) { module.exports = "<template><require from=\"./infojack-topmenu.css\"></require><require from=\"./infojack-radio\"></require><div id=\"topmenu\"><img src=\"./images/note.png\" click.trigger=\"open()\" title=\"Music On/Off\"><div><radio hidden.bind=\"hideradio\"></radio></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map