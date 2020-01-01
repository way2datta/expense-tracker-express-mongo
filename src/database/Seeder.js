import Logger from '../Logger';

const { random } = require('lodash');
const ExpenseCategory = require('./../models/ExpenseCategory');
const Expense = require('./../models/Expense');

module.exports = seedCategories;

function seedCategories() {
  const expenseCategories = [
    { name: 'Bills' },
    { name: 'Grocery' },
    { name: 'Food' },
    { name: 'Drinks' },
    { name: 'Rent' },
    { name: 'EMI' },
    { name: 'Entertainment' },
    { name: 'Fuel' },
    { name: 'Shopping' },
    { name: 'Travel' },
    { name: 'Health' },
    { name: 'Transfers' },
    { name: 'Donations' },
    { name: 'Cash' },
    { name: 'Other' },
  ];

  for (const category of expenseCategories) {
    const newCategory = new ExpenseCategory(category);
    newCategory.save();

    seedExpenses(newCategory);
  }

  Logger.log('Database seeded!');
}


function seedExpenses(categoy) {
  const numberOfExpensesToCreate = random(1, 5);

  for (let i = 0; i <= numberOfExpensesToCreate; i++) {
    const description = `Expense incurred on ${categoy.name}`;
    const expense = {
      amount: random(500, 5500),
      description,
      incurredAt: getRandomDate(),
      category: categoy._id,
    };
    const newExpense = new Expense(expense);
    newExpense.save();
  }
}

function getRandomDate() {
  const start = new Date(2018, 10, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
