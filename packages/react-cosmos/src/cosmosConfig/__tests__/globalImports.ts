// Import mocks first
import '../../testHelpers/mockEsmResolve.js';

import path from 'path';
import { getCwdPath } from '../../testHelpers/cwd.js';
import { createCosmosConfig } from '../createCosmosConfig.js';

it('returns default empty globalImports', () => {
  const { globalImports } = createCosmosConfig(process.cwd());
  expect(globalImports).toEqual([]);
});

it('returns resolved (explicit) relative globalImports', () => {
  const { globalImports } = createCosmosConfig(process.cwd(), {
    globalImports: ['./src1'],
  });
  expect(globalImports).toEqual([getCwdPath('./src1')]);
});

it('returns resolved (implicit) relative globalImports', () => {
  const { globalImports } = createCosmosConfig(process.cwd(), {
    globalImports: ['src1'],
  });
  expect(globalImports).toEqual([getCwdPath('src1')]);
});

it('returns absolute globalImports', () => {
  const absImport = path.join(__dirname, '/src1');
  const { globalImports } = createCosmosConfig(process.cwd(), {
    globalImports: [absImport],
  });
  expect(globalImports).toEqual([absImport]);
});

it('returns resolved module globalImports', () => {
  const { globalImports } = createCosmosConfig(process.cwd(), {
    globalImports: ['react'],
  });
  expect(globalImports).toEqual([require.resolve('react')]);
});
