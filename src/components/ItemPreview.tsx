import { useState } from "react";
import { IRedacao } from "../types";
import { IconFileDescription, IconPhoto } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const ItemPreview: React.FC<{ item: IRedacao }> = ({ item }) => {
  const [imgError, setImgError] = useState(false);
  const fileType = item.urls[0].url.substring(
    item.urls[0].url.lastIndexOf(".")
  );

  const handleImgError = () => {
    setImgError(true);
  };
  return (
    <Link
      to={`/redacoes/${item.id}`}
      className="min-w-[360px] rounded-md overflow-hidden cursor-pointer shadow-md group border-2 border-indigo-800 border-opacity-0 transition-all duration-75 hover:border-opacity-60">
      <div className="h-[180px] relative text-indigo-900">
        <div className="absolute w-full h-full bg-black bg-opacity-0 z-10 group-hover:bg-opacity-20 transition-all duration-75" />
        {fileType === ".pdf" ? (
          <div className="w-full h-full flex justify-center items-center">
            <IconFileDescription size={48} />
          </div>
        ) : imgError ? (
          <div className="w-full h-full flex justify-center items-center">
            <IconPhoto size={48} />
          </div>
        ) : (
          <img
            src={item.urls[item.urls.length - 1].url}
            className="object-cover min-w-full min-h-full max-h-full max-w-full"
            onError={() => handleImgError()}></img>
        )}
      </div>
      <div className="flex px-2 py-3 gap-1 flex-col">
        <span className="font-medium text-lg">Redação #{item.numero}</span>
        <span className="font-light text-sm">
          Criado em: {new Date(item.created_at).toLocaleDateString("pt-BR")}
        </span>
      </div>
    </Link>
  );
};
