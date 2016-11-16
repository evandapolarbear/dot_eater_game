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
	
	var _game_view = __webpack_require__(2);
	
	var _game_view2 = _interopRequireDefault(_game_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById("canvas");
	  canvas.width = _game.gameVars.X_SIZE;
	  canvas.height = _game.gameVars.X_SIZE;
	
	  var ctx = canvas.getContext("2d");
	  var game = new _game_view2.default(ctx);
	  game.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.gameVars = exports.Game = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(3);
	
	var _cells = __webpack_require__(4);
	
	var _cells2 = _interopRequireDefault(_cells);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = exports.Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.cells = this.addCells();
	
	    this.moveObjects = this.moveObjects.bind(this);
	  }
	
	  _createClass(Game, [{
	    key: 'addCells',
	    value: function addCells() {
	      var cells = [];
	
	      for (var i = 0; i < gameVars.NUM_CELLS; i++) {
	        cells.push(new _cells2.default({ vel: _utils.Util.randomVelocity(),
	          pos: _utils.Util.randomPosition(gameVars.X_SIZE, gameVars.Y_SIZE) }));
	      }
	
	      return cells;
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
	        cell.move(cell.vel);
	      });
	    }
	  }, {
	    key: 'step',
	    value: function step(ctx) {
	      this.moveObjects();
	      this.draw(ctx);
	    }
	  }]);
	
	  return Game;
	}();
	
	var gameVars = exports.gameVars = {
	  X_SIZE: 1000,
	  Y_SIZE: 600,
	  NUM_CELLS: 20
	};

/***/ },
/* 2 */
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
	  }
	
	  _createClass(GameView, [{
	    key: 'start',
	    value: function start() {
	      var _this = this;
	
	      setInterval(function () {
	        _this.game.step(_this.ctx);
	        _this.game.draw(_this.ctx);
	      }, 20);
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.default = GameView;

/***/ },
/* 3 */
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
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _moving_objects = __webpack_require__(5);
	
	var _moving_objects2 = _interopRequireDefault(_moving_objects);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Cell = function (_MovingObject) {
	  _inherits(Cell, _MovingObject);
	
	  function Cell(options) {
	    _classCallCheck(this, Cell);
	
	    options.color = "green";
	    options.radius = 20;
	    return _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this, options));
	  }
	
	  return Cell;
	}(_moving_objects2.default);
	
	exports.default = Cell;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	    key: "draw",
	    value: function draw(ctx) {
	      ctx.fillStyle = this.color;
	
	      ctx.beginPath();
	      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
	      ctx.fill();
	    }
	  }, {
	    key: "move",
	    value: function move(vel) {
	      this.pos[0] += this.vel[0];
	      this.pos[1] += this.vel[1];
	    }
	  }]);
	
	  return MovingObject;
	}();
	
	exports.default = MovingObject;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map