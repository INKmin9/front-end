'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import getAccessToken from '@apis/oauth/getAccessToken';
import { useTokenStore } from '@stores/useTokenStore';

export default function LoadingSignin({ params }: { params: { provider: string } }) {
  const router = useRouter();
  // const code = new URL(window.location.href).searchParams.get('code');
  const code = typeof window !== 'undefined' ? new URL(window.location.href).searchParams.get('code') : null;

  useEffect(() => {
    async function fetchData() {
      const { data } = await getAccessToken(params.provider, code);
      const { accessToken, refreshToken } = data;

      document.cookie = `accessToken=${accessToken}; path=/`;
      document.cookie = `refreshToken=${refreshToken}; path=/`;

      useTokenStore.setState({ accessToken, refreshToken });

      // 토큰 저장 후 로그인 페이지로 이동
      router.push('/signin');
    }

    fetchData();
  }, [code, params.provider, router]);

  return <h1>{`This is OAUTH - ${params.provider} test page`}</h1>;
}
