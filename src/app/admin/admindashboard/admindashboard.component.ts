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
// changes
import {HighchartsChartModule} from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { FormsModule } from '@angular/forms';


/**
 * This is a dashboard component for the admin to analyze the data efficiently
 * This component has graphs based on Users and Tickets
 * Different type of graph visuals based on different criteria is displayed in this page
 */

@Component({
  selector: 'app-admindashboard',
  imports: [NgxEchartsModule, CommonModule,RouterLink, FormsModule, HighchartsChartModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {

  //changes
  Highcharts: typeof Highcharts = Highcharts;
  dateFilter!:Highcharts.Options;
  selectedDate:string=new Date().toISOString().split('T')[0];

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

  //count total
  totalTickets:number=0;
  totalUsers:number=0;
allTickets !: Ticket[];
allUsers !:Users[];
  ngOnInit() {

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
        this.updateDateChart(this.selectedDate);

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
  } 

  else {
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

  onDateChange(event:Event):void{
    const selectedDate = (event.target as HTMLInputElement).value;
    this.updateDateChart(selectedDate);
  }

  //change
  updateDateChart(date :string)
  {

    if(!date) return;

    const startDate = new Date(date);
    const targetDates: string[] = [];

    // Collect 5 consecutive dates
    for (let i = 0; i < 5; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      targetDates.push(d.toISOString().split('T')[0]);
    }

    const dateCounts: number[] = targetDates.map(date=>{
      return this.allTickets.filter(ticket=>{
        return new Date(ticket.raiseddate!).toISOString().split('T')[0] === date;
      }).length;
    });

    this.dateFilter={
      title:{text:'Tickets by date'},
      xAxis:{categories: targetDates, title:{text:'Date'} },
      yAxis:{title: {text:'No of tickets'}, allowDecimals:false},
      series:[{
        type:'areaspline',
        data:dateCounts
      }]
    }

  }
}
