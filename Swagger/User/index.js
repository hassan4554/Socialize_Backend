/**
 * @swagger
 * /user:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update user information
 *     description: Updates the authenticated user's personal information
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
 *                 minLength: 3
 *                 maxLength: 50
 *                 pattern: '^[a-zA-Z\s]+$'
 *                 example: "John Smith"
 *                 description: User's full name, only letters and spaces allowed
 *               contact:
 *                 type: string
 *                 pattern: '^[0-9]+$'
 *                 minLength: 12
 *                 maxLength: 12
 *                 example: "123456789012"
 *                 description: Contact number, exactly 12 digits
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
 *                   example: "Profile updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     contact:
 *                       type: string
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
 * /user/getUser:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by username
 *     description: Retrieves user information by username
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *           example: "john_doe123"
 *         required: true
 *         description: Username to search for
 *     responses:
 *       200:
 *         description: User found
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
 *                   example: "User found"
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: UUID
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     contact:
 *                       type: string
 *                       example: "123456789012"
 *       400:
 *         description: No username recieved
 *       404:
 *         description: No user found
 */



/**
 * @swagger
 * /user:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user account
 *     description: Deletes the authenticated user's account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
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
 *                   example: "User deleted successfully"
 *       400:
 *         description: Error deleting user
 */



/**
 * @swagger
 * /user/update-password:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user password
 *     description: Updates the authenticated user's password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - newPassword
 *               - confirmNewPassword
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "OldPassword1@"
 *                 description: Current password
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: "NewPassword1@"
 *                 description: New password with at least one lowercase, uppercase, digit, and special character
 *               confirmNewPassword:
 *                 type: string
 *                 example: "NewPassword1@"
 *                 description: Must match the newPassword field
 *     responses:
 *       200:
 *         description: Password updated successfully
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
 *                   example: "Password updated successfully"
 *       400:
 *         description: Validation error or passwords don't match
 *       401:
 *         description: Current password is incorrect
 */
