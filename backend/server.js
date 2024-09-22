const WebSocket = require('ws');

// Создаем WebSocket сервер на порту 8080
const wss = new WebSocket.Server({ port: 8080 });

// Функция для генерации случайных координат (например, x, y)
function generateCoordinates() {
  return {
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
  };
}

// Создаем 300 объектов с начальными координатами
let units = Array.from({ length: 300 }, (_, id) => ({
  id,
  ...generateCoordinates(),
}));

// Алгоритм обновления координат
function updateCoordinates() {
  units = units.map((unit) => ({
    ...unit,
    x: unit.x + (Math.random() - 0.5) * 10,  // Простое изменение координат
    y: unit.y + (Math.random() - 0.5) * 10,
  }));
}

// Обрабатываем подключение новых клиентов
wss.on('connection', (ws) => {
  console.log('Новое подключение клиента');

  // Отправляем начальные данные о координатах клиенту
  ws.send(JSON.stringify(units));

  // Настраиваем обновление координат каждые полсекунды и отправку данных клиентам
  const interval = setInterval(() => {
    updateCoordinates();
    ws.send(JSON.stringify(units));
  }, 500);

  // Очищаем интервал, если клиент отключился
  ws.on('close', () => {
    clearInterval(interval);
    console.log('Клиент отключился');
  });
});

console.log('WebSocket сервер запущен на порту 8080');
