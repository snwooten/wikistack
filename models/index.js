var Sequelize = require('sequelize');
//setting db isntance in models
var db = new Sequelize('postgres://localhost:5432/wikistack', { logging: false});//logging: false stops sequelize loging in terminal


const Page = db.define('page', {
   title: {
    type:
      Sequelize.STRING,
      //allowNull: false means this field is required
    allowNull:
      false
    },
   urlTitle: {type:
      Sequelize.STRING,
    allowNull:
      false
  },
   content: {
    type:
      Sequelize.TEXT,
    allowNull:
      false
  },
   status: {
    type:
      Sequelize.ENUM('open', 'closed')
  },
   date: {
    type:
      Sequelize.DATE,
    defaultValue:
      Sequelize.NOW
   }
}, {
  getterMethods: {
    route() {
      return '/wiki/' + this.urlTitle
    }
  },
  hooks: {//run before model validates, so use method 'before validate'
      beforeValidate: generatedUrl = (page) => {
        if (page.title){
          page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, ''); //use regex to remove any non alphanumeric values & replace spaces with _
      } else {
          page.urlTitle = Math.random().toString(36).substring(2, 7);//generate random 5 letter sting
          }
        }
      }
});

const User = db.define('user', {
  name: {
    type:
      Sequelize.STRING,
    allowNull:
      false
  },
  email: {
    type:
      Sequelize.STRING,
    allowNull:
      false,
      //validates that this is an email address
    validate: {
            isEmail: true
        }
  }
});

module.exports = {db, Page, User};

