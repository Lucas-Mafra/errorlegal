export abstract class ServiceError {
  abstract title: string;
  abstract message: string;
  abstract statusCode: number;
}
