// import {page} from "./models/models";
const {myworld} = require('./models/grid');

const myWS = require('ws') ;

// Создаем myWS сервер на порту 8080
const wss = new myWS.Server({ port: 8080,
  maxPayload: 104857600
});
// Создаем 300 объектов с начальными координатами

myworld.creatingFields()
myworld.createBornCell()
myworld.createCanteenCell(5)
// Обрабатываем подключение новых клиентов
wss.on('connection', (wss: any) => {

      wss.send(JSON.stringify(myworld.getFields()))


  console.log('Новое подключение клиента');




  // Отправляем начальные данные о координатах клиенту
  // wss.send(JSON.stringify(units));

  // Настраиваем обновление координат каждые полсекунды и отправку данных клиентам



  // Очищаем интервал, если клиент отключился
  wss.on('close', () => {
    console.log('Клиент отключился');
  });
});

// console.log(page)
console.log('myWS сервер запущен на порту 8080');
