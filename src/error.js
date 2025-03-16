export const ERROR_CODES = {
  NOT_FOUND: "NOT_FOUND",
  BAD_REQUEST: "BAD_REQUEST",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
};

/**
 * @type {Record<string, string>}
 */
export const errorMessages = {
  [ERROR_CODES.NOT_FOUND]: "Employee not found",
  [ERROR_CODES.BAD_REQUEST]: "Bad request",
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: "Internal server error",
};
