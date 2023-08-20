export function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = (request.headers as any).authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}
