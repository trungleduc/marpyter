import { createMutex, YDocument } from '@jupyter/ydoc';

import { IMarpDocSharedModel, IMarpDocSharedModelChange } from '../token';

export const globalMutex = createMutex();

export class MarpDocSharedModel
  extends YDocument<IMarpDocSharedModelChange>
  implements IMarpDocSharedModel
{
  constructor() {
    super();
  }

  static create(): IMarpDocSharedModel {
    return new MarpDocSharedModel();
  }

  dispose(): void {
    super.dispose();
  }

  /**
   * Document version
   */
  readonly version: string = '1.0.0';
}
