export const ExceptionConstants = {
    MISSING_PARAMETERS: 1001,
    ILLEGAL_PARAMETERS: 1002,
    USER_NOT_FOUND: 2001,
    WRONG_PASSWORD: 2002,
    CONTENT_NOT_FOUND: 2003,
    IS_NOT_PUBLISHED: 2004,
    TAG_NOT_FOUND: 2005,
    TAG_IN_USE: 2006,
    TAG_NAME_ALREADY_EXISTS: 2007,
} as const;

export type ExceptionCode = typeof ExceptionConstants[keyof typeof ExceptionConstants];