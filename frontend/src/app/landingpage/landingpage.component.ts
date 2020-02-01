import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../authentication.service';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor(private router: Router, private AuthService: AuthenticationService) { }

  public show:boolean = false;
  public buttonName:any = 'Show';

  exampleFile: String = "SC4001E0.edf";
  trainDataset: String = ""

  LeftChart: EChartOption 
  RightChart: EChartOption

  userInformation = {
    userName: '',
    password: '',
    checkPassword: '',
    first_name: '',
    last_name: '',
    sex: '',
    pnumber: '',
    chronic: '',
    fChronic: '',
    email: '',
    addr:'',
    addr2:'',
    city: '',
    state: '',
    zip:''
  }

  ngOnInit() {
    window.localStorage.removeItem('usertoken') // remove token every time that access to this page
    //this.AuthService.mockupdata()
    this.getMockupData()
    
    //this.onShowReport()
    console.log(this.exampleFile)
        
  }

  login() {
    // console.log(this.userInformation)
    this.AuthService.login(this.userInformation).subscribe(
      res => {
        console.log(res)
        this.router.navigateByUrl('/uploadfile')
      },
      err => {
        console.error(err)
      }
    )
  }

  setExampleFile(event: any){
      this.exampleFile = event.target.value
      console.log(this.exampleFile)
  }

  getExampleFile(){
      console.log(this.exampleFile)
      return this.exampleFile
  }

  setTrainDataset(String){
      this.trainDataset = String
      console.log(this.trainDataset)
  }

  getTrainDataset(){
      console.log(this.trainDataset)
      return this.trainDataset

  }

  onSignup(){
    this.router.navigate(['/register']);
    
  }

  toggle() {

    this.show = !this.show;
    console.log(this.trainDataset)
    console.log(this.exampleFile)

    if(this.trainDataset == 'sleepEDF' && this.exampleFile == 'SC4001E0.edf'){

        this.graph1()

    }else if(this.trainDataset == 'sleepEDF' && this.exampleFile == 'SC4002E0.edf'){

        this.graph2()

    }else if(this.trainDataset == 'MASS' && this.exampleFile == 'SC4001E0.edf'){

        this.graph3()

    }else if(this.trainDataset == 'MASS' && this.exampleFile == 'SC4002E0.edf'){

        this.graph4()

    }
  }


  // ------------------------------------------ GET MOCK UP DATA ------------------------------------


  xData;
  xDataEnlarge = [];
  xSize = [];
  countX = 0;

  yData;
  yDataEnlarge = [];
  ySize = [];;
  countY = 0;;

  getMockupData(){

    /* to make load only 1 set of data it need to pass value from .ts to .py (get XXXX.edf from html then change name to XXXX.npz then send it to python)
        
        ---
        getMockupData(Examplefile){

            Example_file = Examplefile
            Example_file.replace(edf,npz)

            this.AuthService.mockupdata(Example_file) ---> XXXX.npz
        }

        GO TO authentication.service.ts ---

        mockupdata(Example_file){
            ...
            return this..http.post( .... ,Example_file) -- [I'm not sure what is second parameter],[ I Can't remember how to pass it to backend ]
        }

        GO TO mongo.py ---

            [I dont know]
    

        if cannot do that it need to call 4 mockup data and declare and use variable manually
        and if can do that, it can use for real data when user already logged in
    */

    //this only mockup 1 set of data
    this.AuthService.mockupdata().subscribe(
      res =>{

        //console.log(res)
        this.xData = res['x'];
        //console.log(this.xData);
        for(var i in this.xData){
          for(var j in this.xData[i]){

            this.xDataEnlarge[this.countX] = this.xData[i][j]
            this.xSize[this.countX] = this.countX
            this. countX ++ ;

          }
        }

        //console.log('eiei');
        //console.log(this.xDataEnlarge.length );


        this.yData = res['y'];
        //console.log(this.yData);
        for(var k in this.yData){

          this.yDataEnlarge[this.countY] = this.yData[k]
          this.ySize[this.countY] = this.countY
          this.countY ++;
          //console.log(this.yData[k])
        }

      },
      err => {

      }
    )

  }


  // -------------------------------------- GENERATE GRAPH ------------------------------------------------------------

  graph1(){

    /*
     *  Left Chart
     */

      this.LeftChart = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
              return [pt[0], '10%'];
          }
      },
      title: {
          left: 'center',
          text: 'Raw Signal',
      },
      toolbox: {
          feature: {
              dataZoom: {
                  yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category', //time
          boundaryGap: false,
          //data: this.xDataEnlarge.length
          //data: date
          //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        //   axisLabel: {
        //     interval:  3000
        //     },

          data: this.xSize,
          //data: timeData
          
          
      },
      yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
          
      },
      dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
      }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: 40,
          handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
          }
      }],
      series: [
          {
              name: 'Test',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                  color: 'rgb(255, 70, 131)'
              },
            //   areaStyle: {
            //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //           offset: 0,
            //           color: 'rgb(255, 158, 68)'
            //       }, {
            //           offset: 1,
            //           color: 'rgb(255, 70, 131)'
            //       }])
            //   },
              data: this.xDataEnlarge
              //data: [820, 932, 901, 934, 1290, 1330, 1320]
              
          }
      ]
      }


      /*
     *  Right Chart
     */

    this.RightChart = {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    },
    title: {
        left: 'center',
        text: 'Result',
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        //data: this.xDataEnlarge.length
        //data: date
        //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        data: this.ySize
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
        
    },
    dataZoom: [{
        type: 'inside',
        start: 0,
        end: 10
    }, {
        start: 0,
        end: 10,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: 40,
        handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        }
    }],
    series: [
        {
            name: 'Test',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            // areaStyle: {
            //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //         offset: 0,
            //         color: 'rgb(255, 158, 68)'
            //     }, {
            //         offset: 1,
            //         color: 'rgb(255, 70, 131)'
            //     }])
            // },
            data: this.yDataEnlarge
            //data: [820, 932, 901, 934, 1290, 1330, 1320]
            
        }
    ]
    }
  }

  graph2(){

    this.LeftChart = {

        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]

    }

    this.RightChart = {

        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]

    }

  }

  graph3(){

    var base = +new Date(1968, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    var data = [Math.random() * 300];

    for (var i = 1; i < 20000; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }

    this.LeftChart = {

        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: '大数据量面积图',
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
        }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: 80,
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        series: [
            {
                name: '模拟数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                // areaStyle: {
                //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //         offset: 0,
                //         color: 'rgb(255, 158, 68)'
                //     }, {
                //         offset: 1,
                //         color: 'rgb(255, 70, 131)'
                //     }])
                // },
                data: data
            }
        ]
        
    }

    this.RightChart = {

    }
    
  }

  graph4(){

    var base = +new Date(1968, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    var data = [Math.random() * 300];

    for (var i = 1; i < 20000; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }

    this.LeftChart = {

    }

    this.RightChart = {

        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: '大数据量面积图',
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
        }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: 80,
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        series: [
            {
                name: '模拟数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                // areaStyle: {
                //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //         offset: 0,
                //         color: 'rgb(255, 158, 68)'
                //     }, {
                //         offset: 1,
                //         color: 'rgb(255, 70, 131)'
                //     }])
                // },
                data: data
            }
        ]

        
    }

  }

// ---------------------------------------------------------------------------------------------------------------

}
