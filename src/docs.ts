import swaggerJSDoc from "swagger-jsdoc";
`swagger: "2.0"
info:
  version: 1.0.0
  title: Random words
  description: An API to get random words
  termsOfService: terms
  contact:
    name: Baelhadj Hadj Aissa
    url: https://bakaji.github.io/CV
    email: baelhadj.r@gmail.com
  license:
    name: License MIT
    url: http://opensource.org/licenses/MIT
    `;

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: {
      title: "Random words",
      version: "1.0.0",
      description: "An API to get random words",
      contact: {
        name: "Baelhadj Hadj Aissa",
        email: "baelhadj.r@gmail.com",
        url: "https://bakaji.github.io/CV/",
      },
      license: {
        name: "License MIT",
        url: "http://opensource.org/licenses/MIT",
      },
    },
  },
  apis: ["./docs/**/*.yaml"],
};

export { swaggerOptions };
