import { shallowMount } from '@vue/test-utils';
import { Cypress } from 'local-cypress';

type MountType = typeof shallowMount;
declare global {
  let mount: MountType;
  let shallowMount: MountType;
  let shallowMountView: MountType;

  interface Window {
    Cypress: typeof Cypress;
  }
}
export {};
