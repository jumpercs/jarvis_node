const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Entity = require('./src/models/Entity');

dotenv.config();

const entities = [
  {
    name: 'User',
    components: [
      { type: 'text', label: 'Username', validation: { required: true } },
      { type: 'text', label: 'Email', validation: { required: true, email: true } },
      { type: 'password', label: 'Password', validation: { required: true } },
    ],
    createdBy: null // Será atualizado com o ID do usuário administrador criado abaixo
  },
  {
    name: 'Product',
    components: [
      { type: 'text', label: 'Name', validation: { required: true } },
      { type: 'number', label: 'Price', validation: { required: true, min: 0 } },
      { type: 'text', label: 'Description', validation: { required: true } },
      { type: 'select', label: 'Category', validation: { required: true, options: ['Electronics', 'Books', 'Clothing'] } },
    ],
    createdBy: null // Será atualizado com o ID do usuário administrador criado abaixo
  },
  {
    name: 'Order',
    components: [
      { type: 'text', label: 'Product ID', validation: { required: true } },
      { type: 'text', label: 'User ID', validation: { required: true } },
      { type: 'number', label: 'Quantity', validation: { required: true, min: 1 } },
      { type: 'date', label: 'Order Date', validation: { required: true } },
    ],
    createdBy: null // Será atualizado com o ID do usuário administrador criado abaixo
  }
];

const adminUser = {
  username: 'admin',
  password: 'admin123',
  role: 'admin'
};

const initializeData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Cria o usuário administrador
    const admin = new User(adminUser);
    await admin.save();

    // Atualiza o campo createdBy nas entidades
    entities.forEach(entity => {
      entity.createdBy = admin._id;
    });

    // Insere as entidades no banco de dados
    for (const entity of entities) {
      const newEntity = new Entity(entity);
      await newEntity.save();
    }

    console.log('Initial data loaded successfully');
  } catch (error) {
    console.error('Error loading initial data:', error);
  } finally {
    mongoose.connection.close();
  }
};

initializeData();
