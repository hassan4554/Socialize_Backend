/**
 * @swagger
 * /comment/create:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Create a new comment
 *     description: Creates a new comment on a post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *               - content
 *             properties:
 *               postId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *                 description: ID of the post to comment on
 *               content:
 *                 type: string
 *                 example: Great post!
 *                 description: Content of the comment
 *     responses:
 *       200:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Comment created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     commentId:
 *                       type: string
 *                       format: uuid
 *                     postId:
 *                       type: string
 *                       format: uuid
 *                     commentedBy:
 *                       type: string
 *                       format: uuid
 *                     content:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Error creating comment
 */


/**
 * @swagger
 * /comment/update:
 *   patch:
 *     tags:
 *       - Comments
 *     summary: Update a comment
 *     description: Updates an existing comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commentId
 *               - content
 *             properties:
 *               commentId:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *                 description: ID of the comment to update (must match path parameter)
 *               content:
 *                 type: string
 *                 example: Updated comment content
 *                 description: New content for the comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Comment updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     commentId:
 *                       type: string
 *                       format: uuid
 *                     postId:
 *                       type: string
 *                       format: uuid
 *                     commentedBy:
 *                       type: string
 *                       format: uuid
 *                     content:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Error updating comment
 *       404:
 *         description: Comment not found
 */


/**
 * @swagger
 * /comment/delete:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Delete a comment
 *     description: Deletes an existing comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000   //postId"
 *                 description: ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Comment deleted successfully
 *       400:
 *         description: Comment not deleted
 *       404:
 *         description: Comment not found
 */
