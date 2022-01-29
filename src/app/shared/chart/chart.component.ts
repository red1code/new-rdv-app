import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, ChartTypeRegistry } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() chartID!: string;
  @Input() chartX!: string[];
  @Input() chartY!: number[];
  @Input() chartTitle!: string;
  @Input() chartType!: keyof ChartTypeRegistry;

  chart!: Chart;
  bgColor = '#ffffff';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartY']) {
      this.chart = this.initChart
    }
  }

  ngOnInit(): void {
    this.chart = this.initChart
  }

  ngAfterViewInit(): void {
    this.chart = this.initChart
  }

  get initChart() {
    return this.chartConfig(this.chartID, this.chartX, this.chartY, this.chartTitle, this.chartType)
  }

  chartConfig(id: string, x: string[], y: number[], title: string, tp: keyof ChartTypeRegistry): Chart {
    return new Chart(id, {
      type: tp,
      data: {
        labels: x,
        datasets: [{
          label: 'Data',
          data: y,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: title,
            font: {
              size: 25
            }
          }
        }
      }
    })
  }

  exportChart() {
    const canvas = document.getElementById(this.chartID) as HTMLCanvasElement;
    const destinationCanvas = document.createElement("canvas");
    destinationCanvas.width = canvas.width;
    destinationCanvas.height = canvas.height;
    const destCtx: CanvasRenderingContext2D | null = destinationCanvas.getContext('2d');
    //create a rectangle with the desired color
    destCtx!.fillStyle = this.bgColor;
    destCtx?.fillRect(0, 0, canvas.width, canvas.height);
    //draw the original canvas onto the destination canvas
    destCtx?.drawImage(canvas, 0, 0);
    //finally use the destinationCanvas.toDataURL() method to get the desired output;
    const a = document.createElement('a');
    a.href = destinationCanvas.toDataURL();
    a.download = this.chart.options.plugins?.title?.text as string;
    a.click();
  }

}
