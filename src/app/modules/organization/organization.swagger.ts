export const organizationSwaggerDocs = {
  "/api/organization/add-member": {
    put: {
      tags: ["ORGANIZATION API"],
      summary: "Add member into organization - (Only for Organization)",
      description: "",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Maruf" },
                email: { type: "string", example: "eng.marufbilla@gmail.com" },
                password: { type: "string", example: "123456" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Member added successfully" },
        400: { description: "Validation error" },
      },
    },
  },
  "/api/organization/get-member": {
    get: {
      tags: ["ORGANIZATION API"],
      summary: "Get all member of organization - (Only for Organization)",
      description: "",
      responses: {
        200: { description: "Member fetched successfully" },
        400: { description: "Validation error" },
      },
    },
  },
  "/api/organization/remove-member/{userId}": {
    delete: {
      tags: ["ORGANIZATION API"],
      summary: "Remove member from organization - (Only for Organization)",
      description: "",
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: { description: "Member removed successfully" },
        400: { description: "Validation error" },
      },
    },
  },
};
