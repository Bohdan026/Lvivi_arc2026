# lviv_arc2020

Архітектура старого Львова. Web-застосування, побудоване мовою JavaScript (Node.js + Express + EJS + NeDB).

## Локальний запуск

```
npm install
npm start          (те саме, що node index.js)
```
Відкрити http://localhost:3000 . Порт береться з `process.env.PORT`, а якщо змінної немає – 3000.

## Структура

- `index.js` – сервер (контролер): маршрути `/`, `/list/:id/`, `/obj/:id/`, 404
- `views.js` – функції представлення `main`, `listObjects`, `arcObject`, `error404`
- `lvivarc.json` – база даних формату NeDB (21 документ: 3 типи + 18 об'єктів)
- `db/` – засоби лише для створення БД: `JSONtoNeDB.js`, `lvivarcSource.json`
- `templates/`, `templates/sub/` – шаблони EJS і підшаблони
- `static/images/` – фото об'єктів (з LvivArc; запасне фото `placeholder.svg`)
- `Procfile` – точка входу для Heroku (`web: node index.js`)
- `.gitignore` – `node_modules/`, `/db/*.*`, `Node.js command prompt.lnk`

## Створення БД заново

З кореня проєкту (файл `lvivarc.json` має бути видалений):
```
node db/JSONtoNeDB
```

## Публікація на GitHub (GitHub Desktop, лекція 23.11)

1. File → Add local repository → вибрати каталог проєкту → «create a repository».
2. Name: `lviv_arc2020` (унікальне серед ваших репозиторіїв), поставити «Initialize this repository with a README».
3. Файл `.gitignore` уже є, тому `node_modules` і `/db/*.*` у репозиторій не потраплять.
4. Summary: «Утворення репозиторію» → Commit to main → Publish repository.
5. Далі: Push origin – відправити зміни, Pull origin – забрати зміни з GitHub.

## Розгортання на Heroku (лекція 30.11)

1. Створити застосування: Dashboard → New → Create new app, регіон Europe.
2. Deploy → підключити GitHub (Connect to GitHub), знайти репозиторій `lviv_arc2020` → Connect.
3. Увімкнути Automatic deploys з гілки `main` (або Deploy branch вручну) → Open app.
4. Після кожного Push origin з GitHub Desktop Heroku оновлює застосування сам.

Увага: безкоштовного плану Heroku з листопада 2022 року немає. Найдешевший варіант – Eco dynos
(близько 5 $/міс., застосування «засинає» після 30 хв без запитів). Актуальну ціну дивіться на сторінці Heroku.
Безкоштовні альтернативи, які теж вміють розгортати з GitHub: Render, Railway, Fly.io (умови перевіряйте на їхніх сайтах).
