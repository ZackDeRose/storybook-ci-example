import { CiTestExecutorSchema } from './schema';
import executor from './executor';

const options: CiTestExecutorSchema = {};

describe('CiTest Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
