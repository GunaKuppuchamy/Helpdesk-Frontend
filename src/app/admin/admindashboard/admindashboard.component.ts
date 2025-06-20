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
import { FormsModule } from '@angular/forms';



/**
 * This is a dashboard component for the admin to analyze the data efficiently
 * This component has graphs based on Users and Tickets
 * Different type of graph visuals based on different criteria is displayed in this page
 */

@Component({
  selector: 'app-admindashboard',
  imports: [NgxEchartsModule, CommonModule,RouterLink,HighchartsChartModule,NgChartsModule,FormsModule],
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

  


    //cards var

    totalAdmins: number = 0;
totalIT: number = 0;
totalEndUsers: number = 0;
 roleCounts: { [key: string]: number } = {};

  //count total
  totalTickets:number=0;
  totalUsers:number=0;
allTickets !: Ticket[];
allUsers !:Users[];


 ngOnInit() {
  forkJoin({
    tickets: this.ticketservice.getTicketAPI(),
    users: this.userservice.getUsersApi()
  }).subscribe({
    next: ({ tickets, users }) => {
      this.allTickets = tickets.body || [];
      this.allUsers = users.body || [];

      this.totalTickets = this.allTickets.length;
      this.totalUsers = this.allUsers.length;

      this.updateTicketChart();
      this.updateUserChart();
      this.updateDateChart(this.selectedDate);
      this.updateStepLineChart();

     
      this.roleCounts = {};
      this.allUsers.forEach(user => {
        const role = user.role?.toLowerCase() || 'unknown';
        this.roleCounts[role] = (this.roleCounts[role] || 0) + 1;
      });

      this.totalAdmins = this.roleCounts['admin'] || 0;
      this.totalIT = this.roleCounts['it'] || 0;
      this.totalEndUsers = this.roleCounts['user'] || 0;
    },
    error: (err) => {
      if (!this.authService.sessionTimeout(err)) {
        console.log("Error occurred");
      }
    }
  });
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


//Highcharts

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

  onDateChange(event:Event):void{
    const selectedDate = (event.target as HTMLInputElement).value;
    this.updateDateChart(selectedDate);
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


//chart.js


public stepLineChartData: ChartData<'line'> = {
  labels: [],
  datasets: []
};

public stepLineChartOptions: ChartConfiguration<'line'>['options'] = {
  responsive: true,
  maintainAspectRatio: false, 
  plugins: {
    title: {
      display: true,
      text: 'Tickets Assigned to IT Members',
      font: {
        size: 21
      },
      color : '#565656'
    },
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      title: { display: true, text: 'IT Member' }
    },
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Tickets Assigned' }
    }
  }
};


updateStepLineChart(): void {
  const itMembers = this.allUsers.filter(user => user.role?.toLowerCase() === 'it');
  const assignmentCounts: { [userid: string]: number } = {};

  
  itMembers.forEach(member => {
    assignmentCounts[member.empid] = 0;
  });

  
  this.allTickets.forEach(ticket => {
    if (assignmentCounts.hasOwnProperty(ticket.itid)) {
      assignmentCounts[ticket.itid]++;
    }
  });

  const labels = itMembers.map(member => member.name || member.empid); 
  const data = itMembers.map(member => assignmentCounts[member.empid]);

  this.stepLineChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Tickets Assigned',
        data: data,
        fill: false,
        borderColor:' rgba(54, 162, 235, 1)',
        tension: 0,
        stepped: true
      }
    ]
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
