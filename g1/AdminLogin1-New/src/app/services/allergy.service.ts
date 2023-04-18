import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AllergyService {
  allergy: string;
  allergyById: string;

  constructor(public http: HttpClient) {
    this.allergy = "http://localhost:9002/api/v1/allergy";
    this.allergyById = "http://localhost:9002/api/v1/allergy"
  }
  public getAllergies(): Observable<Allergy[]> {
    return this.http.get<Allergy[]>(this.allergy);
  }

  public getAllergyById(id: any): Observable<Allergy> {
    return this.http.get<Allergy>(this.allergyById + "/" + { id });
  }
}
