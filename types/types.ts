export type userType = {
  id: string;
  name: string;
  email: string;
  tel?: string;
  address?: string;
  birth?: string;
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
