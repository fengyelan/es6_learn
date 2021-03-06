'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by yuanlan on 2016/10/11.
 */
$(function () {
    var _marked = [helloWorldGenerator].map(_regenerator2.default.mark);

    function helloWorldGenerator() {
        return _regenerator2.default.wrap(function helloWorldGenerator$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return 'hello';

                    case 2:
                        _context.next = 4;
                        return 'world';

                    case 4:
                        return _context.abrupt('return', 'ending');

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked[0], this);
    }

    var hw = helloWorldGenerator();
    console.log(hw.next());
    console.log(hw.next());
    console.log(hw.next());
});