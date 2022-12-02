# Особенности JS в dep-dataset

[[_TOC_]]

## тег `<base>`

это база

## Поддержка либ

##### Поддержка jQuery

* Селектор в `.load()`

  foxsilver, immunitet, ? kamaz ?

* доставание данных из DOM через jQuery

  * доставание значения атрибута через `el.attr(...)`
  * Форма из DOM взятая через jQuery
    * Взята явно через `$('...')`
    * Взята из `this`, мы event handler
    * $this.serialize()
  * mohandesfa
    * ```js
      var $this = $(this)
      holder = $this.parent().siblings('.woodmart-blog-holder')
      source = holder.data('source')
      action = 'woodmart_get_blog_' + source
      ```
    *  ```js
        $('body').on('click', '.woodmart-wishlist-btn a', function (e) {
             var $this = $(this);
             var productId = $this.data('product-id');
        ```
* импорт jQuery

  пример: pdfmedical-search

* переименованный объект jQuery

  фактически, предыдущий класс входит сюда

  как мы это собираемся хендлить: матчить объект jQuery по значению
  
  пример: pdfmedical-search

* плагины jQuery
  * jquery-form/form
  * Кастомный плагин который шлёт запрос

    В данном случае `acticmodal`
    ```js
          var href = '/index.php?route=product/product/photos&product_id=' + productID;
          $.arcticmodal({
            type: 'ajax',
            url: href,
            ajax: {
              type: 'GET',
    ```

* jQuery extend/assign
  пример: elisa


##### Поддержка Bitrix

* BX.ajax
* методы класса BX, нужные для digit-nsd-test (см. первый деп)

## namespace / singleton

##### инициализация поля в сеттере

telegram-promote

##### глобальный, по имени

foxsilver

## classes (ООП)

##### renamed-this

epoxidica (возможно 0 депов из размети), pdfmedical-search

##### присваивание свойства в сеттере

epoxidica (возможно 0 депов из размети)

##### присваивание свойства в конструкторе method-assigned-in-ctor

epoxidica (возможно 0 депов из размети)
matt

##### транспилированный `class`

##### типа iife c `new`

насколько я помню это в blog-eldorado, в re-store тоже (sendAuthCode)

##### использования свойства из `this`

##### class-inheritance

ydb, blog-eldorado

##### засовывание методов в `this` в конструкторе

* бывает не через `=`, а через функции (например `ensureNotUndefined` + `podrochniiEffect` - такое есть в `bankiru`)

##### транспилированный вызов `super`

также есть в bankiru

использует фичу возврата другого объекта из конструктора

варианты как хендлить:
* сигнатура на это
* поддерживать возврат другого объекта из конструктора

##### НАСЛЕДОВАНИЕ

ydb

## расширение поддержки встроенных в браузер функций и классов

* поддержка класса `URL`, `URLSearchParams` - epoxidica (возможно 0 депов из размети), blog-eldorado
* `parseInt` - xcar
* `.toString()` - mohandesfa

## custom-lib

epoxidica (возможно 0 депов из размети)

##### сериализация в query string

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

##### совсем кастомные особенности CMS

* magento

##### различные autocomplete

* typeahead.js/Bloodhound в bonus-banksoyuz

##### vercel/SWR

shoptesla

##### странные средства отправки запроса

* В trustpilot это `fetch/FetchProvider` из `newsuk/times-component`

## доставания данных из DOM

##### урл из DOM

epoxidica (возможно 0 депов из размети)

##### данные через query-selector

pdfmedical

## function-side-effect

##### Побочный эффект на внешнюю глобальную переменную - но данные на самом деле одни и те же будут

epoxidica (возможно 0 депов из размети)

## iife

##### с побочным эффектом

пересечение с классом `function-side-effect`
wise, причём в случае wise это эффект на глобальную переменную, то есть такая инициализация

## кастомный extend/assign

пример: wise, elisa

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

## return-value

для return-value нужно будет поддерживать точное значение для места вызова (context-sensitivity), иначе будет слишком неточно

пример: wise

##### функция возвращает объект с роутами

пример: shop-telekom

* роут может быть ФУНКЦИЕЙ, которую возвратят в месте вызова (пример опять же shop-telekom)

## "чистая" функция-преобразователь

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

пример: wise

Бывает merge объектов нескольких

##### хранилище конфика с get, разбивающим по точкам

freshbooks (`a8f8105d2d40178f277f.js`)
возможно, надо чекать как то что метод вызывается только однажды или что свойство объекта присвавивается только однажды - и, если да, то брать значение из динамики. Или всё же как то вызывать

## react

##### поддержка `useRef`

##### react-deafult-props

bankiru

## vue

##### поддержка дефолтных значений props

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
опять же shop-telekom
```js
return new i["a"].Store({
    state: {
      url: "https://ebs02.telekom.de/nexus-pk-coin/",
      visibleInput: !1,
// ...
```

Вызов через `.$store.dispatch(...)` (judge)

Dataflow через события: подписка на события и триггер через `$emit`

## bundler

##### экспорты модуля получаются вызовом функции в месте использования

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

##### импорт jQuery

(этот класс также является подклассом jQuery)

## regenerator

## тернарный оператор или `if` создают одно из двух значений, оба из которых интересны

надо поддерживать множества, получается
возможно, надо скипать _переприсваивания_ на неизвестное значение, если они внутри `if`
У mohandesfa есть также кейс когда был объект с полями, а в `if` его переприсвоили на пустой

##### поддержка поиска аргументов даже если была конкретная альтернатива (но тривиальная)

пример - xcar. Там тернарный оператор выбирает `0` вместо `FROM_ARG`, хотя, если бы мы искали аргументы, то нашли бы более нетривиальную альтернативу `475`.
Как это можно было бы поддерживать - поддерживать множества значений, тогда мы знали бы что возможно найти ещё какой то аргумент. Но пока это как будто нужно только для xcar, и непонятно насколько ценно это для него. Может надо убрать просто требование конкретных значений в xcar

## custom-bind

имеется ввиду оборачивание в функцию-обёртку чтобы "прибить" параметр

## call-apply

## поиск вызова метода класса/namespace/singleton field-based методом

нужно для support.x5, там до сих пор не понял как `getKeywordsRoutingPage` найти по-другому

## грубые эвристики

* `this.axios`, `this._axios`, `this.$axios` (re-store), `this.request`

## возможная идея - field-based метод для поиска посылающих запрос объектов

типа, если встретили где то `e.prototype.$axios = S.a.create();`, и поняли что это объект Axios создался, то считаем что везде поле `.$axios` это этот объект

## поддержка синтаксиса деструктуризации

* дефолтноее значение деструктуризации

## кастомная инициализация либ

* ajaxSetup
* опции axios create

## поддержка параметра-массива, при анализе он может быть пустым

возможно эта фича уже есть у нас
пример: judge, деп `/profile/follows`

## на будущее

* tresemme
* угадывание значений по сравнениям в switch/if
* confluence первый деп (/rest/feature/1/site/watches-page`)
* депы где в описании есть пометки `future work`
* присваивание `innerHTML` - epoxidica (возможно 0 депов из размети)
