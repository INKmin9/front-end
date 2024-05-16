import { PropsWithChildren, useState } from 'react';

import classNames from 'classnames/bind';

import { CategoryNameMapper } from '@/app/map/_components/Map/Filter';
import AtomIcon from '@icons/atom-02.svg?component';
import ChevronRightIcon from '@icons/chevron-right.svg?component';
import MagicWandIcon from '@icons/magic-wand-02-2.svg?component';
import SignalIcon from '@icons/signal-02-2.svg?component';
import ThumbsDownIcon from '@icons/thumbs-down-orange.svg?component';
import ThumbsUpIcon from '@icons/thumbs-up-red.svg?component';

import styles from './FilterCategoryButton.module.scss';

const cx = classNames.bind(styles);

export type Category = 'RECOMMENDED' | 'NOT_RECOMMENDED' | 'QUESTION' | 'WARNING' | 'HELP';

export const CATEGORY_NAME_MAPPER: CategoryNameMapper = {
  RECOMMENDED: '추천',
  NOT_RECOMMENDED: '비추천',
  QUESTION: '질문있어요',
  WARNING: '경고',
  HELP: '도와주세요',
};

function SelectedIcon(category: Category) {
  const iconClass = cx('svg', category);
  switch (category) {
    case 'RECOMMENDED':
      return <ThumbsUpIcon className={iconClass} />;
    case 'NOT_RECOMMENDED':
      return <ThumbsDownIcon className={iconClass} />;
    case 'QUESTION':
      return <AtomIcon className={iconClass} />;
    case 'WARNING':
      return <SignalIcon className={iconClass} />;
    case 'HELP':
      return <MagicWandIcon className={iconClass} />;
    default:
      return <ThumbsUpIcon className={iconClass} />;
  }
}

export interface FilterCategoryButtonProps {
  category: Category;
  handleFilterStatus: (category: Category) => void;
}

export default function FilterCategoryButton({
  category = 'RECOMMENDED',
  handleFilterStatus,
}: PropsWithChildren<FilterCategoryButtonProps>) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClickCategory = (category: Category) => {
    setIsClicked(!isClicked);
    handleFilterStatus(category);
  };

  return (
    // eslint-disable-next-line
    <div className={cx('button', category, isClicked && 'clicked')} onClick={() => handleClickCategory(category)}>
      {SelectedIcon(category)}
      <span>{CATEGORY_NAME_MAPPER[category]}</span>
      <ChevronRightIcon className={cx('arrow', `category`)} />
    </div>
  );
}
