

// =====================================
// STUDENT MONEY TRACKER
// JAVASCRIPT
// =====================================


let transactions = [];

let nextID = 1;



// =====================================
// SHOW INCOME FORM
// =====================================

function showIncomeForm() {

    document.getElementById(
        "incomeForm"
    ).style.display = "block";


    document.getElementById(
        "expenseForm"
    ).style.display = "none";

}



// =====================================
// SHOW EXPENSE FORM
// =====================================

function showExpenseForm() {

    document.getElementById(
        "expenseForm"
    ).style.display = "block";


    document.getElementById(
        "incomeForm"
    ).style.display = "none";

}



// =====================================
// HIDE FORMS
// =====================================

function hideForms() {

    document.getElementById(
        "incomeForm"
    ).style.display = "none";


    document.getElementById(
        "expenseForm"
    ).style.display = "none";

}



// =====================================
// SAVE INCOME
// =====================================

function saveIncome() {

    let date =
        document.getElementById(
            "incomeDate"
        ).value;


    let category =
        document.getElementById(
            "incomeCategory"
        ).value;


    let amount =
        parseFloat(
            document.getElementById(
                "incomeAmount"
            ).value
        );


    let description =
        document.getElementById(
            "incomeDescription"
        ).value;


    if (!date) {

        alert("Please select a date.");

        return;

    }


    if (isNaN(amount) || amount <= 0) {

        alert("Please enter a valid amount.");

        return;

    }


    addTransaction(
        date,
        "Income",
        category,
        amount,
        description
    );


    document.getElementById(
        "incomeDate"
    ).value = "";


    document.getElementById(
        "incomeAmount"
    ).value = "";


    document.getElementById(
        "incomeDescription"
    ).value = "";


    hideForms();


    showMessage(
        "✅ Income added successfully!"
    );

}



// =====================================
// SAVE EXPENSE
// =====================================

function saveExpense() {

    let date =
        document.getElementById(
            "expenseDate"
        ).value;


    let category =
        document.getElementById(
            "expenseCategory"
        ).value;


    let amount =
        parseFloat(
            document.getElementById(
                "expenseAmount"
            ).value
        );


    let description =
        document.getElementById(
            "expenseDescription"
        ).value;


    if (!date) {

        alert("Please select a date.");

        return;

    }


    if (isNaN(amount) || amount <= 0) {

        alert("Please enter a valid amount.");

        return;

    }


    addTransaction(
        date,
        "Expense",
        category,
        amount,
        description
    );


    document.getElementById(
        "expenseDate"
    ).value = "";


    document.getElementById(
        "expenseAmount"
    ).value = "";


    document.getElementById(
        "expenseDescription"
    ).value = "";


    hideForms();


    showMessage(
        "✅ Expense added successfully!"
    );

}



// =====================================
// ADD TRANSACTION
// =====================================

function addTransaction(
    date,
    type,
    category,
    amount,
    description
) {

    transactions.push({

        id: nextID,

        date: date,

        type: type,

        category: category,

        amount: amount,

        description: description

    });


    nextID++;


    updateDashboard();

    displayTransactions();

}



// =====================================
// UPDATE DASHBOARD
// =====================================

function updateDashboard() {

    let totalIncome = 0;

    let totalExpense = 0;


    transactions.forEach(
        function(transaction) {

            if (
                transaction.type === "Income"
            ) {

                totalIncome +=
                    transaction.amount;

            }

            else {

                totalExpense +=
                    transaction.amount;

            }

        }
    );


    let balance =
        totalIncome - totalExpense;


    document.getElementById(
        "totalIncome"
    ).innerHTML =
        "RM " +
        totalIncome.toFixed(2);


    document.getElementById(
        "totalExpense"
    ).innerHTML =
        "RM " +
        totalExpense.toFixed(2);


    document.getElementById(
        "totalBalance"
    ).innerHTML =
        "RM " +
        balance.toFixed(2);

}



// =====================================
// DISPLAY TRANSACTIONS
// =====================================

function displayTransactions() {

    let table =
        document.getElementById(
            "transactionTable"
        );


    table.innerHTML = "";


    transactions.forEach(
        function(transaction) {

            let row =
                table.insertRow();


            row.insertCell(0).innerHTML =
                transaction.id;


            row.insertCell(1).innerHTML =
                transaction.date;


            row.insertCell(2).innerHTML =
                transaction.type;


            row.insertCell(3).innerHTML =
                transaction.category;


            row.insertCell(4).innerHTML =
                "RM " +
                transaction.amount.toFixed(2);


            row.insertCell(5).innerHTML =
                transaction.description;


            let actionCell =
                row.insertCell(6);


            actionCell.innerHTML =

                '<button onclick="editTransaction(' +
                transaction.id +
                ')">✏️ Edit</button>' +

                ' ' +

                '<button onclick="deleteTransaction(' +
                transaction.id +
                ')" style="background:#dc2626;">' +

                '🗑️ Delete</button>';

        }
    );

}



// =====================================
// SHOW TRANSACTIONS
// =====================================

function showTransactions() {

    displayTransactions();


    document.getElementById(
        "transactionBox"
    ).style.display = "block";

}



// =====================================
// DELETE TRANSACTION
// =====================================

function deleteTransaction(id) {

    let confirmDelete =
        confirm(
            "Are you sure you want to delete this transaction?"
        );


    if (!confirmDelete) {

        return;

    }


    transactions =
        transactions.filter(
            function(transaction) {

                return transaction.id !== id;

            }
        );


    updateDashboard();

    displayTransactions();


    showMessage(
        "🗑️ Transaction deleted."
    );

}



// =====================================
// EDIT TRANSACTION
// =====================================

function editTransaction(id) {

    let transaction =
        transactions.find(
            function(transaction) {

                return transaction.id === id;

            }
        );


    if (!transaction) {

        return;

    }


    let newAmount =
        prompt(
            "Enter new amount (RM):",
            transaction.amount
        );


    if (newAmount === null) {

        return;

    }


    newAmount =
        parseFloat(newAmount);


    if (
        isNaN(newAmount) ||
        newAmount <= 0
    ) {

        alert(
            "Please enter a valid amount."
        );

        return;

    }


    let newDescription =
        prompt(
            "Enter new description:",
            transaction.description
        );


    if (newDescription === null) {

        return;

    }


    transaction.amount =
        newAmount;


    transaction.description =
        newDescription;


    updateDashboard();

    displayTransactions();


    showMessage(
        "✏️ Transaction updated."
    );

}



// =====================================
// SHOW MESSAGE
// =====================================

function showMessage(message) {

    let messageElement =
        document.getElementById(
            "message"
        );


    messageElement.innerHTML =
        message;


    setTimeout(
        function() {

            messageElement.innerHTML = "";

        },
        3000
    );

}

