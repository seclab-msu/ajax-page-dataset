# Особенности JS в dep-dataset

## Поддержка jQuery

### Селектор в `.load()`

foxsilver, immunitet, ? kamaz ?

### Форма из DOM взятая через jQuery

* Взята явно через `$('...')`
* Взята из `this`, мы event handler

## Кастомный плагин который шлёт запрос

* В данном случае `acticmodal`
```js
      var href = '/index.php?route=product/product/photos&product_id=' + productID;
      $.arcticmodal({
        type: 'ajax',
        url: href,
        ajax: {
          type: 'GET',
```

# namespace

## глобальный, по имени

foxsilver

