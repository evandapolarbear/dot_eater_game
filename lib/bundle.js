/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game = __webpack_require__(1);
	
	var _game_view = __webpack_require__(6);
	
	var _game_view2 = _interopRequireDefault(_game_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	  var game = void 0,
	      ctx = void 0;
	
	  var canvas = document.getElementById('canvas');
	  var startModal = document.getElementById('opening-modal');
	  var endModal = document.getElementById('ending-modal');
	  var pauseButton = document.getElementById("pause-button");
	
	  document.addEventListener("DOMContentLoaded", function () {
	    canvas.width = _game.gameVars.X_SIZE;
	    canvas.height = _game.gameVars.X_SIZE;
	
	    ctx = canvas.getContext("2d");
	    game = new _game_view2.default(ctx);
	    game.start();
	  });
	
	  document.getElementById('start-button').addEventListener("click", function () {
	    canvas.classList.remove('opening-hide');
	    startModal.classList.add('hidden');
	
	    game.end();
	
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	    ctx = canvas.getContext("2d");
	    game = new _game_view2.default(ctx);
	    game.start();
	  });
	
	  document.getElementById('start-over-button').addEventListener("click", function () {
	
	    canvas.classList.remove('opening-hide');
	    endModal.classList.add('hidden');
	
	    game.end();
	
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	    ctx = canvas.getContext("2d");
	    game = new _game_view2.default(ctx);
	
	    _game.gameVars['level'] = 1;
	    _game.gameVars['score'] = 0;
	
	    game.game.updateScore();
	
	    game.start();
	  });
	
	  document.getElementById("pause-button").addEventListener('click', function () {
	
	    if (!game.paused) {
	      game.paused = true;
	      pauseButton.innerHTML = "play";
	    } else {
	      game.paused = false;
	      pauseButton.innerHTML = "pause";
	    }
	  });
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.gameVars = exports.Game = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	var _cells = __webpack_require__(3);
	
	var _cells2 = _interopRequireDefault(_cells);
	
	var _player_cell = __webpack_require__(5);
	
	var _player_cell2 = _interopRequireDefault(_player_cell);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = exports.Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.moveObjects = this.moveObjects.bind(this);
	    this.collisionCheck = this.collisionCheck.bind(this);
	    this.addPlayerCell = this.addPlayerCell.bind(this);
	    this.addMoreCells = this.addMoreCells.bind(this);
	
	    var playerStart = _utils.Util.randomPosition(gameVars.X_SIZE, gameVars.Y_SIZE);
	    this.playerCell = new _player_cell2.default({ pos: playerStart, vel: [0, 0] });
	
	    this.cells = [];
	    this.addPlayerCell();
	    this.cells = this.cells.concat(this.addCells());
	  }
	
	  _createClass(Game, [{
	    key: 'addCells',
	    value: function addCells() {
	      this.keyBindings();
	      var cells = [];
	
	      var i = 0;
	
	      while (i < gameVars.NUM_CELLS) {
	        var cellVel = _utils.Util.randomVelocity();
	        var cellPos = _utils.Util.randomPosition(gameVars.X_SIZE, gameVars.Y_SIZE);
	        var cellRad = _utils.Util.randomRadius();
	
	        var newCell = new _cells2.default({ vel: cellVel, pos: cellPos, radius: cellRad });
	
	        if (_utils.Util.clearsPlayerCell(this.playerCell, newCell)) {
	          cells.push(newCell);
	          i++;
	        }
	      }
	      return cells;
	    }
	  }, {
	    key: 'addPlayerCell',
	    value: function addPlayerCell() {
	
	      for (var i = 0; i < this.cells.length; i++) {}
	
	      var playerStart = _utils.Util.randomPosition(gameVars.X_SIZE, gameVars.Y_SIZE);
	      this.cells.push(this.playerCell);
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.clearRect(0, 0, gameVars.X_SIZE, gameVars.Y_SIZE);
	      this.cells.forEach(function (cell) {
	        cell.draw(ctx);
	      });
	    }
	  }, {
	    key: 'moveObjects',
	    value: function moveObjects() {
	      this.cells.forEach(function (cell) {
	        cell.revector();
	        cell.move(cell.vel);
	      });
	    }
	  }, {
	    key: 'collisionCheck',
	    value: function collisionCheck() {
	      for (var i = 0; i < this.cells.length; i++) {
	        for (var j = 0; j < this.cells.length; j++) {
	          var cell1 = this.cells[i];
	          var cell2 = this.cells[j];
	
	          if (i !== j && cell1.isColliding(cell2)) {
	            this.eat(cell1, cell2, i, j);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'eat',
	    value: function eat(cell1, cell2, cell1Idx, cell2Idx) {
	      if (cell1.radius === cell2.radius) {
	        return;
	      } else if (cell1.radius < cell2.radius) {
	        if (cell2 === this.playerCell) {
	          gameVars.score += cell1.radius;
	        } else if (cell1 === this.playerCell) {
	          var modal = document.getElementById('ending-modal');
	          var canvas = document.getElementById("canvas");
	          var opening = document.getElementById('opening-modal');
	
	          console.log(opening.classList.contains('hidden'));
	          if (opening.classList.contains('hidden')) {
	            canvas.classList.add('opening-hide');
	            modal.classList.remove('hidden');
	          }
	        }
	
	        cell2.radius += cell1.radius;
	        this.cells.splice(cell1Idx, 1);
	      }
	    }
	  }, {
	    key: 'updateScore',
	    value: function updateScore() {
	      document.getElementById('score-counter').innerHTML = "Score: " + Math.floor(gameVars.score);
	      document.getElementById("level-counter").innerHTML = 'Level: ' + gameVars.level;
	    }
	  }, {
	    key: 'step',
	    value: function step(ctx) {
	      this.collisionCheck();
	      this.updateScore();
	      this.moveObjects();
	      this.draw(ctx);
	      this.addMoreCells();
	    }
	  }, {
	    key: 'addMoreCells',
	    value: function addMoreCells() {
	      var _this = this;
	
	      if (this.cells.length < 3) {
	
	        this.fadeOut();
	
	        setTimeout(function () {
	          return _this.fadeIn();
	        }, 2000);
	
	        gameVars.level += 1;
	        document.getElementById("level-counter").innerHTML = 'Level: ' + gameVars.level;
	
	        setTimeout(function () {
	          _this.playerCell.vel[0] = 0;
	          _this.playerCell.vel[1] = 0;
	
	          _this.cells.map(function (cell) {
	            cell.radius = 30;
	            return cell;
	          });
	          _this.cells = _this.cells.concat(_this.addCells());
	        }, 2000);
	      }
	    }
	  }, {
	    key: 'fadeOut',
	    value: function fadeOut() {
	      var canvas = document.getElementById('canvas');
	      canvas.classList.add('faded');
	    }
	  }, {
	    key: 'fadeIn',
	    value: function fadeIn() {
	      var canvas = document.getElementById('canvas');
	      canvas.classList.remove('faded');
	    }
	  }, {
	    key: 'keyBindings',
	    value: function keyBindings() {
	      var _this2 = this;
	
	      key('w', function () {
	        return _this2.playerCell.navigate([0, -1]);
	      });
	      key('s', function () {
	        return _this2.playerCell.navigate([0, 1]);
	      });
	      key('a', function () {
	        return _this2.playerCell.navigate([-1, 0]);
	      });
	      key('d', function () {
	        return _this2.playerCell.navigate([1, 0]);
	      });
	    }
	  }]);
	
	  return Game;
	}();
	
	var gameVars = exports.gameVars = {
	  X_SIZE: window.innerWidth,
	  Y_SIZE: window.innerHeight,
	  NUM_CELLS: 10,
	  level: 1,
	  score: 0
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Util = exports.Util = {
	  randomPosition: function randomPosition(dimX, dimY) {
	    return [Math.random() * dimX, Math.random() * dimY];
	  },
	  randomVelocity: function randomVelocity() {
	    var x = Math.random() < .5 ? -1 : 1;
	    var y = Math.random() < .5 ? -1 : 1;
	    return [Math.random() * x, Math.random() * y];
	  },
	  randomRadius: function randomRadius() {
	    var possibles = [10, 15, 20, 50, 60];
	
	    var zeroToOne = Math.random();
	    var rad = possibles[Math.floor(zeroToOne * 5)];
	    return rad;
	  },
	  dist: function dist(cell1, cell2) {
	    var xD = Math.abs(cell1.pos[0] - cell2.pos[0]);
	    var yD = Math.abs(cell1.pos[1] - cell2.pos[1]);
	    return Math.sqrt(xD * xD + yD * yD);
	  },
	  clearsPlayerCell: function clearsPlayerCell(player, cell) {
	    var dist = this.dist(player, cell);
	    return dist > player.radius + cell.radius + 80;
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_objects = __webpack_require__(4);
	
	var _moving_objects2 = _interopRequireDefault(_moving_objects);
	
	var _game = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Cell = function (_MovingObject) {
	  _inherits(Cell, _MovingObject);
	
	  function Cell(options) {
	    _classCallCheck(this, Cell);
	
	    options.color = '#2c4f87';
	    return _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this, options));
	  }
	
	  _createClass(Cell, [{
	    key: 'revector',
	    value: function revector() {
	      if (this.pos[0] <= 0 || this.pos[0] >= _game.gameVars.X_SIZE) {
	        this.vel[0] = this.vel[0] * -1;
	      } else if (this.pos[1] <= 0 || this.pos[1] >= _game.gameVars.Y_SIZE) {
	        this.vel[1] = this.vel[1] * -1;
	      }
	    }
	  }]);
	
	  return Cell;
	}(_moving_objects2.default);
	
	exports.default = Cell;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(1);
	
	var _utils = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MovingObject = function () {
	  function MovingObject(options) {
	    _classCallCheck(this, MovingObject);
	
	    this.pos = options.pos;
	    this.vel = options.vel;
	    this.radius = options.radius;
	    this.color = options.color;
	    this.game = options.game;
	    this.isWrappable = true;
	  }
	
	  _createClass(MovingObject, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = this.color;
	
	      ctx.beginPath();
	      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
	      ctx.fill();
	    }
	  }, {
	    key: 'move',
	    value: function move(vel) {
	      this.pos[0] += this.vel[0];
	      this.pos[1] += this.vel[1];
	    }
	  }, {
	    key: 'revector',
	    value: function revector() {
	      if (this.pos[0] <= 0 || this.pos[0] >= _game.gameVars.X_SIZE) {
	        this.vel[0] = this.vel[0] * -1;
	      } else if (this.pos[1] <= 0 || this.pos[1] >= _game.gameVars.Y_SIZE) {
	        this.vel[1] = this.vel[1] * -1;
	      }
	    }
	  }, {
	    key: 'isColliding',
	    value: function isColliding(otherCell) {
	      if (this === undefined || otherCell === undefined) {
	        return;
	      }
	      var dist = _utils.Util.dist(this, otherCell);
	      return dist < this.radius + otherCell.radius;
	    }
	  }]);
	
	  return MovingObject;
	}();
	
	exports.default = MovingObject;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_objects = __webpack_require__(4);
	
	var _moving_objects2 = _interopRequireDefault(_moving_objects);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PlayerCell = function (_MovingObject) {
	  _inherits(PlayerCell, _MovingObject);
	
	  function PlayerCell(options) {
	    _classCallCheck(this, PlayerCell);
	
	    options.vel = [0, 0];
	    options.color = "#ea5252";
	    options.radius = 30;
	
	    var _this = _possibleConstructorReturn(this, (PlayerCell.__proto__ || Object.getPrototypeOf(PlayerCell)).call(this, options));
	
	    _this.navigate = _this.navigate.bind(_this);
	    return _this;
	  }
	
	  _createClass(PlayerCell, [{
	    key: "navigate",
	    value: function navigate(key) {
	
	      if (this.speedLimiter(this.vel[0], key[0])) {
	        this.vel[0] += key[0];
	      }
	
	      if (this.speedLimiter(this.vel[1], key[1])) {
	        this.vel[1] += key[1];
	      }
	    }
	  }, {
	    key: "speedLimiter",
	    value: function speedLimiter(vel, move) {
	      var speedLimit = 2;
	
	      if (vel < speedLimit && vel > -speedLimit || vel + move < speedLimit && vel + move > -speedLimit) {
	        return true;
	      }
	      return false;
	    }
	  }]);
	
	  return PlayerCell;
	}(_moving_objects2.default);
	
	exports.default = PlayerCell;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameView = function () {
	  function GameView(ctx) {
	    _classCallCheck(this, GameView);
	
	    this.ctx = ctx;
	    this.game = new _game.Game();
	    this.paused = false;
	    this.stillPlaying = true;
	  }
	
	  _createClass(GameView, [{
	    key: 'start',
	    value: function start() {
	      var _this = this;
	
	      setInterval(function () {
	        if (!_this.paused && _this.stillPlaying) {
	          _this.game.step(_this.ctx);
	          _this.game.draw(_this.ctx);
	
	          if (_this.game.cells.length < 3) {
	            _this.paused = true;
	            setTimeout(function () {
	              _this.game.step(_this.ctx);
	            }, 2005);
	
	            setTimeout(function () {
	              _this.paused = false;
	            }, 4000);
	          }
	        }
	      }, 20);
	    }
	  }, {
	    key: 'end',
	    value: function end() {
	      this.stillPlaying = false;
	    }
	  }, {
	    key: 'fadeOut',
	    value: function fadeOut() {
	      var canvas = document.getElementById('canvas');
	      canvas.classList.add('faded');
	    }
	  }, {
	    key: 'fadeIn',
	    value: function fadeIn() {
	      var canvas = document.getElementById('canvas');
	      canvas.classList.remove('faded');
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.default = GameView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map