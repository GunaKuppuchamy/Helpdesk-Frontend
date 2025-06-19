import { Component, inject } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { TicketsService } from '../../services/tickets.service';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket';
import { Users } from '../../models/users';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../services/auth-service.service';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration,ChartData} from 'chart.js';



/**
 * This is a dashboard component for the admin to analyze the data efficiently
 * This component has graphs based on Users and Tickets
 * Different type of graph visuals based on different criteria is displayed in this page
 */

@Component({
  selector: 'app-admindashboard',
  imports: [NgxEchartsModule, CommonModule,RouterLink,HighchartsChartModule,NgChartsModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {

  router = inject(Router)
  // Ticket chart vars
  ticketsByFilter!: EChartsOption;
  ticketservice = inject(TicketsService);
  ticketChartType: string = 'bar';
  ticketGroupBy: string = 'status';
  ticketCounts: { [key: string]: number } = {};
  possibleTickets: { [key: string]: string[] } = {
    status: ['open', 'onHold', 'closed', 'cancelled'],
    priroty: ['low', 'medium', 'high'],
    categeory: ['Hardware', 'Software', 'Network', 'Asset Request', 'Email']
  };

  // User chart vars
  userservice = inject(UserServiceService);
  authService = inject(AuthService);
  usersByFilter!: EChartsOption;
  userChartType: string = 'bar';
  userGroupBy: string = 'bu'; 
  userGroupOptions: string[] = ['bu', 'empid'];

  //Highchart vars
  Highcharts: typeof Highcharts = Highcharts;
  highchartsOptions!: Highcharts.Options;

  //count total
  totalTickets:number=0;
  totalUsers:number=0;
allTickets !: Ticket[];
allUsers !:Users[];
  ngOnInit() {
//this.authService.isLoggedIn();

    forkJoin({
      tickets: this.ticketservice.getTicketAPI(),
      users : this.userservice.getUsersApi()
    }).subscribe({
      next : ({tickets,users}) =>
      {
        this.allTickets = tickets.body || [],
        this.allUsers=users.body || []
        this.updateTicketChart();
        this.updateUserChart();
        this.setupHighcharts();
        this.usersCharts();   

      },
      error : (err) =>
      {
        if (!this.authService.sessionTimeout(err)) {
          console.log("Error Occured")
        }
      }
    })
  
  }

  
  //  TICKET CHART 
  updateTicketChart(): void {
    
    
    this.totalTickets=this.allTickets.length;

    const groupKeys = this.possibleTickets[this.ticketGroupBy];
    this.ticketCounts = {};

    groupKeys.forEach(key => this.ticketCounts[key] = 0);

    this.allTickets.forEach(ticket => {
      const key = ticket[this.ticketGroupBy as keyof typeof ticket] as string;
      if (this.ticketCounts.hasOwnProperty(key)) {
        this.ticketCounts[key]++;
      }
    });

    this.ticketsByFilter = {
      title: { text: `Tickets by ${this.ticketGroupBy}` },
      xAxis: this.ticketChartType !== 'pie' ? {
        type: 'category',
        name: this.ticketGroupBy,
        data: groupKeys,
        axisLabel : {
          rotate :30
        }
      } : undefined,
      yAxis: this.ticketChartType !== 'pie' ? {
        type: 'value',
        name: 'Total Tickets',
        minInterval: 1
      } : undefined,
      series: [{
        data: groupKeys.map(key => ({ value: this.ticketCounts[key], name: key })),
        type: this.ticketChartType as 'bar' | 'line' | 'pie'
      }]
    };
  }

  // USER CHART 
  updateUserChart(): void {
  
  this.totalUsers=this.allUsers.length;


  const userCounts: { [key: string]: number } = {};
  let userKeys: string[] = [];

  if (this.userGroupBy === 'userid') {
    // Group directly by ticket.userid (which maps to user.empid)
    userKeys = [...new Set(this.allTickets.map(ticket => ticket.userid))];
    userKeys.forEach(key => userCounts[key] = 0);

    this.allTickets.forEach(ticket => {
      const id = ticket.userid;
      if (userCounts.hasOwnProperty(id)) {
        userCounts[id]++;
      }
    });

  } else {
    // Group by user.bu or other user fields via user.empid === ticket.userid
    userKeys = [...new Set(this.allUsers.map(user => user[this.userGroupBy as keyof typeof user] as string))];
    userKeys.forEach(key => userCounts[key] = 0);

    this.allTickets.forEach(ticket => {
      const user = this.allUsers.find(u => u.empid === ticket.userid);
      const groupValue = user ? user[this.userGroupBy as keyof typeof user] as string : ''; 
      if (groupValue && userCounts.hasOwnProperty(groupValue)) {
        userCounts[groupValue]++;
      }
    });
  }

  this.usersByFilter = {
    title: { text: `Tickets by ${this.userGroupBy.toUpperCase()}` },
    xAxis: this.userChartType !== 'pie' ? {
      type: 'category',
      data: userKeys
    } : undefined,
    yAxis: this.userChartType !== 'pie' ? {
      type: 'value',
      name: 'Total Tickets',
      minInterval: 1
    } : undefined,
    series: [{
      data: userKeys.map(key => ({ value: userCounts[key], name: key })),
      type: this.userChartType as 'bar' | 'line' | 'pie'
    }]
  };
}


 setupHighcharts(): void {
  const dateCounts: { [date: string]: number } = {};
 
  this.allTickets.forEach(ticket => {
    if (ticket.raiseddate) {
      const date = new Date(ticket.raiseddate).toISOString().split('T')[0];
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    }
  });
 
  const sortedDates = Object.keys(dateCounts).sort();
  const data = sortedDates.map(date => dateCounts[date]);
 
  this.highchartsOptions = {
    chart: { type: 'spline' },
    title: { text: 'Tickets Raised per Day' },
    xAxis: {
      categories: sortedDates,
      title: { text: 'Date' }
    },
    yAxis: {
      title: { text: 'Tickets' },
      allowDecimals: false
    },
    series: [{
      name: 'Tickets',
      type: 'spline',
      data: data
    }]
  };
}


//chart.js


public userChartData: ChartData<'bar'> = {
  labels: [],
  datasets: []
};
public chartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Users by Role',
    }
  },
  scales: {
    x: {},
    y: {
      beginAtZero: true
    }
  }
};
 
usersChartType: 'bar' = 'bar';
 
  // Users chart by chart.js
  usersCharts(): void {
  const roleCounts: { [key: string]: number } = {};
 
  this.allUsers.forEach(user => {
    const role = user.role || 'Unknown';
    roleCounts[role] = (roleCounts[role] || 0) + 1;
  });
 
  this.userChartData = {
    labels: Object.keys(roleCounts),
    datasets: [{
      data: Object.values(roleCounts),
      label: 'Users by Role'
    }]
  };
}
               
 

  //HANDLERS 

  onTicketChartTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.ticketChartType = selectElement.value;
    this.updateTicketChart();
  }

  onGroupByChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.ticketGroupBy = selectElement.value;
    this.updateTicketChart();
  }

  onUserChartTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.userChartType = selectElement.value;
    this.updateUserChart();
  }

  onUserGroupByChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.userGroupBy = selectElement.value;
    this.updateUserChart();
  }
}
