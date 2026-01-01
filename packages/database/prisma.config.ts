/// <reference types="node" />

import "dotenv/config";
import { defineConfig } from "prisma/config";


console.log('=== DATABASE_URL DEBUG ===');
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('========================');

export default defineConfig({
  datasource: {
    url: process.env["DATABASE_URL"]
  },
  schema: "./prisma/schema.prisma",
});
