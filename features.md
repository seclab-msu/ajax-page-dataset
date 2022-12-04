# Особенности JS в dep-dataset

<!-- [[_TOC_]] -->

## base-tag

тег `<base>`

это база

## library-model

Поддержка либ

##### jquery

Поддержка jQuery

* `jquery-load-selector`

  Селектор в `.load()`

* `jquery-dom`

  доставание данных из DOM через jQuery

  * `jquery-dom-attr`

    доставание значения атрибута через `el.attr(...)`

  * `jquery-dom-data`

    доставание значения атрибута через `el.data(...)`

  * `jquery-dom-direct`

    Элемент взят явно через `$('...')`

  * `jquery-dom-event-handler-this`

    Взята из `this`, мы event handler

  * `jquery-dom-form`

    Форма из DOM взятая через jQuery
    * `jquery-dom-form-serialize`

      поддержка `$this.serialize()`
  примеры из mohandesfa:
  ```js
  var $this = $(this)
  holder = $this.parent().siblings('.woodmart-blog-holder')
  source = holder.data('source')
  action = 'woodmart_get_blog_' + source
  ```
  ```js
   $('body').on('click', '.woodmart-wishlist-btn a', function (e) {
        var $this = $(this);
        var productId = $this.data('product-id');
   ```
* `jquery-import`

  импорт jQuery

* `lib-object-renamed`

  переименованный объект jQuery (ну и других либ на самом деле)

  фактически, предыдущий класс входит сюда

  как мы это собираемся хендлить: матчить объект jQuery по значению

* `jquery-plugin`

  плагины jQuery. Хорошо бы анализатор умел отслеживать ссылки на кастомные объекты/функции,
  сидящие в `$` или объекте-обёртке элемента
  * `jquery-plugin-form`

    плагин jquery-form/form

  Ещё бывают кастомные плагины которые шлют запросы.

  К примеру, плагин `acticmodal`
  ```js
        var href = '/index.php?route=product/product/photos&product_id=' + productID;
        $.arcticmodal({
          type: 'ajax',
          url: href,
          ajax: {
            type: 'GET',
  ```
  Надо подробнее чуть глянуть его код, если не осилим его явно проанализировать то мб эвристику сделаем на него

* `jquery-extend`
  jQuery extend/assign

##### bitrix

Поддержка Bitrix

* `bx-ajax`

  BX.ajax
* `bx-methods`

  методы класса BX (нужные для digit-nsd-test, см. первый деп)

## bundler

##### bundler-exports-function

экспорты модуля получаются вызовом функции в месте использования

```js
s = require("vDqi"),
a = require.n(s)
// ...
a()({
  url: "/ajax/auth/",
  method: "POST",
 ...
  }
```
Здесь функция a возвращает дефолтный экспорт модуля axios, то есть `a()` это axios.

сюда снова входит класс `jquery-import`

## classes

ООП

##### renamed-this

epoxidica (возможно 0 депов из размети)

##### class-prop-assigned-in-setter

присваивание свойства в сеттере

epoxidica (возможно 0 депов из размети)

##### class-prop-assigned-in-ctor

присваивание свойства в конструкторе

epoxidica (возможно 0 депов из размети)

##### class-method-assigned-in-ctor

присваивание метода в инстанс (в `this`) в конструкторе, вместо прототипа

* `class-method-assigned-in-ctor-with-util-func`

  не через `=`, а через функции (например `ensureNotUndefined` + `podrochniiEffect` - такое есть в `bankiru`)

##### transpiled-class-declaration

Транспилированный `class`

##### immediately-instantiated-class

типа iife c `new`

в re-store это там где `sendAuthCode`

##### class-this-prop

использования свойства из `this`

##### class-inheritance

НАСЛЕДОВАНИЕ

##### class-transpiled-super

транспилированный вызов `super`

использует фичу возврата другого объекта из конструктора

варианты как хендлить:
1. сигнатура на это
2. поддерживать возврат другого объекта из конструктора

## return-value

для return-value нужно будет поддерживать точное значение для места вызова (context-sensitivity), иначе будет слишком неточно

##### routes-from-return-value

функция возвращает объект с роутами

* `route-function-from-return-value`

  роут может быть ФУНКЦИЕЙ, которую возвратят в месте вызова

## iife

##### iife-side-effect

с побочным эффектом

пересечение с классом `function-side-effect`
wise, причём в случае wise это эффект на глобальную переменную, то есть такая инициализация

## custom-lib

epoxidica (возможно 0 депов из размети)

##### custom-query-string

сериализация в query string

по сути, пересекается с классом с "чистыми" функциями
indeed (https://github.com/ljharb/qs), wise (возможно либа та же)

у `bankiru` деп с `_serialize__WEBPACK_IMPORTED_MODULE_2__.Z)({`

в Mattermost (matt) такое:

```js
exports.buildQueryString = function (e) {
  var t = Object.keys(e);
  if (0 === t.length) return "";

  for (var n = "?", r = 0; r < t.length; r++) {
    var i = t[r];
    n += i + "=" + encodeURIComponent(e[i]), r < t.length - 1 && (n += "&");
  }

  return n;
}
```

##### custom-cms-features

совсем кастомные особенности CMS

* `magento`

##### autocomplete-libs

различные autocomplete

* `typeahead-js`

  typeahead.js/Bloodhound в bonus-banksoyuz

##### vercel-swr

vercel/SWR

##### exotic-request-senders

странные средства отправки запроса

* `times-component-fetch-provider`

  В trustpilot это `fetch/FetchProvider` из `newsuk/times-component`

## namespace / singleton

##### singleton-prop-assigned-in-setter

инициализация поля в сеттере

##### singleton-global / namespace-global

глобальный неймспейс/синглтон, к которому обращаются по его глобально видмому имени

## regenerator

`async`/`await` функции транспилируются в функции, использующие regenerator. Надо чтобы
анализатор их распознавал чтобы правильно видеть data flow аргументов и возвращаемого значения.

## builtins

расширение поддержки встроенных в браузер функций и классов

* `url-class`

  поддержка класса `URL`

* `url-search-params`

  поддержка класса `URLSearchParams` - epoxidica (возможно 0 депов из размети)

* `parse-int`

  `parseInt`

* `to-string`

  `.toString()`

## dom

доставания данных из DOM

##### url-from-dom

урл из DOM

epoxidica (возможно 0 депов из размети)

##### query-selector

данные через query-selector

## function-side-effect

##### function-side-effect-on-constant-global-var

Побочный эффект на внешнюю глобальную переменную - но данные на самом деле одни и те же будут

epoxidica (возможно 0 депов из размети)

## custom-extend

кастомный extend/assign

Ещё один пример кастомного extend/assign из elisa

```js
window.ElisaNavi = function e(t) {
    t = t || {};
    for (var n = 1; n < arguments.length; n++) {
        var r = arguments[n];
        if (r)
            for (var a in r) r.hasOwnProperty(a) && ("object" === _(r[a]) ? r[a] instanceof Array ? t[a] = r[a].slice(0) : t[a] = e(t[a], r[a]) : t[a] = r[a])
    }
    return t
}({}, e, t))
```
Здесь ещё интересно что он вызывается in place, в jQuery стиле

другой пример, с pdfmedical-search

```js
function mergeProps(initialObj) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? getPropNames(Object(n), !0).forEach((function(t) {
            addProp(initialObj, t, n[t])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(initialObj, Object.getOwnPropertyDescriptors(n)) : getPropNames(Object(n)).forEach((function(t) {
            Object.defineProperty(initialObj, t, Object.getOwnPropertyDescriptor(n, t))
        }))
    }
    return initialObj
}
```
Здесь свойства у объектов с чётными индексами (начиная с `2`) копируются с полным десктиптором, а у нечётных только значение.


## pure-transform-function

"чистая" функция-преобразователь

Бывает просто identity функция, например

```js
function ensureNotUndefined(arg) {
  if (void 0 === arg) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return arg;
}
```

Если нам нужно возвращаемое значение, то такую функцию для конкретных или частично-конкретных данных можно было бы просто выполнить. Выполнить в реальном JS или реализовать в анализаторе поддержку ещё нескольких конструкций JS

На самом деле `return-value` можно рассматривать как пример этого класса

также бывает грязная - добавитель свойства. НО СМЫСЛ ТОТ ЖЕ

```js
function podrochniiEffect(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
```

Бывает merge объектов нескольких

##### custom-config-class

хранилище конфика с `get`, разбивающим по точкам

freshbooks (`a8f8105d2d40178f277f.js`)
возможно, надо чекать как то что метод вызывается только однажды или что свойство объекта присвавивается только однажды - и, если да, то брать значение из динамики. Или всё же как то вызывать

## react

##### react-use-ref

поддержка `useRef`

##### react-default-props

bankiru

##### redux

поддержка data flow через redux штуки

## vue

##### vue-default-props

поддержка дефолтных значений props

пример - `shop-telekom`
```js
{
    jsonUrl: {
      type: String,
      default: "/appmonitoring/status.json"
    },
}
// ...
fetchStatusJson: function () {
    ...
    fetch(this.jsonUrl)
```

##### vuex

поддержка store

```js
return new i["a"].Store({
    state: {
      url: "https://ebs02.telekom.de/nexus-pk-coin/",
      visibleInput: !1,
// ...
```

Вызов через `.$store.dispatch(...)` (judge)

Dataflow через события: подписка на события и триггер через `$emit`

## if-variants

тернарный оператор или `if` создают одно из двух значений, оба из которых интересны

надо поддерживать множества, получается
возможно, надо скипать _переприсваивания_ на неизвестное значение, если они внутри `if`
У mohandesfa есть также кейс когда был объект с полями, а в `if` его переприсвоили на пустой

##### from-arg-and-concrete-alternative

поддержка поиска аргументов даже если была конкретная альтернатива (но тривиальная)

пример - xcar. Там тернарный оператор выбирает `0` вместо `FROM_ARG`, хотя, если бы мы искали аргументы, то нашли бы более нетривиальную альтернативу `475`.
Как это можно было бы поддерживать - поддерживать множества значений, тогда мы знали бы что возможно найти ещё какой то аргумент. Но пока это как будто нужно только для xcar, и непонятно насколько ценно это для него. Может надо убрать просто требование конкретных значений в xcar

## custom-bind

имеется ввиду оборачивание в функцию-обёртку чтобы "прибить" параметр

## call-or-apply

Надо чтобы анализатор распознавал вызовы с помощью call/apply как вызовы функций
и видел data flow через них

## lang-features

поддержка фич языка

##### destruct

поддержка синтаксиса деструктуризации

* `destruct-default`

  дефолтноее значение деструктуризации

##### logical-or

Поддержка `||`

##### switch

Поддержка `switch`. В ветвях switch могут разные данные присваиваться, по сути
это вариант класса `if-variants`. Встречается редко

## lib-setup

кастомная инициализация либ

* `ajax-setup`

  `ajaxSetup`
* `axios-create`

  опции axios `.create`

## array-request-param

поддержка параметра-массива, при анализе он может быть пустым

возможно эта фича уже есть у нас
пример: judge, деп `/profile/follows`

## Идеи техник анализа

Здесь не особенности JS, а уже идеи для алгоритма

1. поиск вызова метода класса/namespace/singleton field-based методом

  нужно для support.x5, там до сих пор не понял как `getKeywordsRoutingPage` найти по-другому

2. грубые эвристики

  `this.axios`, `this._axios`, `this.$axios` (re-store), `this.request`

3. возможная идея - field-based метод для поиска посылающих запрос объектов

  типа, если встретили где то `e.prototype.$axios = S.a.create();`, и поняли что это объект Axios создался, то считаем что везде поле `.$axios` это этот объект

## на будущее

* `tresemme`
* `guess-from-comparison`
  угадывание значений по сравнениям в switch/if
* confluence первый деп (/rest/feature/1/site/watches-page)
* депы где в описании есть пометки `future work`
* присваивание `innerHTML` - epoxidica (возможно 0 депов из размети)
* `amd`
* `backbone`
* `generate`

  какой то из сэмплов, надо грепнуть по описаниям слово `generate`

* `drupal`

  возможно, какие то кастомные фичи Д.Р.У.П.А.Л.А.