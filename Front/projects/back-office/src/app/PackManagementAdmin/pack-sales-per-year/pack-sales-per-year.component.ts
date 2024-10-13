import { Component, OnInit } from '@angular/core';
/* import 'morris.js/morris.js'; */
import ApexCharts from 'apexcharts';

import { ActivatedRoute } from '@angular/router';
import { PackServiceService } from '../../services/pack-service.service';

@Component({
  selector: 'app-pack-sales-per-year',
  templateUrl: './pack-sales-per-year.component.html',
  styleUrls: ['./pack-sales-per-year.component.css']
})
export class PackSalesPerYearComponent {
 
  constructor( private packService: PackServiceService, private activate: ActivatedRoute) { }
 
  initBarChart(): void {
    this.packService.getPackStatisticsByYearAndStatus().subscribe((data: Record<string, [number, number]>) => {
    
      const series = [
        {
          name: `Booth Packs `,
          data: Object.values(data).map(values => values[1] || 0)
        },
        {
          name: `Auction Packs `,
          data: Object.values(data).map(values => values[0] || 0)
        }
      ];
    
      
    var options = {
        series:series,
      chart: {
      type: 'bar',
      height: 360,
  toolbar: {
      show: false
    },
    },
grid: {	
  show: false
},
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
  startingShape: "rounded",
  borderRadius: 7,
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent'],
  lineCap: 'smooth',
    },
    xaxis: {
      categories: Object.keys(data),
   labels: {
  show: true,
  style:{
    fontSize:"14px",
    fontWeight:500,
    colors:"#787878",
  }
   },
   axisBorder:{
       show: false,	
   },
   axisTicks: {
    show: false,
  },
    },
    yaxis: {
  show: true	,
  labels: {
  show: true,
  style:{
    fontSize:"14px",
    fontWeight:500,
    colors:"#787878",
  }
   },
    },
legend:{
  position: 'top',
  horizontalAlign: 'left', 
  fontWeight: 300,
  fontSize:'16px',
  fontFamily:'poppins',
  colors:['#202020'],
  
   markers:{
      radius: 12,
   },
},
    fill: {
      opacity: 1
    },
colors: ['#624FD1', 'var(--primary)'],
  
    };

    var chart = new ApexCharts(document.querySelector("#BarChartss"), options);
    chart.render();
  });
}

initCurrentChart1(): void {
  this.packService.calculateReservationPercentageByType().subscribe((percentages) => {
    const options = {
      series: percentages,
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          startAngle: -160,
          endAngle: 160,
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
          },
        },
      },
      stroke: {
        lineCap: 'round',
      },
      labels: ['Diamond', 'Silver', 'standard'],
      colors: ['#B22222', '#FFAF65', '#FFE5A0'],
      responsive: [
        {
          breakpoint: 1601,
          options: {
            chart: {
              height: 250,
              type: 'radialBar',
            },
          },
        },
      ],
    };

    const chart = new ApexCharts(document.querySelector('#currentChart11'), options);
    chart.render();
  });
}

revenuDiamond!:number;
revenuStandard!:number;

revenusilver!:number;
toployalcustomers!:[];
QuantiteDiamond!:number;
Quantitestandard!:number;
Quantitesilver!:number;
RevenuTotal!:number;


  ngOnInit(): void {
   
    this.packService.QuantitePeTypePack("diamond").subscribe(res => {
    
      this.QuantiteDiamond = res;
    });

    this.packService.QuantitePeTypePack("standard").subscribe(res => {
    
      this.Quantitestandard = res;
    });

    this.packService.QuantitePeTypePack("silver").subscribe(res => {
    
      this.Quantitesilver = res;
    });
    this.packService.revenueTotal().subscribe(res => {
    
      this.RevenuTotal = res;
    });


      this.initBarChart();
      this.initCurrentChart1();

      this.packService.toployalcustomers().subscribe(res => {
        console.log(res);
        this.toployalcustomers = res;
      });
    

      this.packService.RevenuePeTypePack('diamond').subscribe(res => {
        this.revenuDiamond = res;
      });

      this.packService.RevenuePeTypePack('standard').subscribe(res => {
        this.revenuStandard = res;
      });
      this.packService.RevenuePeTypePack('silver').subscribe(res => {
        this.revenusilver = res;
      });
    };
  
  

   

}