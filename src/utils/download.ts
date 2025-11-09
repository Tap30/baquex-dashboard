import { utils, writeFile } from "xlsx";

export const saveExcelFile = <T>(fileData: T[], fileName: string) => {
  const workbook = utils.book_new();
  const worksheet = utils.json_to_sheet(fileData);

  utils.book_append_sheet(workbook, worksheet, "Sheet1");

  writeFile(workbook, fileName);
};

export const saveFileToDevice = (blob: Blob, fileName: string): void => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.style.display = "none";
  a.href = url;
  a.download = fileName;

  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const uriToBlob = async (uri: string): Promise<Blob> => {
  const response = await fetch(uri);
  const blob = await response.blob();

  return blob;
};

export const downloadFileFromUri = async (
  uri: string,
  fileName?: string,
): Promise<void> => {
  return saveFileToDevice(
    await uriToBlob(uri),
    fileName || uri.substring(uri.lastIndexOf("/") + 1),
  );
};
