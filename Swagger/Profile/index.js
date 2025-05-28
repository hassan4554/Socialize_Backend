/**
 * @swagger
 * /profile/create:
 *   post:
 *     tags:
 *       - Profiles
 *     summary: Create a new profile
 *     description: Creates a profile for an existing user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 pattern: '^[a-z0-9_.]+$'
 *                 example: "john_doe123"
 *                 description: Unique username, lowercase letters, numbers, dots, and underscores only
 *     responses:
 *       200:
 *         description: Profile created successfully
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
 *                   example: Profile created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     profileId:
 *                       type: string
 *                       format: uuid
 *                     username:
 *                       type: string
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Profile already exists
 */


/**
 * @swagger
 * /profile/get:
 *   get:
 *     tags:
 *       - Profiles
 *     summary: Get profile information
 *     description: Retrieves profile information for the authenticated user or another user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: ownAccount
 *         required: true
 *         schema:
 *           type: boolean
 *           example: true
 *         description: Whether to retrieve the authenticated user's profile
 *       - in: query
 *         name: profileId
 *         required: false
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Profile ID to retrieve (required when ownAccount is false)
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
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
 *                   example: Profile found
 *                 data:
 *                   type: object
 *                   properties:
 *                     profileId:
 *                       type: string
 *                       format: uuid
 *                     username:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     profilePicture:
 *                       type: string
 *                     isPrivate:
 *                       type: boolean
 *                     isEnabled:
 *                       type: boolean
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     Posts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           postId:
 *                             type: string
 *                             format: uuid
 *                           title:
 *                             type: string
 *                           postUrl:
 *                             type: string
 *                           Likes:
 *                             type: array
 *                             items:
 *                               type: object
 *                           Comments:
 *                             type: array
 *                             items:
 *                               type: object
 *                     followers:
 *                       type: object
 *                       properties:
 *                         count:
 *                           type: integer
 *                         rows:
 *                           type: array
 *                           items:
 *                             type: object
 *                     following:
 *                       type: object
 *                       properties:
 *                         count:
 *                           type: integer
 *                         rows:
 *                           type: array
 *                           items:
 *                             type: object
 *       400:
 *         description: Private account
 *       404:
 *         description: Profile not found
 */


/**
 * @swagger
 * /profile/update:
 *   patch:
 *     tags:
 *       - Profiles
 *     summary: Update profile
 *     description: Updates the authenticated user's profile information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - isPrivate
 *             properties:
 *               bio:
 *                 type: string
 *                 example: "Software developer passionate about web technologies"
 *                 description: User biography
 *               isPrivate:
 *                 type: boolean
 *                 example: true
 *                 description: Whether the profile is private
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Profile picture
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     profileId:
 *                       type: string
 *                       format: uuid
 *                     username:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     profilePicture:
 *                       type: string
 *                     isPrivate:
 *                       type: boolean
 *                     isEnabled:
 *                       type: boolean
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                 status:
 *                   type: integer
 *                   example: 200
 *       400:
 *         description: No valid data provided for update
 *       404:
 *         description: User not found
 */


/**
 * @swagger
 * /profile/delete:
 *   delete:
 *     tags:
 *       - Profiles
 *     summary: Delete profile
 *     description: Deletes the authenticated user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile deleted successfully
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
 *                   example: Profile deleted successfully
 *       400:
 *         description: Error in deleting profile
 */
