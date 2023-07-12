'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('recipe_api', [{
      title: "Cookie",
    ingredients: "Cookie Dough",
    description: "A Cookie",
    instructions: "Put it in the oven at 360 for 24hrs",
    created_at: new Date(),
    updated_at: new Date()
  },  {
    title: "Water",
  ingredients: "H2O",
  description: "Water",
  instructions: "Wait for the rain",
  created_at: new Date(),
  updated_at: new Date()
}, {
  title: "Bread",
ingredients: "Wheat, water, yeast, etc",
description: "Mix it then throw it.",
instructions: "Put it in the oven at 360 for 240hrs",
created_at: new Date(),
updated_at: new Date()
}  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('recipe_api', null, {});
  }

};

