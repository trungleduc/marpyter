import { DocumentRegistry } from '@jupyterlab/docregistry';
import { Contents } from '@jupyterlab/services';

import { MarpDocModel } from './docModel';

export class MarpDocModelFactory
  implements DocumentRegistry.IModelFactory<MarpDocModel>
{
  collaborative = false;
  /**
   * The name of the model.
   *
   * @returns The name
   */
  get name(): string {
    return 'marpdoc-model';
  }

  /**
   * The content type of the file.
   *
   * @returns The content type
   */
  get contentType(): Contents.ContentType {
    return 'md';
  }

  /**
   * The format of the file.
   *
   * @returns the file format
   */
  get fileFormat(): Contents.FileFormat {
    return 'text';
  }

  /**
   * Get whether the model factory has been disposed.
   *
   * @returns disposed status
   */

  get isDisposed(): boolean {
    return this._disposed;
  }

  /**
   * Dispose the model factory.
   */
  dispose(): void {
    this._disposed = true;
  }

  /**
   * Get the preferred language given the path on the file.
   *
   * @param path path of the file represented by this document model
   * @returns The preferred language
   */
  preferredLanguage(path: string): string {
    return '';
  }

  createNew(options: any): MarpDocModel {
    const model = new MarpDocModel(options);
    return model;
  }

  private _disposed = false;
}
