import createHttpError from "http-errors";

export const validate = (schemas) => (req, res, next) => {
  req.valid = req.valid ?? {};

  for (const source of ["params", "query", "body"]) {
    const schema = schemas[source];
    if (!schema) continue;

    const result = schema.safeParse(req[source] ?? {});

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join(".") || source,
        message: issue.message,
      }));

      return next(createHttpError(400, errors[0].message, { errors }));
    }

    req.valid[source] = result.data;
  }

  next();
};
