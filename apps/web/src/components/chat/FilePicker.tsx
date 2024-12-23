import { Button } from "@nextui-org/react";
import { Paperclip } from "lucide-react";
import { useRef, useState } from "react";
import { uploadFile } from "../../api/files";

interface FilePickerProps {
  onSelect: (content: string) => void;
  disabled?: boolean;
}

export const FilePicker = ({ onSelect, disabled = false }: FilePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const { fileName, fileUrl } = await uploadFile(file);
      // Using § as separator for file messages
      const messageContent = `§${fileName}§${fileUrl}`;
      onSelect(messageContent);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
      // Reset the input
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <div className="relative">
      <Button
        color="secondary"
        onPress={() => inputRef.current?.click()}
        className="rounded-full"
        isLoading={isUploading}
        isDisabled={disabled}
      >
        <Paperclip size={24} />
      </Button>
      <input
        type="file"
        ref={inputRef}
        className="absolute -top-10 left-0 opacity-0"
        onChange={handleFileSelect}
        disabled={isUploading || disabled}
      />
    </div>
  );
};