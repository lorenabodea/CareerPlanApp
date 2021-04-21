import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private readonly http: HttpClient) { }

    public get(path: string, params?: { [param: string]: string | string[] }): any {
        return this.http.get<any>(path, { params });
    }

    public post(path: string, data: any): any {
        return this.http.post(path, data);
    }

    public put(path: string, data: any, httpOptions?: object): any {
        return this.http.put(path, data, httpOptions);
    }

    public delete(path: string): any {
        return this.http.delete(path);
    }
}
