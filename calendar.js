function tagCreate(tType, props) {
  let element = document.createElement(tType);
  for (let i in props) {
    element[i] = props[i];
  }
  return element;
};

function styleCreate(obj, styleOb) {
  for (i in styleOb) {
    obj.style[i] = styleOb[i];
  }
}

function calendar() {
  let now = new Date();
  let nowYear = now.getFullYear();
  let nowMonth = now.getMonth() + 1;
  let nowDate = now.getDate();

  const monthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (nowYear % 400 === 0) {
    monthArray[1] = 29;
  } else if(nowYear % 4) {
    monthArray[1] = 29;
  } else if(nowYear % 100) {
    monthArray[1] = 28;
  }

  let lastDate = monthArray[now.getMonth()];

  let monthOfLastDate = new Date(nowYear, nowMonth, 0);
  let nowMonthOfLastDate = monthOfLastDate.getDate();

  let firstDay = new Date(nowYear, now.getMonth(), 1); //! 지금 현재 날짜의 첫번째 날찌
  let monthOfFirstDay = firstDay.getDay(); //! 월의 첫번째 날짜의 요일

  let weekCount = Math.ceil((monthOfFirstDay + nowMonthOfLastDate) / 7); //!(주의 수) 월의 시작 요일과 마지막 날짜를 더해서 7로 나눠준다.

  let root = tagCreate('root', {id: 'root'});
  document.body.appendChild(root);
  styleCreate(root, {
    width: "700px",
    height: "700px",
    border: "3px solid black",
    backgroundColor: "black"
  })
  let table = tagCreate('table', {id: 'table'});
  root.appendChild(table);
  styleCreate(table, {
    width: "500px",
    height: "500px",
    backgroundColor: "#F7786B"
  })

  let weekIndex = [];
  let dayIndex = [];

  let countOfWeek = 0;
  let countOfDay = 0;

  for(let i = 0; i < weekCount; i++) {
    weekIndex[i] = tagCreate('tr', {id:`week${i}`});
    table.appendChild(weekIndex[i]);
    for(let j = 0; j < 7; j++) {
      dayIndex[j] = tagCreate('td');
      weekIndex[i].appendChild(dayIndex[j]);
      styleCreate(dayIndex[j], {
        color: "white",
        flexDirection: "row",
        justfyContent: "center",
        textAlign: "center",
      })
      if(monthOfFirstDay <= countOfWeek && countOfDay < nowMonthOfLastDate) {
        countOfDay++;
        dayIndex[j].innerText = countOfDay;
        if(countOfDay === nowDate) {
          styleCreate(dayIndex[j], {
            backgroundColor: "red",
            borderRadius: "50%",

          })
        }
      }
      countOfWeek++;
    }
  }

  
  

  console.log(monthOfFirstDay);
  // console.log(weekCount);
}

calendar();
