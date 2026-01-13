export const organizationSwaggerDocs = {
  "/api/organization/create": {
    post: {
      tags: ["ORGANIZATION API"],
      summary: "organization create",
      description: "This is auto generated organization create API",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name"],
              properties: { name: { type: "string", example: "John Doe" } },
            },
          },
        },
      },
      responses: {
        201: { description: "organization created successfully" },
        400: { description: "Validation error" },
      },
    },
  },
};
