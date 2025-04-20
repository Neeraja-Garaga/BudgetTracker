const balance = document.getElementById('balance');
const incomeDisplay = document.getElementById('income');
const expenseDisplay = document.getElementById('expense');
const transactionList = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');

// Holds all transactions
let transactions = [];

// Tracks whether the transaction is income or expense
let transactionType = 'income'; // default

// Called when a user clicks either Income or Expense button
function setTransactionType(type) {
  transactionType = type;
}

// Called when the form is submitted
function addTransaction(e) {
  e.preventDefault();

  // Validation
  if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
    alert('Please enter a description and amount');
    return;
  }

  const amountValue = parseFloat(amountInput.value);

  const transaction = {
    id: generateID(),
    text: textInput.value,
    amount: transactionType === 'expense' 
      ? -Math.abs(amountValue) 
      : Math.abs(amountValue)
  };

  // Add to transactions array
  transactions.push(transaction);

  // Update the DOM and values
  addTransactionDOM(transaction);
  updateValues();

  // Clear inputs
  textInput.value = '';
  amountInput.value = '';
}

// Generates a unique ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Adds the transaction item to the list in the DOM
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

// Calculates and updates balance, income, and expenses
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expense = (
    amounts
      .filter(item => item < 0)
      .reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  incomeDisplay.innerText = `$${income}`;
  expenseDisplay.innerText = `$${expense}`;
}

// Removes a transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  init();
}

// Initializes the app
function init() {
  transactionList.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

// Initial setup
init();

// Handle form submission
form.addEventListener('submit', addTransaction);

