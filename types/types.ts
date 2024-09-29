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
