'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('products', [{
        name: 'T-shirt',
        description: '100% Ring-spun cotton',
        image: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F3c%2Fa4%2F3ca4f91b[…]IFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]',
        price: 9.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tank top',
        description: '100% Ring-spun cotton',
        image: 'https://cdn.shopify.com/s/files/1/1464/5034/products/LUX-TANK-TOP-GREY.jpg?v=1615591321',
        price: 11.99,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('products', null, {});
     
  }
};
