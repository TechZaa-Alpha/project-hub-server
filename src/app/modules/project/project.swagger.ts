export const projectSwaggerDocs = {
  "/api/project/save-project": {
    post: {
      tags: ["PROJECT API"],
      summary: " Save a new Project -- (Only for Organization)",
      description: "",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                orderId: {
                  type: "string",
                  example: "ORD-2026-001",
                },
                projectName: {
                  type: "string",
                  example: "ERP Management System",
                },
                profileName: {
                  type: "string",
                  example: "Enterprise Client",
                },
                price: {
                  type: "number",
                  example: 2500,
                },
                assignDate: {
                  type: "string",
                  format: "date-time",
                  example: "2026-01-12T10:00:00Z",
                },
                expectedDeliveryDate: {
                  type: "string",
                  format: "date-time",
                  example: "2026-02-15T18:00:00Z",
                },
                actualDeliveryDate: {
                  type: "string",
                  format: "date-time",
                  example: "2026-02-14T16:30:00Z",
                },
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
        201: { description: "Project created successfully" },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
      },
    },
  },
  "/api/project/get-project": {
    get: {
      tags: ["PROJECT API"],
      summary: "Get all projects -- (Only for Organization)",
      description: "",
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
          name: "page",
          in: "query",
          required: false,
          schema: {
            type: "number",
            default: 1,
          },
        },
        {
          name: "limit",
          in: "query",
          required: false,
          schema: {
            type: "number",
            default: 10,
          },
        },
      ],
      responses: {
        201: { description: "Project fetched successfully" },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
      },
    },
  },
  "/api/project/get-project/{projectId}": {
    get: {
      tags: ["PROJECT API"],
      summary: "Get single project -- (Only for Organization || User)",
      description: "",
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
      responses: {
        201: { description: "Project fetched successfully" },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
      },
    },
  },
  "/api/project/update-project/{projectId}": {
    put: {
      tags: ["PROJECT API"],
      summary: "Update Project -- (Only for Organization)",
      description: "",
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
                orderId: {
                  type: "string",
                  example: "ORD-2026-001",
                },
                projectName: {
                  type: "string",
                  example: "ERP Management System",
                },
                profileName: {
                  type: "string",
                  example: "Enterprise Client",
                },
                price: {
                  type: "number",
                  example: 2500,
                },
                assignDate: {
                  type: "string",
                  format: "date-time",
                  example: "2026-01-12T10:00:00Z",
                },
                expectedDeliveryDate: {
                  type: "string",
                  format: "date-time",
                  example: "2026-02-15T18:00:00Z",
                },
                actualDeliveryDate: {
                  type: "string",
                  format: "date-time",
                  example: "2026-02-14T16:30:00Z",
                },
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
        201: { description: "Project created successfully" },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
      },
    },
  },
  "/api/project/assign-member/{projectId}": {
    put: {
      tags: ["PROJECT API"],
      summary: "Assign member into project -- (Only for Organization)",
      description: "",
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
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",

              example: JSON.stringify({
                members: [
                  "65a4c2e2f1d9b7c8a1234567",
                  "65a4c2e2f1d9b7c8a7654321",
                ],
              }),
            },
          },
        },
      },
      responses: {
        201: { description: "Member assign successfully" },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
      },
    },
  },
  "/api/project/remove-member/{projectId}": {
    put: {
      tags: ["PROJECT API"],
      summary: "Remove member from project -- (Only for Organization)",
      description: "",
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
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",

              example: JSON.stringify({
                members: [
                  "65a4c2e2f1d9b7c8a1234567",
                  "65a4c2e2f1d9b7c8a7654321",
                ],
              }),
            },
          },
        },
      },
      responses: {
        201: { description: "Member remove successfully" },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
      },
    },
  },
  "/api/project/delete-project/{projectId}": {
    delete: {
      tags: ["PROJECT API"],
      summary: "Delete project -- (Only for Organization)",
      description: "",
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
      responses: {
        201: { description: "Project deleted successfully" },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
      },
    },
  },
};
