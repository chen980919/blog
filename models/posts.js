
const db = require ('./db');

exports.add = function () {}

//列表查询逻辑
exports.find = function (page, size, cb) {
	let offset = (page - 1) * size;
	let query = 'SELECT p.id, p.title, p.brief, p.time, u.name, u.avatar FROM posts AS p LEFT JOIN users AS u ON p.uid = u.id LIMIT ?, ?'

	db.query(query, [offset, size], (err, rows) => {
		if(!err) {
			// 调用回调
			return cb(null, rows);
		}
		cb(err);
	})
}

// 删除
exports.deleteByid = function (id, cb) {
	let query = 'DELETE FROM posts WHERE id = ?';
	db.query(query, id, (err) => {
		if(!err) {
			return cb(null);
		}
		cb(err);
	})
}

//添加文章
exports.addPost = function (data, cb) {
	let query = 'INSERT INTO posts SET ?';
	db.query(query, data, (err) => {
		if(!err) {
			return cb(null);
		}
		cb(err);
	})
}

//修改文章
exports.findOne = function (id, cb) {
	let query = "SELECT * FROM posts AS p LEFT JOIN users AS u ON p.uid = u.id WHERE p.id = ?";
	db.query(query, id, (err, rows) => {
		if(!err) {
			return cb(null, rows);
		}
		cb(err);
	})
}

//修改逻辑
exports.update = function (data, cb) {
	let query = 'UPDATE posts SET ? WHERE id = ?';
	let id = data.id;
	delete data.id;
	db.query(query, [data, id], (err) => {
		if(!err) {
			return cb(null);
		}

		cb(err);
	})
}
// 统计
exports.count = function (cb) {

	let query = 'SELECT count(*) as total FROM posts;';

	db.query(query, (err, rows) => {
		if(!err) {
			return cb(null, rows[0]);
		}

		cb(err);
	})
}