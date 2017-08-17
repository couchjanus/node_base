'use strict';

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let PostSchema = new Schema({
  title: {
    type: String,
    required:[true,"title Required"],
    // Данное поле обязательно. Если его нет вывести ошибку с текстом title Required
    // Максимальная длинна 32 Юникод символа (Unicode symbol != byte)
    minlength:[6,"tooShort"],
    unique:true // должно быть уникальным
  },
  content: {
    type: String,
    required:[true,"text Required"]
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['active', 'notpublished', 'private']
    }],
    default: ['active']
  }
  // Здесь будут и другие поля, но сейчас еще рано их сюда ставить!
  // Например коментарии
  // Оценки
  // и тд
  // slug:String
});

module.exports = mongoose.model('Post', PostSchema);
