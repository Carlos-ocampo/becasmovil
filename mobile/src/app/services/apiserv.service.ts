import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiservService {
  url =  'http://127.0.0.1:8000/';
  userToken  = '';
  // userToken  = '0b4b30363bdf98129a60a2a8dba5449413f9a2d7';

  constructor(public http: HttpClient) { }
  
  getUserToken(loginData){
    return new Promise((resolve, reject) => {
      // this.http.post(this.url + 'api_generate_token/', JSON.stringify(loginData))
      this.http.post(this.url + 'api_generate_token/', loginData)
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          // console.log("err", error);
          reject(error);
        });
    });
  }

  getUserTokenSetted(){
    return this.userToken;
  }

  setUserToken(token){
    this.userToken = token;
  }

  // paises
  getPaises(){
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'api/paises/',{headers: {'Authorization': 'Token ' + this.userToken}})
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
  // get pais by id
  getPaisById(id){
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'api/paises/' + id ,{headers: {'Authorization': 'Token ' + this.userToken}})
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
  // update pais by id
  updatePais(id, data){
    return new Promise((resolve, reject) => {
      this.http.put(this.url + 'api/paises/' + id , data,{headers: {'Authorization': 'Token ' + this.userToken}})
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
  //crate pais
  createPais(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'api/paises/', data,{headers: {'Authorization': 'Token ' + this.userToken}})
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
  //delete pais
  deletePais(id){
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + 'api/paises/' + id,{headers: {'Authorization': 'Token ' + this.userToken}})
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }


  // get universidades
  getUnis(){
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'api/universidad/',{headers: {'Authorization': 'Token ' + this.userToken}})
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
  // get universidad by id
  getUniById(id){
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'api/universidad/' + id ,{headers: {'Authorization': 'Token ' + this.userToken}})
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
  //update universidad by id
  updateUni(id, data){
    return new Promise((resolve, reject) => {
      this.http.put(this.url + 'api/universidad/' + id , data,{headers: {'Authorization': 'Token ' + this.userToken}})
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
  //create universidad
  createUni(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'api/universidad/', data,{headers: {'Authorization': 'Token ' + this.userToken}})
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
  //delete universidad
  deleteUni(id){
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + 'api/universidad/' + id,{headers: {'Authorization': 'Token ' + this.userToken}})
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }


  // get becas
  getBecas(){
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'api/beca/',{headers: {'Authorization': 'Token ' + this.userToken}})
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
  // get beca by id
  getBecaById(id){
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'api/beca/' + id ,{headers: {'Authorization': 'Token ' + this.userToken}})
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
  //update beca by id
  updateBeca(id, data){
    return new Promise((resolve, reject) => {
      this.http.put(this.url + 'api/beca/' + id , data,{headers: {'Authorization': 'Token ' + this.userToken}})
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
  //create beca
  createBeca(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'api/beca/', data,{headers: {'Authorization': 'Token ' + this.userToken}})
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
  //delete beca
  deleteBeca(id){
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + 'api/beca/' + id,{headers: {'Authorization': 'Token ' + this.userToken}})
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
  

  // get news
  getNews(){
    return new Promise((resolve, reject) => {
      this.http.get('https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=bRAKbmyTSBVvoBWXpAHd6qRAIxihHUR8')
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }


}
