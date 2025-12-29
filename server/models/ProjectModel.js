const mongoose = require('mongoose');

// This is the blueprint (Schema) for our projects
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // The title is mandatory
  },
  desription : {
    type: String,
    required: true,
  },
  techStack: {
    type: [String], // An array of strings
    required: true,
  }
});

// This creates the tool (Model) we can use to interact with the 'projects' collection
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
