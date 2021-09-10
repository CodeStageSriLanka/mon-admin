import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  showSuccessfulAdmin() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Successfully Registered!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  showloading(message1?, message2?){
    Swal.fire({
      title: message1,
      html: message2,
      didOpen: () => {
        Swal.showLoading()

      }
    });
  }

  dismissAlert(){
    Swal.close();
  }


  showError(message?) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Error',
      text: message,
      showConfirmButton: false,
      timer: 3000
    });
  }



  showErrorAdmin(message?) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: message,
      text: '',
      showConfirmButton: false,
      timer: 3000
    });
  }

  showSuccessful() {

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Successfully Added!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  showEditSuccessful() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Successfully updated!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  showEditError() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Error!',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
