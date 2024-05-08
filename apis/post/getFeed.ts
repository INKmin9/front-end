import instance from '@apis/axios';

export interface GetFeedProps {
  country: string;
  city: string;
  sortBy: string;
  page: number;
  size: number;
  categories: string;
  startDate: string;
  endDate: string;
  hasImage: boolean;
  hasLocation: boolean;
  minLikes: number;
  keyword: string;
}

export default async function getFeed(body: GetFeedProps) {
  const { data, status } = await instance.get('/post/feed', {
    params: body,
  });

  return { data, status };
}
