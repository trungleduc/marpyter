import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { WidgetTracker } from '@jupyterlab/apputils';
import { PathExt } from '@jupyterlab/coreutils';

import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { ITranslator } from '@jupyterlab/translation';
import { IMarpViewerTracker } from './token';
import { MarpViewer } from './widget/marpviewer';
import { MarpDocWidgetFactory } from './document/widgetFactory';
import { MarpDocModelFactory } from './document/modelFactory';
import { MarpDocWidget } from './widget/marpDocumentWidget';

const FACTORY = 'Marp Preview';
/**
 * Initialization data for the marpyter extension.
 */
const plugin: JupyterFrontEndPlugin<IMarpViewerTracker> = {
  id: 'marpyter:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  provides: IMarpViewerTracker,
  requires: [IRenderMimeRegistry, ITranslator],
  optional: [ILayoutRestorer],
  activate: (
    app: JupyterFrontEnd,
    rendermime: IRenderMimeRegistry,
    translator: ITranslator
  ): IMarpViewerTracker => {
    console.log('JupyterLab extension marpyter is activated!');
    const trans = translator.load('jupyterlab');
    const { docRegistry } = app;
    // Add the markdown renderer factory.

    const namespace = 'marpyter-widget';
    const tracker = new WidgetTracker<MarpDocWidget>({
      namespace
    });

    const factory = new MarpDocWidgetFactory({
      name: 'Marp Doc',
      modelName: 'marpdoc-model',
      fileTypes: ['md'],
      rendermime
    });
    factory.widgetCreated.connect((sender, widget) => {
      // Notify the widget tracker if restore data needs to update.
      widget.context.pathChanged.connect(() => {
        void tracker.save(widget);
      });
      void tracker.add(widget);
    });
    docRegistry.addWidgetFactory(factory);

    const modelFactory = new MarpDocModelFactory();
    app.docRegistry.addModelFactory(modelFactory);

    app.docRegistry.addFileType({
      name: 'md',
      displayName: 'MD',
      mimeTypes: ['text/plain'],
      extensions: ['.md', '.MD'],
      fileFormat: 'text',
      contentType: 'file'
    });

    return tracker;
  }
};

export default plugin;
