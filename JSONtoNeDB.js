// Утиліта: створює базу даних NeDB (lvivarc.json) з файла lvivarcSource.json
// Запуск з кореня проєкту: node db/JSONtoNeDB
// (БД lvivarc.json створюється в корені проєкту, а не в підкаталозі db)
const fs = require('fs')
const path = require('path')
const Datastore = require('nedb')

const dbFileName = path.join(__dirname, '..', 'lvivarc.json')
const sourceFileName = path.join(__dirname, 'lvivarcSource.json')

// Блокуємо дублювання раніше введених документів
if (fs.existsSync(dbFileName) && fs.statSync(dbFileName).size > 0) {
  console.error('Помилка: файл ' + path.basename(dbFileName) +
    ' уже існує і непустий! Видаліть його і запустіть програму знову.')
  process.exit(1)
}

const db = new Datastore({ filename: dbFileName, autoload: true })

const data = fs.readFileSync(sourceFileName, 'utf8')
const list = JSON.parse(data)

let n = 0
for (let i = 0; i < list.length; i++) {
  db.insert(list[i], (err, newDoc) => {
    if (err) {
      console.error(err)
      return
    }
    n++
    if (n == list.length) {
      console.log('Успішно створено файл БД ' + path.basename(dbFileName) +
        ' з ' + n + ' документами.')
    }
  })
}
