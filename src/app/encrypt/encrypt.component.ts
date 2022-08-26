import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EncryptionService } from './encryption.service';
import { catchError, take } from 'rxjs/operators'; 
import { of } from 'rxjs';

@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.component.html',
  styleUrls: ['./encrypt.component.css']
})
export class EncryptComponent implements OnInit {
  encryptForm: FormGroup;
  showOutputForm: boolean = false;

  constructor(
    private toastr: ToastrService,
    private encryptionService: EncryptionService,
    private cd: ChangeDetectorRef
  ) {
    this.encryptForm = new FormGroup({
      input: new FormControl('', [Validators.required]),
      output: new FormControl('')
    });
   }

  ngOnInit(): void {
    
  }

  encrypt() {
    const data = this.encryptForm.getRawValue();
    this.encryptionService.encryptData(data.input)
    .pipe(
      take(1),
      catchError((err) => {
        this.toastr.error('There was an error Encryption. Please try again', 'Error');
        return of('');
      })
    )
    .subscribe((data) => {
        this.encryptForm.patchValue({
          output: data
        });
        if (!!data) {
          this.toastr.success('The data was encrypted successfully', 'success');
        }
        this.cd.detectChanges();
    });
  }

  deEncrypt() {
    const data = this.encryptForm.getRawValue();
    this.encryptionService.decryptData(data.input)
    .pipe(
      take(1),
      catchError((err) => {
        this.toastr.error('There was an error Descryption. Please try again', 'Error');
        return of('');
      })
    )
    .subscribe((data) => {
        this.encryptForm.patchValue({
          output: data
        });
        if (!!data) {
          this.toastr.success('The data was decrypted successfully', 'success');
        }
        this.cd.detectChanges();
    });
  }

}

