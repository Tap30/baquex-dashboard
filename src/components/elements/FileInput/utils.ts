export const arrayFromFileList = (fileList: FileList | null): File[] => {
  const files: File[] = [];

  if (!fileList) return files;

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList.item(i);

    if (file) files.push(file);
  }

  return files;
};
