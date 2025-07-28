const fallbackCopy = (value: string): void => {
  const tempTextArea = document.createElement("textarea");

  tempTextArea.value = value;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
};

export const copyToClipboard = async (value: string): Promise<void> => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
    } else {
      throw new Error("writeText not supported");
    }
  } catch {
    fallbackCopy(value);
  }
};
