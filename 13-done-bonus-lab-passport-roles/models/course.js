const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const courseSchema = new Schema({
  title: String,
  leadTeacher: String,
  startDate: Date,
  endDate: Date,
  TAs: String,
  courseImg: String,
  description: String,
  status: {type: String, enum: ['ON', 'OFF']},
  students: [ {type: Schema.Types.ObjectId, ref: 'User'} ],
  location: { type: { type: String }, coordinates: [Number] }
}, {
  timestamps: true
});

courseSchema.index({location: '2dsphere'});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;