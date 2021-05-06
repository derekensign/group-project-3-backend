'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('products', [{
        name: 'T-shirt',
        description: '100% Ring-spun cotton',
        image: 'test.com',
        price: 9.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tank top',
        description: '100% Ring-spun cotton',
        image: 'test.com',
        price: 11.99,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('products', null, {});
     
  }
};
