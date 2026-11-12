// Модуль функцій представлення (views)
const path = require('path')
const Datastore = require('@seald-io/nedb')

const templates = path.join(__dirname, 'templates')

// Одна спільна база даних формату NeDB на весь застосунок
const db = new Datastore({
  filename: path.join(__dirname, 'lvivarc.json'),
  autoload: true
})

function dbError(res, err) {
  console.log(err)
  res.status(500).send('Помилка бази даних')
}

// Головна сторінка: список типів архітектурних об'єктів
exports.main = (req, res) => {
  db.find({ table: 'arctype' }, (err, docs) => {
    if (err) return dbError(res, err)
    docs.sort((a, b) => a.id - b.id)
    res.render('index2', { types: docs })
  })
}

// Сторінка архітектурного об'єкта: /obj/:id/
exports.arcObject = (req, res) => {
  const objId = parseInt(req.params.id)
  db.findOne({ table: 'arcobj', id: objId }, (err, doc) => {
    if (err) return dbError(res, err)
    if (!doc) return exports.error404(req, res)
    // тип потрібен для командної панелі (посилання назад до списку)
    db.findOne({ table: 'arctype', id: doc.type_id }, (err, type) => {
      if (err) return dbError(res, err)
      res.render('object', { object: doc, type: type })
    })
  })
}

// Сторінка списку об'єктів вибраного типу: /list/:id/
exports.listObjects = (req, res) => {
  const tpId = parseInt(req.params.id)
  db.find({ table: 'arcobj', type_id: tpId }, (err, docs) => {
    if (err) return dbError(res, err)
    if (docs.length == 0) return exports.error404(req, res)
    docs.sort((a, b) => a.id - b.id)
    db.findOne({ table: 'arctype', id: tpId }, (err, doc) => {
      if (err) return dbError(res, err)
      res.render('objects', { type: doc, objects: docs })
    })
  })
}


exports.error404 = (req, res) => {
  res.status(404).sendFile(path.join(templates, '404.html'))
}
