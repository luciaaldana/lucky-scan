/* eslint-disable no-unused-vars */
export type TLotteryTicket = {
  image: string;
  numbers: number[];
};

export type TLotteryResultsProps = {
  numbers: number[];
  data: {
    [key: string]: number[];
  };
};

export type TLotteryHits = {
  [name: string]: number;
};

export interface ICamera {
  lotteryTicket: TLotteryTicket;
  setLotteryTicket: React.Dispatch<React.SetStateAction<TLotteryTicket>>;
}

export interface IResultsCard {
  numbers: number[];
  name: string;
  lotteryHits: number;
  dataWithPozoExtra: {
    [key: string]: number[];
  };
}

export interface UseProcessPhotoResult {
  processPhoto: (uri: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export enum ERenderState {
  Loading = 'loading',
  Error = 'error',
  Success = 'success',
}

export interface ITransformedData {
  [key: string]: number[];
}

export interface IServerResponse {
  tables: [string][][];
}
