class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.container = document.querySelector(selector);
    this.targetDate = targetDate;
    // задаёт базовые данные для разметки
    this.baseTime = ['00', '00', '00', '00'];
    this.generateMarkup();
    this.start();
  }

  // генерируем резметку
  generateMarkup() {
    const timerMarkup = `
      <div class="field days">
        <div class="next" data-value="days-next">${this.baseTime[0]}</div>
        <div class="after" data-value="days-after">${this.baseTime[0]}</div>
        <div class="before" data-value="days-before">${this.baseTime[0]}</div>
        <div class="value" data-value="days-current">${this.baseTime[0]}</div>
        <span class="label">Days</span>
      </div>
      <div class="field hours">
        <div class="next" data-value="hours-next">${this.baseTime[1]}</div>
        <div class="after" data-value="hours-after">${this.baseTime[1]}</div>
        <div class="before" data-value="hours-before">${this.baseTime[1]}</div>
        <div class="value" data-value="hours-current">${this.baseTime[1]}</div>
        <span class="label">Hours</span>
      </div>
      <div class="field mins">
        <div class="next" data-value="mins-next">${this.baseTime[2]}</div>
        <div class="after" data-value="mins-after">${this.baseTime[2]}</div>
        <div class="before" data-value="mins-before">${this.baseTime[2]}</div>
        <div class="value" data-value="mins-current">${this.baseTime[2]}</div>
        <span class="label">Minutes</span>
      </div>
      <div class="field secs">
        <div class="next" data-value="secs-next">${this.baseTime[3]}</div>
        <div class="after" data-value="secs-after">${this.baseTime[3]}</div>
        <div class="before" data-value="secs-before">${this.baseTime[3]}</div>
        <div class="value" data-value="secs-current">${this.baseTime[3]}</div>
        <span class="label">Seconds</span>
      </div>
    `;
    this.container.insertAdjacentHTML('beforeend', timerMarkup);
  }

  // функция записывает время в корректной форме (дописывает 0 перед числами от 0 до 9)
  timeFormation(value) {
    return String(value).padStart(2, '0');
  }

  // вычисляем время до окончания таймера
  countDown() {
    const currentTime = Date.now();
    return this.targetDate - currentTime;
  }

  // переводим время в формат дни/часы/минуты/секунды
  getTime() {
    const time = this.countDown();
    const days = this.timeFormation(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.timeFormation(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.timeFormation(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
    );
    const secs = this.timeFormation(Math.floor((time % (1000 * 60)) / 1000));

    // так как в дальнейшем масив будет перебиратся по индексу,
    // записываем значения в обратном порядке
    return [secs, mins, hours, days];
  }

  // проверяем где произошли изменения в дате чтобы анимация срабатывала только в нужной ячейке
  findChanges() {
    const currentTime = this.getTime();
    const changesArr = currentTime.map((item, index) => {
      let change = false;
      if (item !== this.baseTime[index]) change = true;
      return change;
    });

    this.baseTime = this.getTime();

    return changesArr;
  }

  // выводим изменения на экран
  handlTimer(callback, currentTime) {
    // так как в дальнейшем масив будет перебиратся по индексу,
    // записываем значения в обратном порядке
    const timeList = ['secs', 'mins', 'hours', 'days'];
    const changes = callback();


    const elements = changes
      .filter((item) => item === true)
      .map((item, index) => {
        const field = document.querySelector(`.${timeList[index]}`);
        const next = field.querySelector(
          `[data-value="${timeList[index]}-next"]`,
        );
        const after = field.querySelector(
          `[data-value="${timeList[index]}-after"]`,
        );
        const before = field.querySelector(
          `[data-value="${timeList[index]}-before"]`,
        );
        const current = field.querySelector(
          `[data-value="${timeList[index]}-current"]`,
        );

        return {
          field, next, after, before, current,
        };
      });

    elements.forEach((item, index) => {
      const timeArr = currentTime();
      item.field.classList.add('flip');
      item.next.textContent = timeArr[index];
      item.after.textContent = timeArr[index];
      setTimeout(() => {
        item.before.textContent = timeArr[index];
        item.current.textContent = timeArr[index];
        item.field.classList.remove('flip');
      }, 900);
    });
  }

  // запускаем интервал
  start() {
    const time = this.countDown();
    // проверяем, если targetDate меньше тперешней даты, то интервал не запустится
    if (time > 0) {
      this.interval = setInterval(() => {
        this.handlTimer(this.findChanges.bind(this), this.getTime.bind(this));
        const timeInInterval = this.countDown();
        if (timeInInterval < 1000) {
          this.stop(this.interval);
        }
      }, 1000);
    }
  }

  // остановит интервал если время закончится
  stop(interval) {
    clearInterval(interval);
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('2019 Dec 28 23:18:50'),
});
