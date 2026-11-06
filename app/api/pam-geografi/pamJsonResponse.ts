export async function pamJsonResponse(response: Response): Promise<Response> {
  return Response.json(await response.json(), { status: response.status });
}
