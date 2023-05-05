import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { ABCWidgetFactory, DocumentRegistry } from '@jupyterlab/docregistry';

import { MarpDocModel } from './docModel';
import { MarpDocWidget } from '../widget/marpDocumentWidget';
import { Widget } from '@lumino/widgets';
import { MarpViewer } from '../widget/marpviewer';

export class MarpDocWidgetFactory extends ABCWidgetFactory<
  MarpDocWidget,
  MarpDocModel
> {
  constructor(options: MarpDocWidgetFactory.IOptions) {
    super(options);
  }

  /**
   * Create a new widget given a context.
   *
   * @param context Contains the information of the file
   * @returns The widget
   */
  protected createNewWidget(
    context: DocumentRegistry.IContext<MarpDocModel>
  ): MarpDocWidget {
    const content = new MarpViewer({ model: context.model });
    return new MarpDocWidget({ context, content });
  }
}

export namespace MarpDocWidgetFactory {
  export interface IOptions extends DocumentRegistry.IWidgetFactoryOptions {
    rendermime?: IRenderMimeRegistry;
  }
}
