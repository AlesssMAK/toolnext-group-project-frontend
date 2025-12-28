import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/_utils/utils';

export async function GET(request: NextRequest) {
  try {
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const limit = Number(request.nextUrl.searchParams.get('limit') ?? 10);
    const search = request.nextUrl.searchParams.get('search') ?? undefined;
    const categories =
      request.nextUrl.searchParams.get('categories') ?? undefined;
    const minPrice = request.nextUrl.searchParams.get('minPrice')
      ? Number(request.nextUrl.searchParams.get('minPrice'))
      : undefined;
    const maxPrice = request.nextUrl.searchParams.get('maxPrice')
      ? Number(request.nextUrl.searchParams.get('maxPrice'))
      : undefined;

    const sort = request.nextUrl.searchParams.get('sort') ?? undefined;

    const res = await api.get('/tools', {
      params: {
        page,
        limit,
        ...(search ? { search } : {}),
        ...(categories ? { categories } : {}),
        ...(Number.isFinite(minPrice as number) ? { minPrice } : {}),
        ...(Number.isFinite(maxPrice as number) ? { maxPrice } : {}),
        ...(sort ? { sort } : {}),
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

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const formData = await request.formData();

    const res = await api.post('/tools', formData, {
      headers: {
        Cookie: cookieStore.toString(),
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

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
