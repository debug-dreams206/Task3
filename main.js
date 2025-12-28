fetch('data.json')
  .then(res => res.json())
  .then(data => {
    loadCards(data.cards);
    loadOrders(data.orders);
  });

function loadCards(cards) {
  const container = document.getElementById('cards-container');
  container.innerHTML = '';

  cards.forEach(card => {
    const div = document.createElement('div');
    div.className = 'col-md-3 mb-3';

    if (card.title === "Users") {
      div.innerHTML = `
        <div class="card ${card.bg}">
          <div>
            <h5>${card.title}</h5>
            <h3 id="users-count">0</h3>
          </div>
          <i class="fa-solid fa-users fa-2x opacity-50"></i>
        </div>
      `;
      container.appendChild(div);
      animateCounter("users-count", card.value);
    } else {
      div.innerHTML = `
        <div class="card ${card.bg}">
          <div>
            <h5>${card.title}</h5>
            <h3>${card.value}</h3>
          </div>
          <i class="fa-solid fa-chart-simple fa-2x opacity-50"></i>
        </div>
      `;
      container.appendChild(div);
    }
  });
}

function animateCounter(id, target) {
  let count = 0;
  const step = Math.ceil(target / 100);
  const el = document.getElementById(id);

  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(interval);
    }
    el.textContent = count;
  }, 20);
}

function loadOrders(orders) {
  const tbody = document.querySelector('#orders-table tbody');
  tbody.innerHTML = '';

  orders.forEach(o => {
    tbody.innerHTML += `
      <tr>
        <td>${o.id}</td>
        <td>${o.customer}</td>
        <td>₹${o.amount}</td>
        <td>${o.status}</td>
      </tr>
    `;
  });
}

/* Dark Mode Toggle */
document.getElementById("themeBtn").onclick = () => {
  document.body.classList.toggle("dark-mode");
};
