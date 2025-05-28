/**
 * @swagger
 * /interaction/follow:
 *   post:
 *     tags:
 *       - Interactions
 *     summary: Follow a user
 *     description: Send a follow request or follow a user depending on their privacy settings
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
 *                 example: "123e4567-e89b-12d3-a456-426614174000   //profileId to follow"
 *                 description: ID of the profile to follow
 *     responses:
 *       200:
 *         description: Successfully followed or sent follow request
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
 *                   example: Followed successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     friendId:
 *                       type: string
 *                       format: uuid
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                     friendsId:
 *                       type: string
 *                       format: uuid
 *       400:
 *         description: Error following user (already followed, private account, etc.)
 */


/**
 * @swagger
 * /interaction/get-followers:
 *   get:
 *     tags:
 *       - Interactions
 *     summary: Get followers
 *     description: Retrieve a list of users who follow the specified profile
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: ownAccount
 *         required: true
 *         schema:
 *           type: boolean
 *           example: true
 *         description: Whether to retrieve followers for the authenticated user's profile
 *       - in: query
 *         name: profileId
 *         required: false
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Profile ID to retrieve followers for (required when ownAccount is false)
 *     responses:
 *       200:
 *         description: Followers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 messages:
 *                   type: string
 *                   example: ok
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       example: 10
 *                     rows:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           friendId:
 *                             type: string
 *                             format: uuid
 *                           userId:
 *                             type: string
 *                             format: uuid
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *       400:
 *         description: Private account or invalid request
 *       404:
 *         description: Profile not found
 */


/**
 * @swagger
 * /interaction/get-following:
 *   get:
 *     tags:
 *       - Interactions
 *     summary: Get following
 *     description: Retrieve a list of users that the specified profile follows
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: ownAccount
 *         required: true
 *         schema:
 *           type: boolean
 *           example: true
 *         description: Whether to retrieve following for the authenticated user's profile
 *       - in: query
 *         name: profileId
 *         required: false
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Profile ID to retrieve following for (required when ownAccount is false)
 *     responses:
 *       200:
 *         description: Following retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 messages:
 *                   type: string
 *                   example: ok
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       example: 10
 *                     rows:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           friendId:
 *                             type: string
 *                             format: uuid
 *                           userId:
 *                             type: string
 *                             format: uuid
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *       400:
 *         description: Private account or invalid request
 *       404:
 *         description: Profile not found
 */



/**
 * @swagger
 * /interaction/unfollow:
 *   post:
 *     tags:
 *       - Interactions
 *     summary: Unfollow a user
 *     description: Remove a user from your following list
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
 *                 example: "123e4567-e89b-12d3-a456-426614174000   //profileId to unfollow"
 *                 description: ID of the profile to unfollow
 *     responses:
 *       200:
 *         description: User unfollowed successfully
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
 *                   example: User unfollowed
 *       400:
 *         description: Error unfollowing user
 *       404:
 *         description: User not found
 */