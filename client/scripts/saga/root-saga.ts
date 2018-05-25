import winnerSaga from '../saga/winner-saga';
import moveSaga from '../saga/move-saga';

export default function* rootSaga(): IterableIterator<any> {
  yield [
    winnerSaga.watch(),
    moveSaga.watch()
  ];
}
