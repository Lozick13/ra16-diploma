import { FC } from 'react';
import classes from './brokenrequest.module.css';

const BrokenRequest: FC<{ click: () => void }> = ({ click }) => {
  return (
    <>
      <div className={classes['broken-request']}>
        <button onClick={() => click()} className="btn btn-outline-primary">
          Повторить запрос
        </button>
      </div>
    </>
  );
};

export default BrokenRequest;
