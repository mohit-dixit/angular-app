import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  stats = [
    { label: 'Orders', value: '85,246' },
    { label: 'Income', value: '$96,147' },
    { label: 'Notifications', value: '846' },
    { label: 'Payment', value: '$84,472' },
  ];

  public lineChartConfig: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [10, 20, 15, 30, 25, 40, 35],
          label: 'Sales',
          fill: true,
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66,165,245,0.2)',
        },
      ],
    },
    options: {
      responsive: true,
    },
  };

  public barChartConfig: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [
        {
          data: [30, 40, 60, 70, 50, 80, 60, 70, 90],
          label: 'Sales',
          backgroundColor: '#3f51b5',
        },
        {
          data: [20, 30, 50, 60, 40, 70, 50, 60, 80],
          label: 'Views',
          backgroundColor: '#7986cb',
        },
      ],
    },
    options: {
      responsive: true,
    },
  };

  public pieChartConfig: ChartConfiguration<'pie'> = {
  type: 'pie',
  data: {
    labels: ['Chrome', 'Firefox', 'Edge', 'Safari'],
    datasets: [
      {
        data: [55, 25, 10, 10],
        backgroundColor: ['#3f51b5', '#ff5722', '#4caf50', '#ffc107']
      }
    ]
  },
  options: {
    responsive: true
  }
};

public doughnutChartConfig: ChartConfiguration<'doughnut'> = {
  type: 'doughnut',
  data: {
    labels: ['Download', 'Upload', 'Streaming'],
    datasets: [
      {
        data: [300, 500, 200],
        backgroundColor: ['#8e24aa', '#d81b60', '#43a047']
      }
    ]
  },
  options: {
    responsive: true
  }
};

public radarChartConfig: ChartConfiguration<'radar'> = {
  type: 'radar',
  data: {
    labels: ['Speed', 'Strength', 'Agility', 'Stamina', 'Skill'],
    datasets: [
      {
        data: [65, 59, 90, 81, 56],
        label: 'Player A',
        backgroundColor: 'rgba(63,81,181,0.4)',
        borderColor: '#3f51b5',
        pointBackgroundColor: '#3f51b5'
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true
      }
    }
  }
};

public polarAreaChartConfig: ChartConfiguration<'polarArea'> = {
  type: 'polarArea',
  data: {
    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    datasets: [
      {
        data: [11, 16, 7, 3, 14],
        backgroundColor: ['#f44336', '#4caf50', '#ffeb3b', '#9e9e9e', '#2196f3']
      }
    ]
  },
  options: {
    responsive: true
  }
};

}
