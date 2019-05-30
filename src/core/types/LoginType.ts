
export const LOGIN_TYPE_EMAIL = 'EMAIL';
export const LOGIN_TYPE_PHONE_NO = 'PHONE_NO';
export const LOGIN_TYPE_FACEBOOK = 'FACEBOOK';
export const LOGIN_TYPE_GOOGLE = 'GOOGLE';
export type LoginType = typeof LOGIN_TYPE_EMAIL
    | typeof LOGIN_TYPE_PHONE_NO
    | typeof LOGIN_TYPE_FACEBOOK
    | typeof LOGIN_TYPE_GOOGLE;
