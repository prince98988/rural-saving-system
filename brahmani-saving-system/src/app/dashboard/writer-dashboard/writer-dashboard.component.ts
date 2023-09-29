import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WriterService } from 'src/app/general-settings/services/writer.service';

@Component({
  selector: 'app-writer-dashboard',
  templateUrl: './writer-dashboard.component.html',
  styleUrls: ['./writer-dashboard.component.scss'],
})
export class WriterDashboardComponent implements OnInit {
  removeEmployeeStyle = 'none';
  somethingWentWrongStyle: string = 'none';
  settingsPopUpStyle: string = 'none';
  selectedUserName: string = '';
  selectedUserEmail: string = '';
  loadingDisplayStyle: string = 'none';
  searchForm!: FormGroup;
  searchText: string = '';
  constructor(
    private router: Router,
    @Inject(WriterService)
    public writerService: WriterService,
    private formBuilder: FormBuilder
  ) {
    this.getAllMember();
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchText: ['', []],
    });
  }

  async getAllMember() {
    await this.writerService.getAllMembersMontlyDetails();
  }
  openRemoveEmployeePopup() {
    this.removeEmployeeStyle = 'flex';
  }
  closeRemoveEmployeePopup() {
    this.removeEmployeeStyle = 'none';
  }
  openErrorPopup() {
    this.somethingWentWrongStyle = 'flex';
  }
  closeErrorPopup() {
    this.somethingWentWrongStyle = 'none';
  }
  openSettingPopup() {
    this.settingsPopUpStyle = 'flex';
  }
  closeSettingPopup() {
    this.settingsPopUpStyle = 'none';
  }
  addEmployee() {
    this.router.navigate(['add-employee']);
  }
  openLoadingPopup() {
    this.loadingDisplayStyle = 'flex';
  }
  closeLoadingPopup() {
    this.loadingDisplayStyle = 'none';
  }
  onSelectUser(username: string) {
    this.settingsPopUpStyle = 'flex';
    this.selectedUserName = username;
  }
  searchMembers(searchText: any) {
    console.log('jjf');
  }
}
