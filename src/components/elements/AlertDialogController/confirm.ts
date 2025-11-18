import { ClientIdGenerator } from "@utils/ClientIdGenerator";
import { Container, useValue } from "react-containerized-state";
import type { AlertDialogProps } from "./components/index.internal.ts";

type State = Omit<
  AlertDialogProps,
  "onCloseAutoFocus" | "onEscapeKeyDown" | "onOpenAutoFocus" | "ref"
>;

const idGenerator = new ClientIdGenerator("BQX_CLIENT_ALERT_DIALOG_");

class AlertDialogManager {
  private _id: string = idGenerator.generateId();
  private _state: Container<State | null>;

  constructor(state: Container<State | null>) {
    this._state = state;
  }

  public async dismiss(): Promise<void> {
    const prevState = this._state.getValue();

    if (!prevState) return;

    return this._state.setValue(null);
  }

  public async renewAndOpen(props: Omit<State, "open" | "id">): Promise<void> {
    const state = this._state.getValue();

    if (state) await this.dismiss();

    return this._state.setValue({
      ...props,
      open: true,
      id: this._id,
    });
  }
}

const state = new Container<State | null>(null);
const manager = new AlertDialogManager(state);

export const useConfirmState = (): State | null => useValue(state);

export const requestConfirm = (
  props: Omit<State, "open" | "id">,
): Promise<void> => {
  return manager.renewAndOpen(props);
};

export const dismissConfirm = (): Promise<void> => {
  return manager.dismiss();
};
