import { Component, inject } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { TicketsService } from '../../services/tickets.service';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admindashboard',
  imports: [NgxEchartsModule, CommonModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {

  // Ticket chart vars
  ticketsByFilter!: EChartsOption;
  ticketservice = inject(TicketsService);
  ticketChartType: string = 'bar';
  ticketGroupBy: string = 'status';
  ticketCounts: { [key: string]: number } = {};
  possibleTickets: { [key: string]: string[] } = {
    status: ['open', 'onHold', 'closed', 'cancelled'],
    priroty: ['low', 'medium', 'high'],
    categeory: ['Hardware', 'Software', 'Network', 'Access', 'Email']
  };

  // User chart vars
  userservice = inject(UserServiceService);
  usersByFilter!: EChartsOption;
  userChartType: string = 'bar';
  userGroupBy: string = 'bu'; 
  userGroupOptions: string[] = ['bu', 'empid'];

  //count total
  totalTickets:number=0;
  totalUsers:number=0;

  ngOnInit() {
    this.updateTicketChart();
    this.updateUserChart();
  }

  //  TICKET CHART 
  updateTicketChart(): void {
    const allTickets = this.ticketservice.getTickets();
    this.totalTickets=allTickets.length;

    const groupKeys = this.possibleTickets[this.ticketGroupBy];
    this.ticketCounts = {};

    groupKeys.forEach(key => this.ticketCounts[key] = 0);

    allTickets.forEach(ticket => {
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
        data: groupKeys
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
  const allUsers = this.userservice.getUsers();
  this.totalUsers=allUsers.length;

  const allTickets = this.ticketservice.getTickets();
  const userCounts: { [key: string]: number } = {};
  let userKeys: string[] = [];

  if (this.userGroupBy === 'userid') {
    // Group directly by ticket.userid (which maps to user.empid)
    userKeys = [...new Set(allTickets.map(ticket => ticket.userid))];
    userKeys.forEach(key => userCounts[key] = 0);

    allTickets.forEach(ticket => {
      const id = ticket.userid;
      if (userCounts.hasOwnProperty(id)) {
        userCounts[id]++;
      }
    });

  } else {
    // Group by user.bu or other user fields via user.empid === ticket.userid
    userKeys = [...new Set(allUsers.map(user => user[this.userGroupBy as keyof typeof user] as string))];
    userKeys.forEach(key => userCounts[key] = 0);

    allTickets.forEach(ticket => {
      const user = allUsers.find(u => u.empid === ticket.userid);
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
}
