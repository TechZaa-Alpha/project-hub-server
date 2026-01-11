import { Schema, model } from "mongoose";
import { T_Project } from "./project.interface";

const project_schema = new Schema<T_Project>({});

export const project_model = model("project", project_schema);
