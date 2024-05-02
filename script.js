/**
 * Array for storing transactions
 */
let transactions = [];

/**
 * Adds a transaction to the list, updates the transactions table, and calculates the total amount.
 *
 * @param {Object} transactionData - The data of the transaction to be added.
 * @return {void} 
 */
function addTransaction(transactionData) {
    const transaction = {
        id: transactions.length + 1,
        date: new Date().toISOString(),
        amount: transactionData.amount,
        category: transactionData.category,
        description: transactionData.description
    };
    transactions.push(transaction);
    addTransactionToTable(transaction);
    calculateTotal();
}

document.addEventListener('click', function(event) {
    const isClickInsideTable = document.getElementById('transactions-table').contains(event.target);
    if (!isClickInsideTable) {
        document.getElementById('detailed-info').innerText = '';
    }
});

/**
 * Adds a transaction to the table.
 *
 * @param {Object} transaction - The transaction object to be added.
 * @param {number} transaction.id - The unique identifier of the transaction.
 * @param {string} transaction.date - The date and time of the transaction.
 * @param {number} transaction.amount - The amount of the transaction.
 * @param {string} transaction.category - The category of the transaction.
 * @param {string} transaction.description - The description of the transaction.
 * @return {void}
 */
function addTransactionToTable(transaction) {
    const table = document.getElementById('transactions-table').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.setAttribute('data-id', transaction.id);
    row.className = transaction.amount > 0 ? 'green' : 'red';
    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description.split(' ').slice(0, 4).join(' ')}</td>
        <td><button onclick="removeTransaction(${transaction.id})">Удалить</button></td>
    `;
    row.onclick = () => {
        document.getElementById('detailed-info').innerText = `ID: ${transaction.id} Description: ${transaction.description}`;
    };
}

/**
 * Removes a transaction from the system based on its ID.
 *
 * @param {number} id - The ID of the transaction to be removed.
 * @return {void} This function does not return a value.
 */

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    const row = document.querySelector(`#transactions-table tbody tr[data-id="${id}"]`);
    if (row) {
        row.remove();
    }
    // Clearing detailed information after each deletion
    document.getElementById('detailed-info').innerText = '';
    calculateTotal();
}

/**
 * Calculates the total amount of transactions and displays it on the page.
 *
 * @return {void} This function does not return anything.
 */

function calculateTotal() {
    const total = transactions.reduce((acc, t) => acc + t.amount, 0);
    document.getElementById('total-sum').innerText = `Total amount: ${total}`;
}

// Form add event handling
document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = parseInt(document.getElementById('amount').value, 10);
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    addTransaction({ amount, description, category });
    this.reset();
});
