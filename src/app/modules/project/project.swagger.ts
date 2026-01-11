export const projectSwaggerDocs = {
  "/api/project/create": {
    post: {
      tags: ["project"],
      summary: "project create",
      description: "This is auto generated project create API",
      requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["name"], properties: { name: { type: "string", example: "John Doe" } } } } } },
      responses: { 201: { description: "project created successfully" }, 400: { description: "Validation error" } }
    }
  }
};