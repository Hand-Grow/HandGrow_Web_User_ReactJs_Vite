export interface Ward {
  name: string;
  code: number;
  division_type: string;
  codename: string;
}

export interface District {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  wards: Ward[];
}

export interface Province {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts?: District[];
}
