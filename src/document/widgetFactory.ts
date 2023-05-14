import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { ABCWidgetFactory, DocumentRegistry } from '@jupyterlab/docregistry';
import { MarpDocWidget } from '../widget/marpDocumentWidget';
import { MarpViewer } from '../widget/marpviewer';

export class MarpDocWidgetFactory extends ABCWidgetFactory<MarpDocWidget> {
  constructor(options: MarpDocWidgetFactory.IOptions) {
    super(options);
  }

  /**
   * Create a new widget given a context.
   *
   * @param context Contains the information of the file
   * @returns The widget
   */
  protected createNewWidget(context: DocumentRegistry.Context): MarpDocWidget {
    const content = new MarpViewer({ context });
    return new MarpDocWidget({ context, content });
  }
}

export namespace MarpDocWidgetFactory {
  export interface IOptions extends DocumentRegistry.IWidgetFactoryOptions {
    rendermime?: IRenderMimeRegistry;
  }
}
