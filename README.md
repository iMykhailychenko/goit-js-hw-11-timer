# goit-js-hw-11-timer

![print scrin](homework/image.jpg)

# как использовать плагин таймера?

Подключите основной файл с кодом к своему html файлу
```ruby
<script src="./script.js" type="module"></script>
```

После этого, вставьте следующую html разметку
```ruby
<div id="любое название id"></div>
```

Вы можете создавать любое количество таймеров на странице
просто передавая разные id
```ruby
<div id="timer-1"></div>
<div id="timer-2"></div>
...
<div id="timer-n"></div>
```

После этого, в вашем JavaScript файле для каждого отдельного таймера на странице
вызывайте свой экземпляр класса передавая в параметры id(selector), который вы указали в
разметке, а так же параметры даты(targetDate), к которой ведёться отсчёт.

```ruby
new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('2019 Dec 28 23:18:50'),
});
```