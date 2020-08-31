module.exports = {
  PORT: 4000,
  mysqlConfig: {
    host: "localhost",
    user: "root",
    password: "Local@941019",
    database: "bohios-pro",
    dateStrings: true
  },
  MESSAGES: {
    INSERTED: "INSERTED",
    UPDATED: "UPDATED"
  },
  ERRORS: {
    PARAM_ERROR: "PARAM_ERROR",
    DB_ERROR: "DB_ERROR",
    NOT_FOUND: "NOT_FOUND"
  }
};
