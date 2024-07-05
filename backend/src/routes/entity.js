const express = require('express');
const {
  createEntity,
  getEntities,
  getEntity,
  updateEntity,
  deleteEntity,
  addRecord,
  getRecords,
  editRecord,
  deleteRecord,
} = require('../controllers/entityController');
const { authenticateJWT, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Entities
 *   description: API for managing entities
 */

/**
 * @swagger
 * /api/entities:
 *   post:
 *     summary: Create a new entity
 *     tags: [Entities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               components:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     label:
 *                       type: string
 *                     validation:
 *                       type: object
 *     responses:
 *       201:
 *         description: Entity created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', authenticateJWT, authorizeRoles('admin', 'editor'), createEntity);

/**
 * @swagger
 * /api/entities:
 *   get:
 *     summary: Get all entities
 *     tags: [Entities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all entities
 */
router.get('/', authenticateJWT, authorizeRoles('admin', 'editor', 'viewer'), getEntities);

/**
 * @swagger
 * /api/entities/{id}:
 *   get:
 *     summary: Get a single entity by ID
 *     tags: [Entities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The entity ID
 *     responses:
 *       200:
 *         description: Entity data
 *       404:
 *         description: Entity not found
 */
router.get('/:id', authenticateJWT, authorizeRoles('admin', 'editor', 'viewer'), getEntity);

/**
 * @swagger
 * /api/entities/{id}:
 *   put:
 *     summary: Update an entity by ID
 *     tags: [Entities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The entity ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               components:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     label:
 *                       type: string
 *                     validation:
 *                       type: object
 *     responses:
 *       200:
 *         description: Entity updated successfully
 *       404:
 *         description: Entity not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', authenticateJWT, authorizeRoles('admin', 'editor'), updateEntity);

/**
 * @swagger
 * /api/entities/{id}:
 *   delete:
 *     summary: Delete an entity by ID
 *     tags: [Entities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The entity ID
 *     responses:
 *       200:
 *         description: Entity deleted successfully
 *       404:
 *         description: Entity not found
 */
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deleteEntity);

/**
 * @swagger
 * /api/entities/{id}/records:
 *   post:
 *     summary: Add a record to an entity
 *     tags: [Entities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The entity ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Record added successfully
 *       404:
 *         description: Entity not found
 *       400:
 *         description: Bad request
 */
router.post('/:id/records', authenticateJWT, authorizeRoles('admin', 'editor'), addRecord);

/**
 * @swagger
 * /api/entities/{id}/records:
 *   get:
 *     summary: Get all records of an entity
 *     tags: [Entities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The entity ID
 *     responses:
 *       200:
 *         description: List of records
 *       404:
 *         description: Entity not found
 */
router.get('/:id/records', authenticateJWT, authorizeRoles('admin', 'editor', 'viewer'), getRecords);

/**
 * @swagger
 * /api/entities/{id}/records/{recordId}:
 *   put:
 *     summary: Update a record of an entity
 *     tags: [Entities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The entity ID
 *       - in: path
 *         name: recordId
 *         schema:
 *           type: string
 *         required: true
 *         description: The record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Record updated successfully
 *       404:
 *         description: Entity or record not found
 *       400:
 *         description: Bad request
 */
router.put('/:id/records/:recordId', authenticateJWT, authorizeRoles('admin', 'editor'), editRecord);

/**
 * @swagger
 * /api/entities/{id}/records/{recordId}:
 *   delete:
 *     summary: Delete a record of an entity
 *     tags: [Entities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The entity ID
 *       - in: path
 *         name: recordId
 *         schema:
 *           type: string
 *         required: true
 *         description: The record ID
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *       404:
 *         description: Entity or record not found
 */
router.delete('/:id/records/:recordId', authenticateJWT, authorizeRoles('admin', 'editor'), deleteRecord);

module.exports = router;
