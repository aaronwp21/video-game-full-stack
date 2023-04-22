module.exports = (server) => {
  process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception: ${err.message}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.log(
      'Unhandled rejection at ',
      promise,
      `reason: ${reason.message}`,
    );
    process.exit(1);
  });

  process.on('exit', (code) => {
    console.log(`Process exited with code: ${code}`);
  });

  process.on('SIGINT', (signal) => {
    console.log(`Process ${process.pid} has been interrupted`);
    process.exit(0);
  });

  process.on('SIGTERM', (_) => {
    console.log(`Process ${process.pid} received a SIGTERM signal`);
    server.close(() => {
      process.exit(0);
    });

    setTimeout(() => {
      process.exit(0);
    }, 1000).unref();
  });
};
