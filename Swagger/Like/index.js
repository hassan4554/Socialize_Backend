/**
 * @swagger
 * /like/create:
 *   post:
 *     tags:
 *       - Likes
 *     summary: Like a post
 *     description: Creates a like on a post for the authenticated user
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
 *                 description: ID of the post to like
 *     responses:
 *       200:
 *         description: Post liked successfully
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
 *                   example: Liked post
 *       400:
 *         description: Error liking the post
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /like/get/{postId}:
 *   get:
 *     tags:
 *       - Likes
 *     summary: Get likes for a post
 *     description: Retrieves all likes for a specific post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the post to get likes for
 *     responses:
 *       200:
 *         description: Likes retrieved successfully
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
 *                   example: Likes retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       likeId:
 *                         type: string
 *                         format: uuid
 *                       postId:
 *                         type: string
 *                         format: uuid
 *                       likedBy:
 *                         type: string
 *                         format: uuid
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       404:
 *         description: Post not found
 */


/**
 * @swagger
 * /like/delete:
 *   delete:
 *     tags:
 *       - Likes
 *     summary: Unlike a post
 *     description: Removes a like from a post for the authenticated user
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
 *                 description: ID of the post to unlike
 *     responses:
 *       200:
 *         description: Post unliked successfully
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
 *                   example: Post unliked successfully
 *       400:
 *         description: Error unliking post
 *       404:
 *         description: Like not found
 */
