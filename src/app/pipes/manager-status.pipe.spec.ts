import { ManagerStatusPipe } from './manager-status.pipe';

describe('ManagerStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new ManagerStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
