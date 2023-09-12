import { Component, Inject, OnInit } from '@angular/core';
import { WriterService } from 'src/app/general-settings/services/writer.service';
import { DeleteEntryBodyRequest } from 'src/app/general-settings/static/Body';
import { hideCardAnimation, makeCardAnimation } from 'src/app/general-settings/static/HelperFunctions';
import { PopUpComponent } from '../../general-settings/components/pop-up/pop-up.component';

@Component({
  selector: 'app-writer-dashboard',
  templateUrl: './writer-dashboard.component.html',
  styleUrls: ['./writer-dashboard.component.scss']
})
export class WriterDashboardComponent implements OnInit{

  constructor( @Inject(WriterService)
  public writerService: WriterService) {
    this.getDashboardData();
   }
  loadingDisplayStyle = 'none';
  doneDisplayStyle = "none";
  removeDisplayStyle = "none";
  somethingWentWrongStyle: string = 'none';
  isDisplayAllEntries = false;

  ngOnInit(): void {
    this.writerService.makeLoader();
  }
  async getDashboardData(){
    await this.writerService.getWriterDashboardDetails();

  }
  async addCarEntry(){
    this.openLoadingPopup();
    await this.writerService.postVehicleEntry('Car');
    await this.getDashboardData();
    this.closeLoadingPopup();
    if(this.writerService.isVehicleAdded) 
      this.openDonePopup();
    else this.openErrorPopup();

  }
  async addBikeEntry(){
    this.openLoadingPopup();
    await this.writerService.postVehicleEntry('Bike');
    await this.getDashboardData();
    this.closeLoadingPopup();
    if(this.writerService.isVehicleAdded) 
      this.openDonePopup();
    else this.openErrorPopup();
  }
  async deleteEntry(timeStamp:string, vehicle:string){
    this.openLoadingPopup();
    await this.writerService.deleteVehicleEntry(timeStamp,vehicle);
    await this.getDashboardData();
    this.closeLoadingPopup();
    if(this.writerService.isVehicleDeleted) 
      this.openRemovePopup();
    else this.openErrorPopup();
  }
  openDonePopup() {
    this.doneDisplayStyle = "flex";
  }
  closeDonePopup() {
    this.doneDisplayStyle = "none";
  }
  removeEntry(){
    this.openRemovePopup();
  }
  openRemovePopup() {
    this.removeDisplayStyle = "flex";
  }
  closeRemovePopup() {
    this.removeDisplayStyle = "none";
  }
  openErrorPopup() {
    this.somethingWentWrongStyle = "flex";
  }
  closeErrorPopup() {
    this.somethingWentWrongStyle = "none";
  }
  openLoadingPopup() {
    this.loadingDisplayStyle = "flex";
  }
  closeLoadingPopup() {
    this.loadingDisplayStyle = "none";
  }
  async displayAllEntries(){
    this.openLoadingPopup();
    await this.writerService.gelAllEntries();
    this.closeLoadingPopup();
    if(this.writerService.isAllVehicleEntriesAdded)
      this.isDisplayAllEntries = true;
    else 
      this.openErrorPopup();
  }
  async getAllEntries(){
    await this.writerService.gelAllEntries();
    if(this.writerService.isAllVehicleEntriesAdded)
      this.isDisplayAllEntries = true;
    else 
      this.openErrorPopup();
  }

  getVehicleSrc(vehicleType:string){
    if(vehicleType == 'Car') return '../../../assets/logos/icon-car.svg'
    else return '../../../assets/logos/icon-bike.svg'
  }

}
