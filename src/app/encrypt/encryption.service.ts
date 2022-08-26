import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor(
    private http: HttpClient,
  ) { }

  encryptData(
    input: string
  ): Observable<string> {
    return of('encrypted');
  }

  decryptData(
    input: string
  ): Observable<string> {
    return of('decrypted');
  }
}
