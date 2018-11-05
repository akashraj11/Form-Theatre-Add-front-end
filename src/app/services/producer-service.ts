import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment as env } from "../../environments/environment";
import { Theatre } from "../domain/theatre";
@Injectable({
  providedIn: "root"
})
export class ProducerService {
  private _url: string = "http://localhost:8080/api/v1/addTheatre";
  constructor(private http: HttpClient) {}

  addTheatre(email:string,theatre:Theatre)
  {
    console.log("update in service");
    console.log(email);
    const updateurl=`${this._url}/${email}/`;
    this.http.put(updateurl,theatre).subscribe(
      data => {
          console.log("POST Request is successful ", data);
      },
      error => {
          console.log("Error", error);
      });
  }

}