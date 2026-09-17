export function notFound(req, res, _next) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, _req, res, _next) {
  console.error('[ERROR]', err);
  const prismaCode = err.code || err.errorCode;
  const databaseUnavailable = prismaCode === 'P1001'
    || prismaCode === 'P1017'
    || err.message?.includes("Can't reach database server");
  const status = databaseUnavailable ? 503 : (err.statusCode || 500);
  const message = databaseUnavailable
    ? 'Database unavailable. Start PostgreSQL and try again.'
    : (err.message || 'Internal server error');

  res.status(status).json({
    error: message,
  });
}