import { Button } from '../button/button';

function DeleteCityModal({
  city,
  onConfirm,
  onCancel,
}: {
  city: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className='min-h-18 flex flex-col items-center justify-between m-2 bg-white dark:bg-zinc-900 dark:text-zinc-50'>
      <p>Are you sure you want to delete {city}?</p>
      <div className='w-full flex justify-around'>
        <Button label='Delete' isRounded onClick={() => onConfirm()} />
        <Button
          label='Cancel'
          mode='danger'
          isRounded
          isActive
          onClick={() => onCancel()}
        />
      </div>
    </div>
  );
}

export { DeleteCityModal };
