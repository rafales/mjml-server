const fastify = require("fastify");
const mjml = require("mjml");

const app = fastify({ logger: true });

const renderSchema = {
  body: {
    type: "object",
    properties: {
      markup: { type: "string" },
    },
    required: ["markup"],
  },
  response: {
    200: {
      type: "object",
      required: ["html"],
      properties: {
        html: { type: "string" },
      },
    },
  },
};

app.get('/', async (request, reply) => {
  return '';
})

app.post("/render", { schema: renderSchema }, async (request, reply) => {
  const { body } = request;
  let html;
  try {
    const result = mjml(body.markup, { validationLevel: "strict" });
    html = result.html;
  } catch (err) {
    if (err.errors?.length > 0) {
      // skip "formattedMessage" field
      const errors = err.errors.map(({ formattedMessage, ...rest }) => rest);
      reply.code(400).send(errors);
      return;
    }
    throw err;
  }
  return { html };
});

const start = async () => {
  const { HOST, PORT } = process.env;
  const shutdown = async () => {
    await app.close();
    process.exit(0);
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  try {
    await app.listen({
      host: HOST || 'localhost',
      port: PORT || 3000,
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
