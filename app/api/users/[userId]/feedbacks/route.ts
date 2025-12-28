import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/_utils/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: 'UserId is required' },
        { status: 400 }
      );
    }

    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const perPage = Number(request.nextUrl.searchParams.get('perPage') ?? 10);
    const sortBy = request.nextUrl.searchParams.get('sortBy') ?? undefined;
    const sortOrder =
      request.nextUrl.searchParams.get('sortOrder') ?? undefined;

    const res = await api.get(`/users/${userId}/feedbacks`, {
      params: {
        page,
        perPage,
        ...(sortBy ? { sortBy } : {}),
        ...(sortOrder ? { sortOrder } : {}),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
