function tagCreate(tType, props) {
  let element = document.createElement(tType);
  for (let i in props) {
    element[i] = props[i];
  }
  return element;
}

function styleCreate(obj, styleOb) {
  for (i in styleOb) {
    obj.style[i] = styleOb[i];
  }
}
const container = tagCreate("div", {id: "rootParent"});
document.body.appendChild(container);

function calendar(now) {
  // let now = new Date();
  let nowYear = now.getFullYear();
  let nowMonth = now.getMonth() + 1;
  let nowDate = now.getDate();

  const monthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (nowYear % 400 === 0) {
    monthArray[1] = 29;
  } else if (nowYear % 4) {
    monthArray[1] = 29;
  } else if (nowYear % 100) {
    monthArray[1] = 28;
  }

  let lastDate = monthArray[now.getMonth()];

  let monthOfLastDate = new Date(nowYear, nowMonth, 0);
  let nowMonthOfLastDate = monthOfLastDate.getDate();

  let firstDay = new Date(nowYear, now.getMonth(), 1); //! 지금 현재 날짜의 첫번째 날짜
  let monthOfFirstDay = firstDay.getDay(); //! 월의 첫번째 날짜의 요일

  let weekCount = Math.ceil((monthOfFirstDay + nowMonthOfLastDate) / 7); //!(주의 수) 월의 시작 요일과 마지막 날짜를 더해서 7로 나눠준다.

  let monthOfName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let weekOfName = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

  let root = tagCreate("div", { id: "root" });
  container.appendChild(root);
  styleCreate(root, {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    height: "600px",
    border: "3px solid black",
    position: "absolute",
    backgroundColor: "white",
  });

  let monthOfNameBox = tagCreate("div", { id: "month" });
  root.appendChild(monthOfNameBox);
  styleCreate(monthOfNameBox, {
    width: "500px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  });
  let beforeMonthBtn = tagCreate("div", { id: "before" });
  monthOfNameBox.appendChild(beforeMonthBtn);
  beforeMonthBtn.innerText = "<";
  styleCreate(beforeMonthBtn, {
    width: "100px",
    height: "50px",
    fontSize: "50px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  let monthBox = tagCreate("div");
  monthOfNameBox.appendChild(monthBox);
  monthBox.innerText = monthOfName[now.getMonth()];
  styleCreate(monthBox, {
    width: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "50px",
    fontWeight: "700",
  });

  let nextMonthBtn = tagCreate("div", { id: "next" });
  monthOfNameBox.appendChild(nextMonthBtn);
  nextMonthBtn.innerText = ">";
  styleCreate(nextMonthBtn, {
    width: "100px",
    height: "50px",
    fontSize: "50px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  let weekNameBox = tagCreate("div");
  root.appendChild(weekNameBox);
  styleCreate(weekNameBox, {
    width: "500px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  let weekName = [];

  for (i in weekOfName) {
    weekName[i] = tagCreate("div");
    weekNameBox.appendChild(weekName[i]);
    weekName[i].innerText = weekOfName[i];
    weekName[i].style.width = "70px";
    weekName[i].style.textAlign = "center";
    weekName[i].style.justifyContent = "center";
    weekName[i].style.fontSize = "27px";
    weekName[i].style.fontWeight = "700";
  }

  let table = tagCreate("table", { id: "table" });
  root.appendChild(table);
  styleCreate(table, {
    width: "500px",
    height: "360px",
    backgroundColor: "#F7786B",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)",
  });

  let weekIndex = [];
  let dayIndex = [];

  let countOfWeek = 0;
  let countOfDay = 0;

  for (let i = 0; i < weekCount; i++) {
    weekIndex[i] = tagCreate("tr", { id: `week${i}` });
    table.appendChild(weekIndex[i]);
    for (let j = 0; j < 7; j++) {
      dayIndex[j] = tagCreate("td");
      weekIndex[i].appendChild(dayIndex[j]);
      styleCreate(dayIndex[j], {
        color: "white",
        flexDirection: "row",
        justfyContent: "center",
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "700",
      });
      if (monthOfFirstDay <= countOfWeek && countOfDay < nowMonthOfLastDate) {
        countOfDay++;
        dayIndex[j].innerText = countOfDay;
        if (countOfDay === nowDate) {
          styleCreate(dayIndex[j], {
            color: "black",
            backgroundColor: "#F3EDE8",
            borderRadius: "50%",
            boxShadow:
              "0 5px 20px rgba(0,0,0,0.21), 0 5px 5px rgba(0,0,0,0.21)",
          });
        }
      }
      countOfWeek++;
    }
  }

  let beforeMonth = new Date(now.setMonth(now.getMonth() - 1));
  let nextMonth = new Date(now.setMonth(now.getMonth() + 1));
  
  beforeMonthBtn.addEventListener("click", function () {
    console.log("이전 달")
    beforeMonth = new Date(now.setMonth(now.getMonth() - 1));
    container.innerHTML = '';
    calendar(beforeMonth);
    console.log(beforeMonth);
  });
  
  nextMonthBtn.addEventListener("click", function () {
    console.log("다음 달")
    nextMonth = new Date(now.setMonth(now.getMonth() + 1));
    container.innerHTML = '';
    calendar(nextMonth);
    console.log(nextMonth)
  });
}

calendar(new Date());