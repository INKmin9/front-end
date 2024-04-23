import React from 'react';

import Image from 'next/image';

import useModalStore from '@stores/useModalStore';

import styles from '../../Modal/ReadPost/ReadPost.module.scss';
import Modal from '../../ModalCompound/Modal'; // 모달 컴포넌트 임포트

export default function ReadPost() {
  const mockImage = {
    title: '사람 살려요',
    content: '뒤에 듀크가 쫓아와요',
    imageList: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtklqiExudT8_ZGBlYXOE612HhAUrNru8cIft_vmORg&s',
      'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
    ],
  }; // useQuery로 데이터 받아옴

  const { toggleModal, isOpen } = useModalStore(); // 모달 토글 함수와 모달 열림 상태를 가져옴

  return (
    <>
      {isOpen && ( // 모달이 열려있을 때만 모달 컴포넌트를 렌더링
        <Modal
          isOpen={isOpen}
          header={<h2 className={styles.title}>{mockImage.title}</h2>}
          body={
            <>
              <button type='button' onClick={toggleModal} className={styles.button}>
                X
              </button>
              <p>{mockImage.content}</p>
              {mockImage.imageList.map((image) => (
                <Image key={image} src={image} alt='이미지' className={styles.image} />
              ))}
            </>
          }
        />
      )}
    </>
  );
}
