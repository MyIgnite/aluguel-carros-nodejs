

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amout: number;
  brand: string;
  category_id: string;
}

export { ICreateCarDTO };
