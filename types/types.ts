export type userType = {
  id: string;
  name: string;
  email: string;
  tel?: string;
  post?: string;
  prefecture?: string;
  city?: string;
  address1?: string;
  address2?: string;
  complete: boolean;
  created_at: Date;
  updated_at: Date;
}

export type ItemType = {
  id: string;
  name: string;
  category: bigint;
  price: string;
  capacity?: string;
  maximum_temperature?: string;
  created_at: Date;
  updated_at: Date;
}

export type ReservationType = {
  user_id: string;
  items_list: {name: string, count: number}[];
  people_cont: number;
  date: string;
  start_time: string;
}