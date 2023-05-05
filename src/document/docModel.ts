import { IChangedArgs } from '@jupyterlab/coreutils';
import { ISignal, Signal } from '@lumino/signaling';
import { PartialJSONObject } from '@lumino/coreutils';
import { IMarpDocModel, IMarpDocSharedModel } from '../token';
import { MarpDocSharedModel } from './sharedModel';

interface IOptions {
  sharedModel?: IMarpDocSharedModel;
  languagePreference?: string;
}
export class MarpDocModel implements IMarpDocModel {
  constructor(options: IOptions) {
    const { sharedModel } = options;

    if (sharedModel) {
      this._sharedModel = sharedModel;
    } else {
      this._sharedModel = MarpDocSharedModel.create();
    }
  }

  readonly collaborative = false;

  get sharedModel(): IMarpDocSharedModel {
    return this._sharedModel;
  }

  get isDisposed(): boolean {
    return this._isDisposed;
  }

  get contentChanged(): ISignal<this, void> {
    return this._contentChanged;
  }

  get stateChanged(): ISignal<this, IChangedArgs<any, any, string>> {
    return this._stateChanged;
  }

  get dirty(): boolean {
    return this._dirty;
  }
  set dirty(value: boolean) {
    this._dirty = value;
  }

  get readOnly(): boolean {
    return this._readOnly;
  }
  set readOnly(value: boolean) {
    this._readOnly = value;
  }

  get disposed(): ISignal<MarpDocModel, void> {
    return this._disposed;
  }

  dispose(): void {
    if (this._isDisposed) {
      return;
    }
    this._isDisposed = true;
    this._sharedModel.dispose();
    this._disposed.emit();
    Signal.clearData(this);
  }

  toString(): string {
    return this._content;
  }

  fromString(data: string): void {
    console.log('setting content', data);

    this._content = data;
    this._contentChanged.emit();
  }

  toJSON(): PartialJSONObject {
    return JSON.parse(this.toString());
  }

  fromJSON(data: PartialJSONObject): void {
    //
  }

  initialize(): void {
    //
  }

  readonly defaultKernelName: string = '';
  readonly defaultKernelLanguage: string = '';

  private _dirty = false;
  private _readOnly = false;
  private _isDisposed = false;
  private _content = '';
  private _sharedModel: IMarpDocSharedModel;

  private _disposed = new Signal<this, void>(this);
  private _contentChanged = new Signal<this, void>(this);
  private _stateChanged = new Signal<this, IChangedArgs<any>>(this);
}
