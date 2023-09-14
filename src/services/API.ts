import axios from "axios";
import { IRedacao, IRedacaoFromUser } from "../types";

//Fetch a single 'Redação'
export async function getRedacao(redacao_id: string, access_token: string) {
  return axios.get("https://desafio.pontue.com.br/redacao/" + redacao_id, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });
}

//Fetch every "Redação" from a specific user
export async function getRedacoesFromUser(
  user_id: string,
  access_token: string
) {
  return axios.get("https://desafio.pontue.com.br/index/aluno/" + user_id, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });
}

//Fetch every "Redação" from a specific user and then fetch each "Redação" individually for further detail
export async function getDetailedRedacoesFromUser(
  user_id: string,
  access_token: string
) {
  try {
    const response = await axios.get(
      "https://desafio.pontue.com.br/index/aluno/" + user_id,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    if (response.status === 200) {
      const data: IRedacaoFromUser[] = response.data.data;
      const promiseArray = data.map(async (item) => {
        const result = await getRedacao(item.id, access_token);
        if (result.status === 200) {
          return result.data.data as IRedacao;
        } else {
          throw new Error(result.statusText);
        }
      });
      return Promise.all(promiseArray);
    } else {
      throw new Error(response.statusText);
    }
  } catch (err) {
    console.error("There was an error", err);
    throw err;
  }
}

//Paginated Version
export async function getDetailedRedacoesFromUserPaginated(
  user_id: string,
  access_token: string,
  page: number
) {
  const itemsPerPage = 8;
  try {
    const response = await axios.get(
      "https://desafio.pontue.com.br/index/aluno/" + user_id,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    if (response.status === 200) {
      const data: IRedacaoFromUser[] = response.data.data;
      const paginatedData = data.slice(
        page * itemsPerPage - itemsPerPage,
        page * itemsPerPage - 1
      );
      const promiseArray = paginatedData.map(async (item) => {
        const result = await getRedacao(item.id, access_token);
        if (result.status === 200) {
          return result.data.data as IRedacao;
        } else {
          throw new Error(result.statusText);
        }
      });
      return {
        totalPages: Math.floor(data.length / 8),
        data: await Promise.all(promiseArray),
      };
    } else {
      throw new Error(response.statusText);
    }
  } catch (err) {
    console.error("There was an error", err);
    throw err;
  }
}

// Function to handle file upload
export function uploadFile(file: File, access_token: string) {
  const formData = new FormData();
  formData.append("file[]", file, "[PROXY]");
  return axios.post(
    "https://desafio.pontue.com.br/alunos/redacao/create",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + access_token,
      },
    }
  );
}
