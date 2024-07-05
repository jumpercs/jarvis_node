const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  label: { type: String, required: true },
  validation: { type: Object, required: false },
});

const RecordSchema = new mongoose.Schema({
  data: { type: Map, of: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const EntitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  components: [ComponentSchema],
  records: [RecordSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Entity', EntitySchema);
