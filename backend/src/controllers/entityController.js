const Entity = require('../models/Entity');

exports.createEntity = async (req, res) => {
    const { name, components } = req.body;
    try {
        const entity = new Entity({ name, components, createdBy: req.user.id });
        await entity.save();
        res.status(201).json(entity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getEntities = async (req, res) => {
    try {
        const entities = await Entity.find();
        res.json(entities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEntity = async (req, res) => {
    try {
        const entity = await Entity.findById(req.params.id);
        if (!entity) {
            return res.status(404).json({ message: 'Entity not found' });
        }
        res.json(entity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEntity = async (req, res) => {
    const { name, components } = req.body;
    try {
        const entity = await Entity.findByIdAndUpdate(req.params.id, { name, components }, { new: true });
        if (!entity) {
            return res.status(404).json({ message: 'Entity not found' });
        }
        res.json(entity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteEntity = async (req, res) => {
    try {
        const entity = await Entity.findByIdAndDelete(req.params.id);
        if (!entity) {
            return res.status(404).json({ message: 'Entity not found' });
        }
        res.json({ message: 'Entity deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addRecord = async (req, res) => {
    const { id } = req.params;
    const record = req.body;
    try {
      const entity = await Entity.findById(id);
      if (!entity) {
        return res.status(404).json({ message: 'Entity not found' });
      }
      entity.records.push({ data: record, createdBy: req.user.id });
      await entity.save();
      res.status(201).json({ message: 'Record added successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.getRecords = async (req, res) => {
    const { id } = req.params;
    try {
      const entity = await Entity.findById(id);
      if (!entity) {
        return res.status(404).json({ message: 'Entity not found' });
      }
      res.json(entity.records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.editRecord = async (req, res) => {
    const { id, recordId } = req.params;
    const record = req.body;
    try {
      const entity = await Entity.findById(id);
      if (!entity) {
        return res.status(404).json({ message: 'Entity not found' });
      }
      const recordIndex = entity.records.findIndex((r) => r._id == recordId);
      if (recordIndex === -1) {
        return res.status(404).json({ message: 'Record not found' });
      }
      entity.records[recordIndex].data = record;
      await entity.save();
      res.json({ message: 'Record updated successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

exports.deleteRecord = async (req, res) => {
    const { id, recordId } = req.params;
    try {
    const entity = await Entity.findById(id);
    if (!entity) {
        return res.status(404).json({ message: 'Entity not found' });
    }
    const recordIndex = entity.records.findIndex((r) => r._id == recordId);
    if (recordIndex === -1) {
        return res.status(404).json({ message: 'Record not found' });
    }
    entity.records.splice(recordIndex, 1);
    await entity.save();
    res.json({ message: 'Record deleted successfully' });
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};


  