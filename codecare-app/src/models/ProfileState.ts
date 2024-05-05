export interface Vaccination {
    id: string;
    name: string;
    date: string; 
}
  
export interface ProfileState {
    name: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    vaccinations: Vaccination[];
}
  