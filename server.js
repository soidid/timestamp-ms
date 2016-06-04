'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let app = (0, _express2.default)();
let port = process.env.port || 3000;
app.get('*', function (req, res) {
	console.log(req.path);
	let p = decodeURI(req.path.split('/')[1]);
	if (!p) {
		res.json({
			unix: null,
			natural: null
		});
		res.end();
	} else {

		if (/^[0-9]+$/.test(p)) {
			p = +p * 1000;
		} else {
			p = p + ' 00:00:00 GMT+0000';
		}
		let date = new Date(p);

		res.json({
			unix: date.getTime() / 1000,
			natural: date.toLocaleString('en-us', { month: "long" }) + ' ' + date.getDate() + ', ' + date.getFullYear()
		});
		res.end();
	}
});
app.listen(port, function (err) {
	if (err) {
		console.log('Error');
	}
	console.log('Servering running at port: ' + port);
});
