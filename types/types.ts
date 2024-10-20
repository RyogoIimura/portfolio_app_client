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
