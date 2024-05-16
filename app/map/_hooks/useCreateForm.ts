import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';

import { Errors } from '@/types/Errors';
import createPost from '@apis/post/createPost';
import { posts } from '@queries/usePostQueries';
import { useMapStore } from '@stores/useMapStore';

export interface ContentField {
  title: string;
  content: string;
  lat: number;
  lng: number;
  city: string;
  country: string;
  cityLat: number;
  cityLng: number;
  actualLat: number;
  actualLng: number;
  category: string;
  subcategory: string;
  address: string;
  image: File[];
}


export default function useCreateForm(toggleModal: () => void, formatArray: () => string) {
  const { currentPosition } = useMapStore();

// 수정된 onSubmit 함수
type LatLngLiteralOrNull = google.maps.LatLngLiteral | null;


export default function useCreateForm(toggleModal: () => void) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContentField>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPosition, setCurrentPosition] = useState<LatLngLiteralOrNull>({ lat: 0, lng: 0 });

  const queryClient = useQueryClient();
  const mapState = useMapStore((state) => state);
  const { lastSearchCity } = mapState;
  const formattedCategories = formatArray();
  const [category, subcategory] = formattedCategories.split(':');

  console.log('currentPosition', currentPosition);

  function cancelForm() {
    reset();
    toggleModal();
  }

  async function onSubmit(formData: ContentField) {
    console.log(formData);

    formData = {
      ...formData,
      cityLat: lastSearchCity?.location?.lat ?? 0,
      cityLng: lastSearchCity?.location?.lng ?? 0,
      city: lastSearchCity?.city ?? '',
      country: lastSearchCity?.country ?? '',
      actualLat: currentPosition?.lat ?? 0,
      actualLng: currentPosition?.lng ?? 0,
      lat: lastSearchCity?.location?.lat ?? 0,
      lng: lastSearchCity?.location?.lng ?? 0,
      category: category ?? '',
      subcategory: subcategory ?? '',
    };

    // const formattedCategories = formatArray();
    // formData.category = formattedCategories;

    try {
      const formDataToSend = new FormData();

      if (formData.image) {
        for (let i = 0; i < formData.image.length; i++) {
          formDataToSend.append('file', formData.image[i]);
        }
      }

      formDataToSend.append('data', new Blob([JSON.stringify(formData)]));

      await createPost(formDataToSend);
      // 임시: 만들어졌을 시 피드 업데이트
      queryClient.invalidateQueries({ queryKey: posts.feedList().queryKey });
      console.log('Post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
    }

    toggleModal();
  }

  return { register, setValue, handleSubmit, onSubmit, cancelForm, errors: errors as Errors };
}
