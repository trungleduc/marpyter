import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { WidgetTracker } from '@jupyterlab/apputils';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { ITranslator } from '@jupyterlab/translation';

import { MarpDocWidgetFactory } from './document/widgetFactory';
import { IMarpViewerTracker } from './token';
import { MarpDocWidget } from './widget/marpDocumentWidget';

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

    const namespace = 'marpyter-widget';
    const tracker = new WidgetTracker<MarpDocWidget>({
      namespace
    });

    const factory = new MarpDocWidgetFactory({
      name: 'Marp Doc',
      label: trans.__('Marp Preview'),
      fileTypes: ['markdown'],
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

    return tracker;
  }
};

export default plugin;
