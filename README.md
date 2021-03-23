# электрообогрев
## Краткая инструкция по работе
### Для начала работы у вас должент быть установлен:
* Node.js v.8.15
* Gulp v4
* npm last version
## Основные команды для работы
* Установка - `npm i`
* Запуск локального сервера - `npm start`
* Сборка проекта без запуска локального сервера - `npm run build`
* Сборка проекта с обработкой изображений - `npm run build:minify`
* Запуск тестирования на соответствия код-гайдам - `npm test`

## Структура проекта
* Файлы страниц - `src/*.pug`
* `components/` - папка для компонентов
* `js/global` - общие скрипты 
* `js/vendor` - плагины и полифилы
* `pug/` - папка для шаблонов страниц и общих миксинов (не для блоков)
* `sass/global` - папка для общих стилей, переменных и т.п.
* `sass/vendor` - папка для сторонних стилей (плагинов и т.д.) - не для переопределения
