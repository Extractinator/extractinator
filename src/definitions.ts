export type NotebookName = string;
export type NotebookNames = NotebookName[];

export enum Status {
  active = 'a',
  complete = 'c',
  pushed = 'p',
  paused = 'u',
  arrow = 'arrow',
  number = 'number',
}

export type Note = {
  text: string;
  status: Status;
  num?: number;
};

export type Notebook = Record<
  string,
  | {
      notes: Note[];
    }
  | undefined
>;
