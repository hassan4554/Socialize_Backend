/**
 * @swagger
 * requests/process:
 *   post:
 *     tags:
 *       - Requests
 *     summary: Process a follow/friend request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - requestId
 *               - status
 *             properties:
 *               requestId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               status:
 *                 type: string
 *                 enum: [rejected, accepted]
 *                 example: "accepted"
 *     responses:
 *       200:
 *         description: Request processed successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Request not found
 */
