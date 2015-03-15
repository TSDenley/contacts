/*
* API - performs DB operations and sends data for front end app.
*/
var express = require('express'),
	Bourne = require('bourne'),
	bodyParser = require('body-parser'),
	db = new Bourne('data.json'),
	router = express.Router();

router
	.use(function (req, res, next) {
		if (!req.user) req.user = { id: 1 };
		next();
	})
	.use(bodyParser.json())
	.route('/contact')
		// Get all contacts
		.get(function (req, res) {
			db.find({ userId: parseInt(req.user.id, 10) }, function (err, data) {
				res.json(data);
			});
		})
		// Add a new contact
		.post(function (req, res) {
			var contact = req.body;
			contact.userId = req.user.id;

			db.insert(contact, function (err, data) {
				res.json(data);
			});
		});

router
	.param('id', function (req, res, next) {
		req.dbQuery = { id: parseInt(req.params.id, 10) };
		next();
	})
	.route('/contact/:id')
		// Get a single contact
		.get(function (req, res) {
			db.findOne(req.dbQuery, function (err, data) {
				res.json(data);
			});
		})
		// Update a contact
		.put(function (req, res) {
			var contact = req.body;
			delete contact.$promise;
			delete contact.$resolved;

			db.update(res.dbQuery, contact, function (err, data) {
				res.json(data[0]);
			});
		})
		// Delete a contact
		.delete(function (req, res) {
			db.delete(req.dbQuery, function () {
				res.json(null);
			});
		});

module.exports = router;
