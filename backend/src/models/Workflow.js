const mongoose = require('mongoose');

const WorkflowStepSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Tipo de ação: entity, notification, external
  action: { type: String }, // Ação específica: create, update, delete, etc.
  params: { type: mongoose.Schema.Types.Mixed, required: true }, // Parâmetros necessários para a ação
});

const WorkflowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  steps: [WorkflowStepSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Workflow', WorkflowSchema);
