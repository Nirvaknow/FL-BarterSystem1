const userInventory = [
  { name: "Apple", value: 1 },
  { name: "Fish", value: 2 },
  { name: "Cloth", value: 3 }
];

const merchantInventory = [
  { name: "Salt", value: 2 },
  { name: "Spices", value: 3 },
  { name: "Rice", value: 1 }
];

let userOffer = [];
let merchantOffer = [];

function renderInventory() {
  const userList = document.getElementById("user-items");
  const merchantList = document.getElementById("merchant-items");
  userList.innerHTML = '';
  merchantList.innerHTML = '';

  userInventory.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.value})`;
    const btn = document.createElement("button");
    btn.textContent = "Offer";
    btn.classList.add('item-btn');
    btn.onclick = () => { userOffer.push(item); userInventory.splice(i, 1); renderAll(); };
    li.appendChild(btn);
    userList.appendChild(li);
  });

  merchantInventory.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.value})`;
    const btn = document.createElement("button");
    btn.textContent = "Ask";
    btn.classList.add('item-btn');
    btn.onclick = () => { merchantOffer.push(item); merchantInventory.splice(i, 1); renderAll(); };
    li.appendChild(btn);
    merchantList.appendChild(li);
  });
}

function renderOffers() {
  const userOfferList = document.getElementById('user-offer');
  const merchantOfferList = document.getElementById('merchant-offer');
  userOfferList.innerHTML = '';
  merchantOfferList.innerHTML = '';
  userOffer.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.value})`;
    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.classList.add('item-btn');
    btn.onclick = () => { userInventory.push(item); userOffer.splice(i, 1); renderAll(); }
    li.appendChild(btn);
    userOfferList.appendChild(li);
  });

  merchantOffer.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.value})`;
    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.classList.add('item-btn');
    btn.onclick = () => { merchantInventory.push(item); merchantOffer.splice(i, 1); renderAll(); }
    li.appendChild(btn);
    merchantOfferList.appendChild(li);
  });
}

function checkTrade() {
  const userSum = userOffer.reduce((sum, item) => sum + item.value, 0);
  const merchantSum = merchantOffer.reduce((sum, item) => sum + item.value, 0);
  return Math.abs(userSum - merchantSum) <= 1; // Allow trade if values nearly match
}

document.getElementById('propose-trade').onclick = function() {
  const result = document.getElementById('result');
  if (userOffer.length === 0 || merchantOffer.length === 0) {
    result.textContent = "Offer at least one item each side!";
    result.style.color = "#b91c1c";
    return;
  }
  if (checkTrade()) {
    result.textContent = "Trade Successful! Items exchanged.";
    result.style.color = "#166534";
    userOffer.forEach(item => merchantInventory.push(item));
    merchantOffer.forEach(item => userInventory.push(item));
    userOffer.length = 0;
    merchantOffer.length = 0;
    renderAll();
  } else {
    result.textContent = "Trade Rejected! Offers not fair.";
    result.style.color = "#ea580c";
  }
};
document.getElementById('reset-trade').onclick = function() {
  result.textContent = "";
  userInventory.push(...userOffer);
  merchantInventory.push(...merchantOffer);
  userOffer.length = 0;
  merchantOffer.length = 0;
  renderAll();
};
function renderAll() {
  renderInventory();
  renderOffers();
}
renderAll();
