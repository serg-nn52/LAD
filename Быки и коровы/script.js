let button = document.querySelector(".game__set"); //получаем кнопку
let div = document.querySelector(".game__dialog");
let img = document.querySelector(".game__img");

button.addEventListener("click", () => {
  let complexity, //сложность
    randomNum = 1, //случайное число, генерируемое скриптом
    esc, //переменная отмены, если promt === тгдд
    step = 1; //ход пользователя, номер попытки

  //функция, получающая уровень сложности от пользователя
  function getComplexity() {
    input = prompt("Введите сложность игры (цифры от 3 до 6)", "");
    if (input === null) {
      //пользователь нажал отмена
      esc = input; //прокинем отмену во все вункции
      return; //выход по нажатию отмены
    }
    input = +input; //преобразуем в число
    if (input >= 3 && input <= 6 && isNaN(input) === false) {
      //проверим на корректность введенных данных (именно цифры, от 3 до 6)
      alert(`Спасибо, загаданное число состоит из ${input} РАЗЛИЧАЮЩИХСЯ цифр`);
      return (complexity = input); //присваиваем значение нашей переменной сложности
    } else {
      alert("Введите корректное значение!");
      getComplexity(); //в случае некорректного ввода запросим данные заново
    }
  }
  //функция проверки на повторяемость символов, если нет повторений, то true
  function isNotDouble(number) {
    let numArr = ("" + number).split("");
    for (let i = 0; i < numArr.length; i++) {
      for (let j = 0; j < numArr.length; j++) {
        if (numArr[i] === numArr[j] && i !== j) {
          return false; //при первом же совпадении одинаковых элементов, но с разными индексами вернет false, т.е. повторяются значения
        }
      }
    }
    return true; // если нет повторений
  }

  function random() {
    //проверяю корректность случайного числа
    if (esc === null) return;
    while (true) {
      //
      randomNum = Math.floor(Math.random() * 10 ** complexity);
      if (
        randomNum >= 10 ** (complexity - 1) &&
        randomNum <= 10 ** complexity - 1 &&
        isNotDouble(randomNum)
      ) {
        break;
      }
    }
    return randomNum;
  }

  //генерирование случайных чисел в зависимости от сложности (3-6 цифр), второй способ, рекурсия
  // function random() {
  //     randomNum = Math.floor(Math.random()*10**complexity);
  //     //проверяю корректность случайного числа
  //     if ( (randomNum >= 10**(complexity-1)) && randomNum<=10**complexity-1 && isNotDouble(randomNum)) { //
  //         return randomNum= randomNum;
  //     } else {
  //         return random();
  //      }
  // };

  //угадывание пользователем числа
  function dialog() {
    //диалог с пользователем
    if (esc === null) return; //чтобы этот блок не открывался, если в предыдущем отмена (когда вводим сложность)
    let inputNum = prompt(
      `Попытка ${step}: введите предполагаемое значение`,
      ""
    ); //запрашиваем у пользователя его вариант
    if (esc === null || inputNum === null) return; //выход по нажатию отмены
    inputNum = +inputNum;
    //проверка корректности введенного
    if (inputNum === randomNum) {
      //сценарий победы
      img.classList.add("game__img_active");
      alert(`Поздравляю, Вы угадали с ${step} попытки!!!`);
      return;
    }
    if (
      inputNum >= 10 ** (complexity - 1) &&
      inputNum <= 10 ** complexity - 1 &&
      isNaN(inputNum) === false &&
      isNotDouble(inputNum)
    ) {
      step++; //шаг плюсуется только в случае успешной попытки
      //сравнение рандома и введенного значения
      (inputArr = ("" + inputNum).split("")), //получаем массив с разбиением по 1 цифре, формат строка - для введенных данных
        (randomArr = ("" + randomNum).split("")), //получаем массив с разбиением по 1 цифре, формат строка - для рандомных данных
        (countAlien = 0), //счетчик совпадений цифр не на своем месте
        (countMy = 0), //счетчик совпадений цифр на своем месте
        (alienArr = []), //массив цифр не на своем месте
        (myArr = []); //массив цифр на своем месте

      for (let i = 0; i < inputArr.length; i++) {
        for (let j = 0; j < randomArr.length; j++) {
          if (inputArr[i] === randomArr[j] && i === j) {
            //условие цифр на совем месте (совпадение индексов и значений)
            countMy++;
            myArr.push(inputArr[i]);
          } else if (inputArr[i] === randomArr[j] && i !== j) {
            //условие цифр не на совем месте (индексы не совпадают)
            countAlien++;
            alienArr.push(inputArr[i]);
          }
        }
      }
      //корректный вывод информации пользователю
      alert(
        `Cовпавших цифр не на своих местах - ${countAlien} (${alienArr}), цифр на своих местах - ${countMy} (${myArr})`
      );
      dialog(randomNum); //если не угадано, новый шаг, новая попытка
    } else {
      alert(
        `Введите корректное значение из ${complexity} НЕПОВТОРЯЮЩИХСЯ цифр!`
      ); //неккоректный ввод
      dialog();
    }
  }

  //вызываю функции по порядку
  getComplexity(); //получение сложности
  random(); //получение случайного числа
  console.log(complexity, randomNum); //для контроля, сложность и случайное число
  // alert(randomNum);  //проверка с выводом алерт
  dialog(); //взаимодействие с пользователем
});

img.addEventListener("click", () => {
  img.classList.remove("game__img_active");
});
