export type MediaType = 'print' | 'screen';
export type TestColumn = { name: string; index: string | number; value: string, visible?: boolean };
export type TestCheckboxItem = { value: string; index: number; shouldBeChecked: boolean };
export type TestButton = { label: string; icon: string; type: string; link: string };
export type TestFileNameInput = { label: string, type: string, required: boolean, value: string }
export type TestFileUpload = {
  label: string,
  shouldContainFile: boolean,
  type: string,
  icon: string,
  required: boolean,
  value: string
  fileTypes: string[],
  mimeTypes: string[],
  inputId?: string;
  signedUrl?: string;
}
export type TestSaveButton = { label: string; type: string; };
export type TestEntityDetails = {
  id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updated: string;
};
