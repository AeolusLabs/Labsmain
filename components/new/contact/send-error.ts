/** An error whose message is meant for the visitor. Anything else (a network failure, a parse error) gets a plain default instead of raw technical text. */
export class SendError extends Error {}
