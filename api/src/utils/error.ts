export class CustomError extends Error {
  constructor(name: string, message: string) {
    super(message); // Establece el mensaje
    this.name = name; // Establece el nombre del error

    // Para que funcione bien con instanceof y stack trace
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}


export class ApiError extends Error {
  statusCode: number;

  constructor(name: string, message: string, statusCode: number = 500) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
