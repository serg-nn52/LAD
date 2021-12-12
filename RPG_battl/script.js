let button = document.querySelector(".game__set"); //получаем кнопку
let div = document.querySelector(".game__dialog");
let img = document.querySelector(".game__img");

button.addEventListener("click", () => {
  const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
      {
        name: "Удар когтистой лапой", //Действие 1
        physicalDmg: 3, // физический урон
        magicDmg: 0, // магический урон
        physicArmorPercents: 20, // физическая броня
        magicArmorPercents: 20, // магическая броня
        cooldown: 0, // ходов на восстановление
      },
      {
        name: "Огненное дыхание", //Действие 2
        physicalDmg: 0,
        magicDmg: 4,
        physicArmorPercents: 0,
        magicArmorPercents: 0,
        cooldown: 3,
      },
      {
        name: "Удар хвостом", //Действие 3
        physicalDmg: 2,
        magicDmg: 0,
        physicArmorPercents: 50,
        magicArmorPercents: 0,
        cooldown: 2,
      },
    ],
  };

  const user = {
    moves: [
      {
        name: "Удар боевым кадилом", //1
        physicalDmg: 2,
        magicDmg: 0,
        physicArmorPercents: 0,
        magicArmorPercents: 50,
        cooldown: 0,
      },
      {
        name: "Вертушка левой пяткой", //2
        physicalDmg: 4,
        magicDmg: 0,
        physicArmorPercents: 0,
        magicArmorPercents: 0,
        cooldown: 4,
      },
      {
        name: "Каноничный фаербол", //3
        physicalDmg: 0,
        magicDmg: 5,
        physicArmorPercents: 0,
        magicArmorPercents: 0,
        cooldown: 3,
      },
      {
        name: "Магический блок", //4
        physicalDmg: 0,
        magicDmg: 0,
        physicArmorPercents: 100,
        magicArmorPercents: 100,
        cooldown: 4,
      },
    ],
  };

  user.name = "Евстафий";
  let countRound = 1;
  let randomNum, userPanch, monsterPanch;
  user.moves.forEach((el) => {
    return (el.countPanch = 0);
  }); //задаем номер хода, на котором сделан этот удар, для дальнейшей проверки на восстановление
  monster.moves.forEach((el) => {
    return (el.countPanch = 0);
  }); //задаем номер хода, на котором сделан этот удар, для дальнейшей проверки на восстановление

  const random = () => {
    //функция, возвращающая случайное число 1,2 или 3 - номер хода монстра (всего 3 хода)
    randomNum = Math.floor(Math.random() * 10); //получаем случайное число от 0 до 9
    if (randomNum < 4) return (randomNum = 1);
    if (randomNum < 7 && randomNum > 3) return (randomNum = 2);
    if (randomNum > 6) return (randomNum = 3);
  };
  const getUserPanch = () => {
    //получаем значение удара пользователя
    const message = `Ход ${countRound}, Ваш соперник нанес ${
      monster.moves[randomNum - 1].name
    }, нанесите свой удар:
    1. Удар боевым кадилом
    2. Вертушка левой пяткой
    3. Каноничный фаербол
    4. Магический блок`;
    userPanch = prompt(message, "");
    if (userPanch === null) {
      return;
    } else if (
      userPanch > 0 &&
      userPanch < 5 &&
      (countRound - user.moves[userPanch - 1].countPanch >= //проверка на восстановление, случай когда удар еще не делался, либо прошло восстановление
        user.moves[userPanch - 1].cooldown ||
        user.moves[userPanch - 1].countPanch === 0)
    ) {
      alert(`Отлично, Вы нанесли удар ${user.moves[userPanch - 1].name}!`);
      user.moves[userPanch - 1].countPanch = countRound; //делаю запись, на каком ходу удар нанесен
      return userPanch;
    } else if (
      userPanch > 0 &&
      userPanch < 5 &&
      user.moves[userPanch - 1].countPanch !== 0 &&
      countRound - user.moves[userPanch - 1].countPanch < //проверка на восстановление, недостаточно ходов для восстановления
        user.moves[userPanch - 1].cooldown
    ) {
      alert(
        `Нельзя так часто наносить удар ${
          user.moves[userPanch - 1].name
        }! Нанесите другой удар!`
      );
      return getUserPanch();
    } else {
      alert("Необходимо ввести цфиру от 1 до 4, введите корректное значение!");
      return getUserPanch();
    }
  };

  const getMonsterPanch = () => {
    // получаю разрешенный удар монстра, с учетом восстановления
    random(); //вернет случайное число 1,2 или 3 - номер хода монстра (всего 3 хода) - randomNum
    monsterPanch = randomNum;
    if (
      countRound - monster.moves[monsterPanch - 1].countPanch >= //проверка на восстановление, случай когда удар еще не делался, либо прошло восстановление
        monster.moves[monsterPanch - 1].cooldown ||
      monster.moves[monsterPanch - 1].countPanch === 0
    ) {
      monster.moves[monsterPanch - 1].countPanch = countRound;
      return monsterPanch;
    } else {
      return getMonsterPanch();
    }
  };

  //зададим функцию, описывающую один раунд (один обмен ударами)
  let round = () => {
    // random();
    monsterPanch = getMonsterPanch(); //удар монстра для понятности
    userPanch = getUserPanch(); //удар игрока
    monster.maxHealth =
      monster.maxHealth -
      user.moves[userPanch - 1].physicalDmg -
      user.moves[userPanch - 1].magicDmg +
      monster.moves[monsterPanch - 1].physicArmorPercents / 100 +
      monster.moves[monsterPanch - 1].magicArmorPercents / 100;

    user.maxHealth =
      user.maxHealth -
      monster.moves[monsterPanch - 1].physicalDmg -
      monster.moves[monsterPanch - 1].magicDmg +
      user.moves[userPanch - 1].physicArmorPercents / 100 +
      user.moves[userPanch - 1].magicArmorPercents / 100;
    alert(
      `После обмена ударами ваше здоровье ${user.maxHealth} , а здоровье монстра ${monster.maxHealth}`
    );
    // console.log(monster.maxHealth);

    if (monster.maxHealth > 0 && user.maxHealth > 0) {
      countRound++;
      return round();
    } else if (monster.maxHealth > 0 && user.maxHealth <= 0) {
      alert("К сожалению, Вы проиграли!");
      return;
    } else if (monster.maxHealth <= 0 && user.maxHealth > 0) {
      alert("Поздравляю, это победа!!!");
      img.classList.add("game__img_active");
      return;
    } else {
      alert("Ничья!");
      return;
    }
  };

  user.maxHealth = prompt(
    `Ввведите уровень сложности - здоровье игрока ${user.name}. 
     У монстра - соперника здоровье 10`,
    ""
  );
  if (user.maxHealth === null) {
    return;
  }

  if (isNaN(+user.maxHealth)) {
    alert("Введите числовое значение и начните еще раз!");
    return;
  }

  round();
});

img.addEventListener("click", () => {
  img.classList.remove("game__img_active");
});
