import { Component } from '@angular/core';
import { FormControl} from '@angular/forms';
import { Chart }from 'chart.js/auto';
import { Observable, Subscription, interval, map, takeWhile } from 'rxjs';
import { ValueProviderService } from '../value-provider.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private ValueProviderService: ValueProviderService){

  };

  viewOption!: string;
  options = [
    { value: 'Individual', label: 'Individual' },
    { value: 'Team', label: 'Team' },

  ];

  labOption!: string;
  options1 = [
    { value: 'Lab 1', label: 'Lab 1' },
    { value: 'Lab 2', label: 'Lab 2' },

  ];

  floors = new FormControl('');
  meters = new FormControl('');
  showFiller = false;
  floorsList: string[] = ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4', 'Floor 5'];
  MetersList: string[] = ['Meter 1', 'Meter2', 'Meter3', 'Meter 4', 'Meter 5'];


 
  currentDate = new Date();

  dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  formattedDateTime = this.currentDate.toLocaleString('en-US', this.dateTimeFormatOptions);


  gauges = [
    {
      title: 'Voltage (V)',
      value: 0
    },{
      title: 'Current (V)',
      value: 0      
    },{
      title: 'Power (kW)',
      value: 0      
    },{
      title: 'Power Factor',
      value: 0      
    },{
      title: 'Frequency',
      value: 0      
    }  
  ]
    

   updateGauges(values: number[]){   
    for (let i = 0; i < 5; i++) {
      this.gauges[i].value = values[i];
    }
  }


  chart: any;
  values: number[] = [];
  
  private powerChart!: Chart;
  private powerFactor!: Chart;

  randomGaugeValues!: Observable<number[]>;

  ngOnInit() {
    this.ValueProviderService.getRandomValues().subscribe(values => {
      this.updateChart(values);
    });

    this.ValueProviderService.getRandomValues().subscribe(values => {
      this.updateChart2(values);
    });

    this.ValueProviderService.getRandomGaugeValues().subscribe(values => {
      this.updateGauges(values);
    });
  }


  private updateChart(data: number[]) {
    if (!this.powerChart) {
      const Power = document.getElementById('powerChart') as HTMLCanvasElement;
      this.powerChart = new Chart(Power, {
        type: 'line',
        data: {
          labels: ['1', '2', '3', '4', '5', '6'],
          datasets: [{
            label: 'Power(kW)',
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    } else {
      this.powerChart.data.datasets[0].data = data;
      this.powerChart.update();
    }

  }

  private updateChart2(data: number[]) {

    if (!this.powerFactor) {
      const Power = document.getElementById('powerFactor') as HTMLCanvasElement;
      this.powerFactor = new Chart(Power, {
        type: 'line',
        data: {
          labels: ['1', '2', '3', '4', '5', '6'],
          datasets: [{
            label: 'Power Factor',
            data: data,
            borderColor: 'rgba(63, 72, 204, 1)',
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    } else {
      this.powerFactor.data.datasets[0].data = data;
      this.powerFactor.update();
    }
  }





}
