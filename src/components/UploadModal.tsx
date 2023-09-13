import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { uploadFile } from "../services/API";
import { useAuth } from "../hooks/useAuth";

export const UploadModal: React.FC<{
  isOpen: boolean;
  closeModal: () => void;
}> = ({ isOpen, closeModal }) => {
  const auth = useAuth();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [sendingFile, setSendingFile] = useState(false);
  const [finishedUpload, setFinishedUpload] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);
    } else {
      setSelectedFile(undefined);
    }
  };

  const handleFileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Por favor selecione um arquivo");
      return;
    }

    if (
      selectedFile.type === "application/pdf" ||
      selectedFile.type.startsWith("image/")
    ) {
      if (auth && auth.credentials) {
        setSendingFile(true);
        uploadFile(selectedFile, auth.credentials.access_token)
          .then(() => {
            setSendingFile(false);
            setFinishedUpload(true);
          })
          .catch(() => {
            alert("Houve um erro no upload. Tente novamente.");
            setFinishedUpload(false);
            setSendingFile(false);
            setSelectedFile(undefined);
            closeModal();
          });
      } else {
        alert("Por favor selecione uma imagem ou arquivo PDF");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50 z-40"></div>
      <div className="absolute bg-white min-w-[400px] rounded shadow-lg z-50 p-4">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer disabled:bg-slate-200 disabled:cursor-not-allowed"
          onClick={() => {
            setFinishedUpload(false);
            setSendingFile(false);
            setSelectedFile(undefined);
            closeModal();
          }}
          disabled={sendingFile}>
          <IconX />
        </button>
        {!finishedUpload ? (
          <form className="flex flex-col gap-4" onSubmit={handleFileSubmit}>
            <h2 className="text-xl font-bold mb-4">Fazer Upload</h2>
            <input
              type="file"
              required
              accept=".pdf, image/*"
              onChange={handleFileChange}
            />
            {sendingFile && (
              <p className="animate-pulse font-medium">Fazendo upload...</p>
            )}
            <button
              type="submit"
              disabled={sendingFile}
              className="w-full rounded-md bg-indigo-600 text-white py-3 my-4 hover:bg-indigo-700 transition-colors duration-150 disabled:bg-slate-700 disabled:cursor-not-allowed">
              Fazer upload
            </button>
          </form>
        ) : (
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">Upload finalizado!</h2>
            <a
              href="/"
              className="w-fit mx-auto px-4 rounded-md bg-indigo-600 text-white py-3 my-4 hover:bg-indigo-700 transition-colors duration-150 disabled:bg-slate-700 disabled:cursor-not-allowed">
              Voltar
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
