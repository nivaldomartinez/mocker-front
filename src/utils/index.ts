export const copy = async (textToCopy: string) => {
    try {
        await window.navigator.clipboard.writeText(textToCopy)
    } catch {
        throw new Error("Permissions denied!"); 
    }
}

export const errorStatusCodes = [
    { statusCode: 400, description: 'Bad Request' },
    { statusCode: 401, description: 'Unauthorized' },
    { statusCode: 402, description: 'Payment Required' },
    { statusCode: 403, description: 'Forbidden' },
    { statusCode: 404, description: 'Not Found' },
    { statusCode: 405, description: 'Method Not Allowed' },
    { statusCode: 406, description: 'Not Acceptable' },
    { statusCode: 407, description: 'Proxy Authentication Required' },
    { statusCode: 408, description: 'Request Timeout' },
    { statusCode: 409, description: 'Conflict' },
    { statusCode: 410, description: 'Gone' },
    { statusCode: 411, description: 'Length Required' },
    { statusCode: 412, description: 'Precondition Failed' },
    { statusCode: 413, description: 'Payload Too Large' },
    { statusCode: 414, description: 'URI Too Long' },
    { statusCode: 415, description: 'Unsupported Media Type' },
    { statusCode: 416, description: 'Range Not Satisfiable' },
    { statusCode: 417, description: 'Expectation Failed' },
    { statusCode: 418, description: "I'm a teapot" },
    { statusCode: 421, description: 'Misdirected Request' },
    { statusCode: 422, description: 'Unprocessable Entity' },
    { statusCode: 423, description: 'Locked' },
    { statusCode: 424, description: 'Failed Dependency' },
    { statusCode: 425, description: 'Too Early' },
    { statusCode: 426, description: 'Upgrade Required' },
    { statusCode: 428, description: 'Precondition Required' },
    { statusCode: 429, description: 'Too Many Requests' },
    { statusCode: 431, description: 'Request Header Fields Too Large' },
    { statusCode: 451, description: 'Unavailable For Legal Reasons' },
    { statusCode: 500, description: 'Internal Server Error' },
    { statusCode: 501, description: 'Not Implemented' },
    { statusCode: 502, description: 'Bad Gateway' },
    { statusCode: 503, description: 'Service Unavailable' },
    { statusCode: 504, description: 'Gateway Timeout' },
    { statusCode: 505, description: 'HTTP Version Not Supported' },
    { statusCode: 506, description: 'Variant Also Negotiates' },
    { statusCode: 507, description: 'Insufficient Storage' },
    { statusCode: 508, description: 'Loop Detected' },
    { statusCode: 510, description: 'Not Extended' },
    { statusCode: 511, description: 'Network Authentication Required' },
  ];  