(function () {
    var defines = {};
    var entry = [null];
    function define(name, dependencies, factory) {
        defines[name] = { dependencies: dependencies, factory: factory };
        entry[0] = name;
    }
    define("require", ["exports"], function (exports) {
        Object.defineProperty(exports, "__cjsModule", { value: true });
        Object.defineProperty(exports, "default", { value: function (name) { return resolve(name); } });
    });
    define("view/emptyGrid", ["require", "exports"], function (require, exports) {
        "use strict";
        exports.__esModule = true;
        var emptyGrid = /** @class */ (function () {
            function emptyGrid() {
                this.height = window.innerHeight;
                this.width = window.innerWidth - 200;
                this.cellSizeWidth = this.width / 52;
                this.cellSizeHeight = this.height / 52;
                this.canvas = document.getElementById('canvas');
                this.canvas.width = this.width;
                this.canvas.height = this.height;
                this.ctx = this.canvas.getContext("2d");
            }
            ;
            emptyGrid.prototype.drawBase = function (x, y) {
                var img = document.createElement("img");
                img.src = "https://res.cloudinary.com/phonecasemaggie/image/upload/v1550860699/TanksAsserts/flag_ukraine_36335.png";
                this.ctx.drawImage(img, (x * 4 * this.cellSizeWidth), (y * 4 * this.cellSizeHeight), this.cellSizeWidth * 4, this.cellSizeHeight * 4);
            };
            ;
            emptyGrid.prototype.DrawBrick = function (x, y) {
                var img = document.createElement("img");
                img.src = "https://res.cloudinary.com/phonecasemaggie/image/upload/v1550848759/TanksAsserts/crateWood.png";
                this.ctx.drawImage(img, x * this.cellSizeWidth, y * this.cellSizeHeight, this.cellSizeWidth, this.cellSizeHeight);
            };
            ;
            emptyGrid.prototype.DrawHardBrick = function (x, y) {
                var img = document.createElement("img");
                img.src = "https://res.cloudinary.com/phonecasemaggie/image/upload/v1550848848/TanksAsserts/crateMetal.png";
                this.ctx.drawImage(img, x * this.cellSizeWidth, y * this.cellSizeHeight, this.cellSizeWidth, this.cellSizeHeight);
            };
            ;
            emptyGrid.prototype.DrawGreen = function (x, y) {
                var img = document.createElement("img");
                img.src = "https://res.cloudinary.com/phonecasemaggie/image/upload/v1550849482/TanksAsserts/favicon-6.ico";
                this.ctx.drawImage(img, x * this.cellSizeWidth, y * this.cellSizeHeight, this.cellSizeWidth, this.cellSizeHeight);
            };
            ;
            emptyGrid.prototype.DrawRoad = function (x, y) {
                var img = document.createElement("img");
                img.src = "https://res.cloudinary.com/phonecasemaggie/image/upload/v1550844835/TanksAsserts/Road.png";
                this.ctx.drawImage(img, x * this.cellSizeWidth, y * this.cellSizeHeight, this.cellSizeWidth, this.cellSizeHeight);
            };
            ;
            emptyGrid.prototype.drawGrid = function (map) {
                for (var j = 0; j < 52; j++) {
                    for (var i = 0; i < 52; i++) {
                        switch (map[j][i]) {
                            case 0:
                                this.DrawRoad(i, j);
                                break;
                            case 1:
                                this.DrawBrick(i, j);
                                break;
                            case 2:
                                this.DrawHardBrick(i, j);
                                break;
                            case 3:
                                this.DrawRoad(i, j);
                                this.DrawGreen(i, j);
                                break;
                        }
                    }
                }
            };
            return emptyGrid;
        }());
        exports.emptyGrid = emptyGrid;
    });
    define("app", ["require", "exports"], function (require, exports) {
        "use strict";
        exports.__esModule = true;
        var screenLog = document.querySelector('#screen-log');
        document.addEventListener('click', logKey);
        function logKey(e) {
            console.log("Screen X/Y: " + e.screenX + ", " + e.screenY);
            console.log("Client X/Y: " + e.clientX + ", " + e.clientY);
        }
    });
    
    'marker:entry';

    function get_define(name) {
        if (defines[name]) {
            return defines[name];
        }
        else if (defines[name + '/index']) {
            return defines[name + '/index'];
        }
        else {
            var dependencies = ['exports'];
            var factory = function (exports) {
                try {
                    Object.defineProperty(exports, "__cjsModule", { value: true });
                    Object.defineProperty(exports, "default", { value: require(name) });
                }
                catch (_a) {
                    throw Error(['module ', name, ' not found.'].join(''));
                }
            };
            return { dependencies: dependencies, factory: factory };
        }
    }
    var instances = {};
    function resolve(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (name === 'exports') {
            return {};
        }
        var define = get_define(name);
        instances[name] = {};
        var dependencies = define.dependencies.map(function (name) { return resolve(name); });
        define.factory.apply(define, dependencies);
        var exports = dependencies[define.dependencies.indexOf('exports')];
        instances[name] = (exports['__cjsModule']) ? exports["default"] : exports;
        return instances[name];
    }
    if (entry[0] !== null) {
        return resolve(entry[0]);
    }
})();