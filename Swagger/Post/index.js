/**
 * @swagger
 * /post/create:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Create a new post
 *     description: Creates a new post with an uploaded file
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: My awesome post
 *                 description: Title of the post
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Post created successfully
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
 *                   example: Post created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     postId:
 *                       type: string
 *                       format: uuid
 *                     title:
 *                       type: string
 *                     postUrl:
 *                       type: string
 *                     profileId:
 *                       type: string
 *                       format: uuid
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Error creating post
 */

/**
 * @swagger
 * /post/getAllPosts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get all posts
 *     description: Retrieves all posts for a specific profile
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: ownAccount
 *         schema:
 *           type: boolean
 *           example: true
 *         required: true
 *         description: Whether to retrieve posts from the authenticated user's profile
 *       - in: query
 *         name: profileId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: false
 *         description: Profile ID to retrieve posts from (required when ownAccount is false)
 *     responses:
 *       200:
 *         description: Posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       postId:
 *                         type: string
 *                         format: uuid
 *                       title:
 *                         type: string
 *                       postUrl:
 *                         type: string
 *                       profileId:
 *                         type: string
 *                         format: uuid
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       Likes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             likeId:
 *                               type: string
 *                               format: uuid
 *                             postId:
 *                               type: string
 *                               format: uuid
 *                             profileId:
 *                               type: string
 *                               format: uuid
 *                       Comments:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             commentId:
 *                               type: string
 *                               format: uuid
 *                             postId:
 *                               type: string
 *                               format: uuid
 *                             content:
 *                               type: string
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                             updatedAt:
 *                               type: string
 *                               format: date-time
 *       400:
 *         description: Private account or invalid request
 *       404:
 *         description: No posts found or error finding posts
 */


/**
 * @swagger
 * /post/delete:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Delete a post
 *     description: Deletes an existing post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
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
 *                   example: Post deleted successfully
 *       400:
 *         description: Error deleting post
 *       404:
 *         description: Post not found
 */
