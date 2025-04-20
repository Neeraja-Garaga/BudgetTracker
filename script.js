const balance = document.getElementById('balance');
const incomeDisplay = document.getElementById('income');
const expenseDisplay = document.getElementById('expense');
const transactionList = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');

let transactions = [];
function addTransaction(e) {
  e.preventDefault();

  if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
    alert('Please enter a description and amount');
    return;
  }

  const transaction = {
    id: generateID(),
    text: textInput.value,
    amount: parseFloat(amountInput.value)
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  textInput.value = '';
  amountInput.value = '';
}
function generateID() {
  return Math.floor(Math.random() * 100000000);
}
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const li = document.createElement('li');

  li.classList.add(transaction.amount < 0 ? 'negative' : 'positive');
  li.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  transactionList.appendChild(li);
}
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1).toFixed(2);

  balance.innerText = $${total};
  incomeDisplay.innerText = $${income};
  expenseDisplay.innerText = $${expense};
}
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  init();
}
function init() {
  transactionList.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
form.addEventListener('submit', addTransaction);

