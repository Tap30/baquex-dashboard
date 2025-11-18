import { FileInput, type FileInputProps } from "@components/FileInput";
import { Flex, FlexItem } from "@components/Flex";
import { Icon } from "@components/Icon";
import { IconButton } from "@components/IconButton";
import { Progress } from "@components/Progress";
import { Text } from "@components/Text";
import { mdiDelete, mdiDownload, mdiFile } from "@mdi/js";
import { useRef } from "react";

export type FileUploaderStatus = "success" | "error" | "loading" | "idle";

export type FileUploaderProps = Omit<
  FileInputProps,
  "multiple" | "clearable" | "onChange" | "value" | "defaultValue" | "children"
> & {
  /**
   * Current value of the uploader (a file URL or empty string).
   */
  value: string;

  /**
   * Called when user selects a new file from the OS.
   */
  onFileSelect: (file: File) => void | Promise<void>;

  /**
   * Called when user clicks on the download button.
   */
  onDownload?: () => void | Promise<void>;

  /**
   * Called when user clears the file.
   */
  onClear?: () => void;
} & (
    | {
        /**
         * Current status of the uploader.
         */
        status: "success" | "error" | "idle";
      }
    | {
        /**
         * Current status of the uploader.
         */
        status: "loading";
        /**
         * Progress (0–100) or undefined (indeterminate).
         */
        progress?: number;
      }
  );

export const FileUploader: React.FC<FileUploaderProps> = props => {
  const {
    value: value,
    onFileSelect,
    onDownload,
    onClear,
    status = "idle",
    disabled = false,
    readOnly = false,
    hasError = false,
    ...fileInputProps
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    void onFileSelect?.(file);
  };

  const handleClear = () => {
    if (disabled || readOnly) return;
    onClear?.();
  };

  const renderSelectedFileRow = () => {
    if (!value) return null;

    return (
      <Flex alignItems="center">
        <FlexItem grow={1}>
          <Text variant="caption">{value}</Text>
        </FlexItem>
        {onDownload ? (
          <IconButton
            type="button"
            size="sm"
            variant="ghost"
            icon={<Icon data={mdiDownload} />}
            onClick={() => void onDownload()}
          />
        ) : null}

        {onClear ? (
          <IconButton
            type="button"
            size="sm"
            variant="ghost"
            icon={<Icon data={mdiDelete} />}
            color="negative"
            onClick={handleClear}
          />
        ) : null}
      </Flex>
    );
  };

  const renderStatus = () => {
    if (status === "loading") {
      const { progress } = props as Extract<
        FileUploaderProps,
        { status: "loading" }
      >;

      return <Progress value={progress ?? undefined} />;
    }

    return null;
  };

  return (
    <>
      <FileInput
        {...fileInputProps}
        ref={inputRef}
        onChange={handleFileChange}
        multiple={false}
        clearable={false}
        disabled={disabled}
        readOnly={readOnly}
        hasError={hasError || status === "error"}
        endSlot={<Icon data={mdiFile} />}
      />
      {renderSelectedFileRow()}
      {renderStatus()}
    </>
  );
};
