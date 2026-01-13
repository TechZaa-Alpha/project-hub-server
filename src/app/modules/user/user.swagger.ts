export const userSwaggerDocs = {
  "/api/user/update-profile": {
    patch: {
      tags: ["USER API"],
      summary: "Update user profile",
      description:
        "Updates the authenticated user's profile information, including optional profile image upload. Accessible by both ADMIN and USER roles.",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                image: {
                  type: "string",
                  format: "binary",
                  description: "Optional profile image file",
                },
                data: {
                  type: "string",
                  description:
                    "JSON string containing user profile update data (validated by `user_validations.update_user`)",
                  example: JSON.stringify({
                    name: "John Doe",
                    email: "john.doe@example.com",
                    phone: "+8801787654321",
                    address: "Dhaka, Bangladesh",
                  }),
                },
              },
              required: ["data"],
            },
          },
        },
      },
      responses: {
        200: { description: "User profile updated successfully" },
        400: {
          description: "Bad Request — Validation failed or invalid JSON format",
        },
        401: {
          description: "Unauthorized — must be logged in as ADMIN or USER",
        },
      },
    },
  },
  "/api/user/get-overview": {
    get: {
      tags: ["USER API"],
      summary: "Get user overview",
      description: "",
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: "Overview fetched successfully" },
        401: {
          description: "Unauthorized — must be logged in as ADMIN or USER",
        },
      },
    },
  },
  "/api/user/get-all-project": {
    get: {
      tags: ["USER API"],
      summary: "Get all user assigned project",
      description: "",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "searchTerm",
          in: "query",
          required: false,
          schema: {
            type: "string",
          },
        },
        {
          name: "status",
          in: "query",
          required: false,
          schema: {
            type: "string",
            enum: ["RUNNING", "DELIVERED", "CANCELED", "REVISION"],
          },
        },
      ],
      responses: {
        200: { description: "Projects fetched successfully" },
        401: {
          description: "Unauthorized — must be logged in as ADMIN or USER",
        },
      },
    },
  },
  "/api/user/update-project/{projectId}": {
    put: {
      tags: ["USER API"],
      summary: "Get all user assigned project",
      description: "",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "projectId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: false,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  enum: ["RUNNING", "DELIVERED", "CANCELED", "REVISION"],
                  example: "RUNNING",
                },
                progress: {
                  type: "number",
                  minimum: 0,
                  maximum: 100,
                  example: 45,
                },
                figmaLink: {
                  type: "string",
                  format: "uri",
                  example: "https://figma.com/file/xyz",
                },
                frontendLiveLink: {
                  type: "string",
                  format: "uri",
                  example: "https://frontend.projecthub.com",
                },
                backendLiveLink: {
                  type: "string",
                  format: "uri",
                  example: "https://api.projecthub.com",
                },
                aiLiveLink: {
                  type: "string",
                  format: "uri",
                  example: "https://ai.projecthub.com",
                },
                erdLink: {
                  type: "string",
                  format: "uri",
                  example: "https://dbdiagram.io/d/project-erd",
                },
                frontendGitRepoLink: {
                  type: "string",
                  format: "uri",
                  example: "https://github.com/org/frontend",
                },
                backendGitRepoLink: {
                  type: "string",
                  format: "uri",
                  example: "https://github.com/org/backend",
                },
                aiGitRepoLink: {
                  type: "string",
                  format: "uri",
                  example: "https://github.com/org/ai-service",
                },
                notes: {
                  type: "string",
                  example: "Initial project setup completed.",
                }
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Projects fetched successfully" },
        401: {
          description: "Unauthorized — must be logged in as ADMIN or USER",
        },
      },
    },
  },
};
