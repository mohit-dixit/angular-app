import { Component } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../Environment/environment';

@Component({
  selector: 'app-department',
  imports: [FormsModule, CommonModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent {

  allDepartments: any;
  txtName: string = '';
  selectedDepartmentId: number = 0;
  lblConfirmation: string = '';

  constructor(private service: HttpService) { }

  ngOnInit() {
    this.retrieveAllDepartments();
  }

  retrieveAllDepartments() {
    let api = environment.apis.department;
    this.service.getalldata(api).subscribe((data: any) => {
      if (data && data.length > 0) {
        this.allDepartments = data;
      }
      else {
        this.allDepartments = [];
      }
    }, error => {
      console.log("Error in retrieving data");
      console.log(error);
    });
  }

  saveButtonClick() {
    let api = environment.apis.department;
    this.service.savedata(api, this.txtName).subscribe((data: any) => {
      this.retrieveAllDepartments();
      this.txtName = '';
      this.lblConfirmation = 'Department saved successfully';
    }, error => {
      console.log("Error in saving data");
      console.log(error);
    });
  }

  updateButtonClick() {
    let api = environment.apis.department;
    let updateobject = {
      id: this.selectedDepartmentId,
      name: this.txtName
    }
    this.service.updatedata(api, updateobject).subscribe((data: any) => {
      this.retrieveAllDepartments();
      this.txtName = '';
      this.selectedDepartmentId = 0;
      this.lblConfirmation = 'Department updated successfully';
    }, error => {
      console.log("Error in saving data");
      console.log(error);
    });
  }

  editDepartment(department: any) {
    this.txtName = department.name;
    this.selectedDepartmentId = department.id;
    this.lblConfirmation = '';
  }

  deleteDepartment(department: any) {
    let api = environment.apis.department;
    this.service.deletedata(api, department.id).subscribe((data: any) => {
      this.retrieveAllDepartments();
      this.txtName = '';
      this.lblConfirmation = 'Department deleted successfully';
    }, error => {
      console.log("Error in saving data");
      console.log(error);
    });
  }

}
