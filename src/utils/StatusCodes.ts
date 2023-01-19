const BAD_REQUEST = { code: 400, status: "Bad Request" };
const UNAUTHORIZED = {
    code: 401,
    status: "Unauthorized",
};
const FORBIDDEN = { code: 403, status: "Forbidden" };
const NOT_FOUND = { code: 404, status: "Not Found" };
const REQUEST_TIMEOUT = { code: 408, status: "Request Time-out" };
const CONFLICT = { code: 409, status: "Conflict" };
const UNPROCESSABLE_ENTITY = {
    code: 422,
    status: "Unprocessable Entity",
};
const INTERNAL_SERVER_ERROR = {
    code: 500,
    status: "Internal Server Error",
};
const NOT_IMPLEMENTED = { code: 501, status: "Not Implemented" };
const BAD_GATEWAY = { code: 502, status: "Bad Gateway" };
const SERVICE_UNAVAILABLE = { code: 503, status: "Service Unavailable" };
const GATEWAY_TIMEOUT = { code: 504, status: "Gateway Time-out" };

export {
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    REQUEST_TIMEOUT,
    CONFLICT,
    UNPROCESSABLE_ENTITY,
    INTERNAL_SERVER_ERROR,
    NOT_IMPLEMENTED,
    BAD_GATEWAY,
    SERVICE_UNAVAILABLE,
    GATEWAY_TIMEOUT,
}