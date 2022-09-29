const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Must be not more then 30, got {VALUE}'],
    required: [true, 'Поле "name" должно быть заполнено'],
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: [true, 'Поле "email" должно быть уникально'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Неправильный формат email',
    },
  },
});

function deletePasswordFromUser() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}
userSchema.methods.deletePasswordFromUser = deletePasswordFromUser;

module.exports = mongoose.model('user', userSchema);
