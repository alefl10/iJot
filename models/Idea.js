import mongoose from 'mongoose';

const { Schema } = mongoose;

const IdeaSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

});
