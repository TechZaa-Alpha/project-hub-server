import path from "path";
import { configs } from "./app/configs";
import { authSwaggerDocs } from "./app/modules/auth/auth.swagger";
import { organizationSwaggerDocs } from "./app/modules/organization/organization.swagger";
import { projectSwaggerDocs } from "./app/modules/project/project.swagger";
import { userSwaggerDocs } from "./app/modules/user/user.swagger";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project Hub API",
      version: "v-1.0.0",
      description: "Express API with auto-generated Swagger docs",
    },
    paths: {
      ...authSwaggerDocs,
      ...userSwaggerDocs,

      ...projectSwaggerDocs,
      ...organizationSwaggerDocs,
    },
    servers:
      configs.env === "production"
        ? [{ url: "https://test-9xcp.onrender.com" }, { url: "http://localhost:5000" }]
        : [{ url: "http://localhost:5000" }, { url: "https://test-9xcp.onrender.com" }],
    components: {
      securitySchemes: {
        AuthorizationToken: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "Put your accessToken here ",
        },
      },
    },
    security: [
      {
        AuthorizationToken: [],
      },
    ],
  },
  apis: [
    path.join(
      __dirname,
      configs.env === "production" ? "./**/*.js" : "./**/*.ts"
    ),
  ],
};
