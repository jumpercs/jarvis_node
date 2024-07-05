const express = require('express');
const {
  createWorkflow,
  getWorkflows,
  getWorkflow,
  updateWorkflow,
  deleteWorkflow,
  executeWorkflow,
} = require('../controllers/workflowController');
const { authenticateJWT, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Workflows
 *   description: API for managing workflows
 */

/**
 * @swagger
 * /api/workflows:
 *   post:
 *     summary: Create a new workflow
 *     tags: [Workflows]
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
 *               steps:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     action:
 *                       type: string
 *                     params:
 *                       type: object
 *     responses:
 *       201:
 *         description: Workflow created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', authenticateJWT, authorizeRoles('admin', 'editor'), createWorkflow);

/**
 * @swagger
 * /api/workflows:
 *   get:
 *     summary: Get all workflows
 *     tags: [Workflows]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all workflows
 */
router.get('/', authenticateJWT, authorizeRoles('admin', 'editor', 'viewer'), getWorkflows);

/**
 * @swagger
 * /api/workflows/{id}:
 *   get:
 *     summary: Get a single workflow by ID
 *     tags: [Workflows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The workflow ID
 *     responses:
 *       200:
 *         description: Workflow data
 *       404:
 *         description: Workflow not found
 */
router.get('/:id', authenticateJWT, authorizeRoles('admin', 'editor', 'viewer'), getWorkflow);

/**
 * @swagger
 * /api/workflows/{id}:
 *   put:
 *     summary: Update a workflow by ID
 *     tags: [Workflows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The workflow ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               steps:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     action:
 *                       type: string
 *                     params:
 *                       type: object
 *     responses:
 *       200:
 *         description: Workflow updated successfully
 *       404:
 *         description: Workflow not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', authenticateJWT, authorizeRoles('admin', 'editor'), updateWorkflow);

/**
 * @swagger
 * /api/workflows/{id}:
 *   delete:
 *     summary: Delete a workflow by ID
 *     tags: [Workflows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The workflow ID
 *     responses:
 *       200:
 *         description: Workflow deleted successfully
 *       404:
 *         description: Workflow not found
 */
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deleteWorkflow);

/**
 * @swagger
 * /api/workflows/{id}/execute:
 *   post:
 *     summary: Execute a workflow by ID
 *     tags: [Workflows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The workflow ID
 *     responses:
 *       200:
 *         description: Workflow executed successfully
 *       404:
 *         description: Workflow not found
 */
router.post('/:id/execute', authenticateJWT, authorizeRoles('admin', 'editor'), executeWorkflow);

module.exports = router;
