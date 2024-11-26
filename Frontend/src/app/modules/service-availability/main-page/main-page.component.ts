import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, Renderer2, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface Element {
  time: string;
  days: {
    sunday: {
      text: string;
      clicked: number;
    };
    monday: {
      text: string;
      clicked: number;
    };
    tuesday: {
      text: string;
      clicked: number;
    };
    wednesday: {
      text: string;
      clicked: number;
    };
    thursday: {
      text: string;
      clicked: number;
    };
    friday: {
      text: string;
      clicked: number;
    };
    saturday: {
      text: string;
      clicked: number;
    };
  };
}


@Component({
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns = [
    'time',
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

    


  dataSource: Element[] = [
    {
      time: '00:00',
      days: {
        sunday: { text: 'Disponible', clicked: 0 },
        monday: { text: 'Disponible', clicked: 0 },
        tuesday: { text: 'Disponible', clicked: 0 },
        wednesday: { text: 'Disponible', clicked: 0 },
        thursday: { text: 'Disponible', clicked: 0 },
        friday: { text: 'Disponible', clicked: 0 },
        saturday: { text: 'Disponible', clicked: 0 },
      },
    },
    {
      time: '00:00',
      days: {
        sunday: { text: 'Disponible', clicked: 0 },
        monday: { text: 'Disponible', clicked: 0 },
        tuesday: { text: 'Disponible', clicked: 0 },
        wednesday: { text: 'Disponible', clicked: 0 },
        thursday: { text: 'Disponible', clicked: 0 },
        friday: { text: 'Disponible', clicked: 0 },
        saturday: { text: 'Disponible', clicked: 0 },
      },
    },
    {
      time: '00:00',
      days: {
        sunday: { text: 'Disponible', clicked: 0 },
        monday: { text: 'Disponible', clicked: 0 },
        tuesday: { text: 'Disponible', clicked: 0 },
        wednesday: { text: 'Disponible', clicked: 0 },
        thursday: { text: 'Disponible', clicked: 0 },
        friday: { text: 'Disponible', clicked: 0 },
        saturday: { text: 'Disponible', clicked: 0 },
      },
    },
    {
      time: '00:00',
      days: {
        sunday: { text: 'Disponible', clicked: 0 },
        monday: { text: 'Disponible', clicked: 0 },
        tuesday: { text: 'Disponible', clicked: 0 },
        wednesday: { text: 'Disponible', clicked: 0 },
        thursday: { text: 'Disponible', clicked: 0 },
        friday: { text: 'Disponible', clicked: 0 },
        saturday: { text: 'Disponible', clicked: 0 },
      },
    },
    // Agrega más objetos Element según sea necesario
  ];

  constructor(private dialog: MatDialog, private router: Router,private renderer: Renderer2) {
    
  }

  ngOnInit(): void {

  }

  goBackToModal() {
    this.router.navigate(['registro-de-servicios']);
  }
  handleClick(element: any, dayOfWeek: string) {
    element.days[dayOfWeek].clicked = (element.days[dayOfWeek].clicked % 3) + 1;
    if(element.days[dayOfWeek].clicked === 1)
    {
      element.days[dayOfWeek].text = "Ocupado"
    }
    if(element.days[dayOfWeek].clicked === 2)
    {
      element.days[dayOfWeek].text = "Bloqueado"
    }
    if(element.days[dayOfWeek].clicked === 3)
    {
      element.days[dayOfWeek].text = "Disponible"
    }
  }
  
}
