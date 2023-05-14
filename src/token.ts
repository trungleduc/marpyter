import { IWidgetTracker } from '@jupyterlab/apputils';
import { IDocumentWidget } from '@jupyterlab/docregistry';
import { Token } from '@lumino/coreutils';
import { Widget } from '@lumino/widgets';

import { MarpDocWidget } from './widget/marpDocumentWidget';

export const IMarpViewerTracker = new Token<IMarpViewerTracker>(
  'marpyter:IMarpViewerTracker',
  'A widget tracker for marpyter.'
);

export type IMarpViewerTracker = IWidgetTracker<MarpDocWidget>;

export type IMarpDocWidget = IDocumentWidget<Widget>;
