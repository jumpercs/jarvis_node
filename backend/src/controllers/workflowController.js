const Workflow = require('../models/Workflow');
const Entity = require('../models/Entity');

exports.createWorkflow = async (req, res) => {
  const { name, steps } = req.body;
  try {
    const workflow = new Workflow({ name, steps, createdBy: req.user.id });
    await workflow.save();
    res.status(201).json(workflow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find();
    res.json(workflows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id);
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.json(workflow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateWorkflow = async (req, res) => {
  const { name, steps } = req.body;
  try {
    const workflow = await Workflow.findByIdAndUpdate(req.params.id, { name, steps }, { new: true });
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.json(workflow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findByIdAndDelete(req.params.id);
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.json({ message: 'Workflow deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.executeWorkflow = async (req, res) => {
    try {
      const workflow = await Workflow.findById(req.params.id);
      if (!workflow) {
        return res.status(404).json({ message: 'Workflow not found' });
      }
  
      for (const step of workflow.steps) {
        switch (step.type) {
          case 'entity':
            await handleEntityAction(step.action, step.params, req.user.id);
            break;
          case 'notification':
            await handleNotificationAction(step.params);
            break;
          case 'external':
            await handleExternalAction(step.params);
            break;
          default:
            return res.status(400).json({ message: `Unknown step type: ${step.type}` });
        }
      }
  
      res.json({ message: 'Workflow executed successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const handleEntityAction = async (action, params, userId) => {
    const entity = await Entity.findById(params.entityId);
    if (!entity) {
      throw new Error(`Entity with ID ${params.entityId} not found`);
    }
  
    switch (action) {
      case 'create':
        entity.records.push({ data: params.record, createdBy: userId });
        await entity.save();
        break;
      case 'update':
        const recordIndex = entity.records.findIndex((r) => r._id == params.recordId);
        if (recordIndex === -1) {
          throw new Error('Record not found');
        }
        entity.records[recordIndex].data = params.record;
        await entity.save();
        break;
      case 'delete':
        const deleteIndex = entity.records.findIndex((r) => r._id == params.recordId);
        if (deleteIndex === -1) {
          throw new Error('Record not found');
        }
        entity.records.splice(deleteIndex, 1);
        await entity.save();
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  };
  
  const handleNotificationAction = async (params) => {
    // Implementar envio de notificação, por exemplo, via email
    console.log(`Sending notification to ${params.email}: ${params.message}`);
  };
  
  const handleExternalAction = async (params) => {
    // Implementar integração com sistemas externos
    console.log(`Calling external system with params: ${JSON.stringify(params)}`);
  };
