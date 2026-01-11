export const authSwaggerDocs = {
  "/api/auth/register-organization": {
    post: {
      tags: ["AUTH API"],
      summary: "Register a new organization",
      description: "",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                organizationAdminName: { type: "string", example: "John Doe" },
                organizationName: {
                  type: "string",
                  example: "My Organization",
                },
                email: { type: "string", example: "user@example.com" },
                password: { type: "string", example: "secret123" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Organization registered successfully" },
        400: { description: "Validation error or user already exists" },
      },
    },
  },

  "/api/auth/login": {
    post: {
      tags: ["AUTH API"],
      summary: "Login a user",
      description: "AUTH APIenticate user with email and password.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: {
                  type: "string",
                  example: "softvence.abumahid@gmail.com",
                },
                password: { type: "string", example: "123456" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "User logged in successfully" },
        401: { description: "Invalid credentials" },
      },
    },
  },

  "/api/auth/me": {
    get: {
      tags: ["AUTH API"],
      summary: "Get logged-in user's profile",
      description: "Fetch the authenticated user's profile details.",
      security: [{ bearAuth: [] }],
      responses: {
        200: { description: "Profile data retrieved successfully" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/auth/change-password": {
    post: {
      tags: ["AUTH API"],
      summary: "Change password (authenticated users)",
      security: [{ bearAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["oldPassword", "newPassword"],
              properties: {
                oldPassword: { type: "string", example: "oldPass123" },
                newPassword: { type: "string", example: "newPass456" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Password changed successfully" },
        400: { description: "Invalid old password or bad request" },
      },
    },
  },

  "/api/auth/forgot-password": {
    post: {
      tags: ["AUTH API"],
      summary: "Request password reset",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email"],
              properties: {
                email: { type: "string", example: "user@example.com" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Password reset link sent to email" },
        404: { description: "User not found" },
      },
    },
  },

  "/api/auth/reset-password": {
    post: {
      tags: ["AUTH API"],
      summary: "Reset password using token",
      description:
        "Reset the user's password using a valid token sent to their email.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["token", "email", "newPassword"],
              properties: {
                token: { type: "string", example: "eyJhbGciOiJIUz..." },
                email: { type: "string", example: "user@example.com" },
                newPassword: { type: "string", example: "newSecret123" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Password reset successfully" },
        400: { description: "Invalid or expired token" },
      },
    },
  },
};
