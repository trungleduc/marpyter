import { IWidgetTracker } from '@jupyterlab/apputils';
import { MapChange, StateChange, YDocument } from '@jupyter/ydoc';
import { Token } from '@lumino/coreutils';
import { MarpViewer } from './widget/marpviewer';
import { DocumentRegistry, IDocumentWidget } from '@jupyterlab/docregistry';
import { ISignal } from '@lumino/signaling';
import { Widget } from '@lumino/widgets';
import { MarpDocWidget } from './widget/marpDocumentWidget';
export const IMarpViewerTracker = new Token<IMarpViewerTracker>(
  'marpyter:IMarpViewerTracker',
  'A widget tracker for marpyter.'
);

export type IMarpViewerTracker = IWidgetTracker<MarpDocWidget>;

export interface IMarpDocModel extends DocumentRegistry.IModel {
  isDisposed: boolean;
  disposed: ISignal<any, void>;
}

export type IMarpDocWidget = IDocumentWidget<Widget, IMarpDocModel>;

export interface IMarpDocSharedModelChange {
  contentChange?: MapChange;
  stateChange?: StateChange<any>[];
}

export interface IMarpDocSharedModel
  extends YDocument<IMarpDocSharedModelChange> {}
