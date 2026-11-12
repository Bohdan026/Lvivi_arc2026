// Модуль сервера розробки web-застосування (контролер)
const express = require('express')
const path = require('path')
const app = express()

//  шаблонізатор ejs і каталог шаблонів
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))

//  каталог статичних файлів (зображення тощо)
app.use(express.static(path.join(__dirname, 'static')))

const views = require('./views')

// Маршрути
app.get('/', views.main)                    // головна: типи архітектурних об'єктів
app.get('/list/:id/', views.listObjects)    // список об'єктів типу
app.get('/obj/:id/', views.arcObject)       // сторінка об'єкта

// Має бути ПІСЛЯ всіх app.get: реакція на будь-яку іншу адресу
app.use('*', views.error404)


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Listening on ' + port)
})
