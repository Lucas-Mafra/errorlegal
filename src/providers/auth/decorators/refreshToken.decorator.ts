import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RefreshToken = createParamDecorator(
  (_: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.headers.refresh_token as string;
    console.log(`Refreshing token: ${refreshToken}`);
    return refreshToken;
  },
);
