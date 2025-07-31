import axios from 'axios';
import { toast } from 'sonner';

interface shortenResponse {
  data: {
    id: string;
    slug: string;
    url: string;
    createdAt: string;
  };
  shortURL: string;
}

const baseURL = '/api';

export const shortener = async (
  url: string
): Promise<shortenResponse | null> => {
  try {
    const res = await axios.post<shortenResponse>(`${baseURL}/shorten`, {
      url,
    });
    console.log(res.data);
    toast.success('URL shortened successfully');
    return res.data;
  } catch (error) {
    console.error(error);
    toast.error('failed to shorten url');
    return null;
  }
};
