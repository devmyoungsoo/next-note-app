const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: [40, '제목은 40자 초과 할 수 없습니다!']
    },
    description: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: [200, '설명은 200자 초과 할 수 없습니다!']
    }
})

module.exports = mongoose.models.Note || mongoose.model('Note',NoteSchema);