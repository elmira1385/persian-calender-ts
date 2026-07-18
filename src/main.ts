interface IToday{
    year:number,
    month:number,
    day:number,
}
interface IGetMonthInformation{
    name:string,
    fristDay:number,
    days:number
}

interface IDataOfCalender{
    year:number,
    month:number,
    today:IToday
}

const today:IToday={
    year:1405,
    month:4,
    day:29
}

const monthName=[
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
]


const fristDayOfMonth=[
    3,
    0,
    1,
    4,
    0,
    1,
    3,
    5,
    1,
    2,
    4,
    0
]


const dayInMonth=(month:number):number=>(
month<=6?31:month<=11?30:29
)
 
const getMonthInformation=(yaer:number,month:number):IGetMonthInformation=>({
    name:monthName[month-1]!,
    fristDay:fristDayOfMonth[month-1]!,
    days:dayInMonth(month)
}
)

// built calender
const renderCalender=(data:IDataOfCalender):void=>{
const calender=document.getElementById("calender") as HTMLDivElement;
calender.innerHTML=""
const monthInformation=getMonthInformation(data.year,data.month)

const title=document.createElement("h2")
title.textContent=`${monthInformation.name} ${data.year}`
calender.appendChild(title)


//prev button

const prevButton=document.createElement("button")
prevButton.textContent="ماه قبل"
prevButton.onclick=()=>{
const newMonth=data.month===1?12:data.month-1
 const newYear=data.month===1?data.year-1:data.year
  renderCalender({year:newYear,month:newMonth,today})
}

//next button 
const nextButton=document.createElement("button")
nextButton.textContent="ماه بعد"
nextButton.onclick=()=>{
const newMonth=data.month===12?1:data.month+1
const newYear=data.month===12?data.year+1:data.year
  renderCalender({year:newYear,month:newMonth,today})
}
calender.appendChild(prevButton)
calender.appendChild(nextButton)

const grid=document.createElement("div")
grid.style.display="grid"
grid.style.gridTemplateColumns="repeat(7,60px)"
grid.style.gap="4px"
grid.style.direction="rtl"
grid.style.textAlign="center"
grid.style.border="red"

const weekDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];
weekDays.forEach((day)=>{
    const cell=document.createElement("div")
    cell.textContent=day
    grid.appendChild(cell)
})


//empty cell before days
for(let i=0;i<monthInformation.fristDay;i++){
    const emptyCell=document.createElement("div")
    emptyCell.style.background="#f3f4f6"
    grid.appendChild(emptyCell)
}

//otherDaysOfMonth
for(let day=1;day<=monthInformation.days;day++){
    const cell= document.createElement("div")
    cell.textContent=day.toString()

    if(data.year===today.year&&data.month===today.month&&day===today.day){
        cell.style.background="#d0f0ff"
        cell.style.borderRadius="6px"
    }
    grid.appendChild(cell)
}
//empty cell after days
const totalCells=monthInformation.fristDay+monthInformation.days
const rameinedCell=42-totalCells
for(let i=0;i<rameinedCell;i++){
    const emptyCell=document.createElement("div")
    emptyCell.style.background="#f3f4f6"
    grid.appendChild(emptyCell)
}
calender.appendChild(grid)
}
renderCalender({year:today.year,month:today.month,today})


