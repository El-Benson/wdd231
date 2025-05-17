const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
  {
    code: "WDD 131",
    name: "Dynamic Web Fundamentals",
    credits: 3,
    completed: true,
  },
  {
    code: "WDD 230",
    name: "Web Frontend Development I",
    credits: 3,
    completed: true,
  },
  {
    code: "WDD 330",
    name: "Web Frontend Development II",
    credits: 3,
    completed: false,
  },
  {
    code: "WDD 430",
    name: "Web Full-Stack Development",
    credits: 3,
    completed: false,
  },
  {
    code: "CSE 121b",
    name: "JavaScript Language",
    credits: 3,
    completed: true,
  },
  {
    code: "CSE 210",
    name: "Programming with Classes",
    credits: 3,
    completed: false,
  },
  { code: "CSE 222a", name: "Data Structures", credits: 3, completed: false },
  {
    code: "CSE 341",
    name: "Web Backend Development",
    credits: 3,
    completed: false,
  },
];

const courseListContainer = document.querySelector(".course-list");
const creditCount = document.querySelector("#creditCount");

function renderCourses(courseArray) {
  courseListContainer.innerHTML = "";
  let totalCredits = 0;

  courseArray.forEach((course) => {
    const div = document.createElement("div");
    div.className = `course ${course.completed ? "completed" : "light"}`;
    div.innerHTML = `
        <strong>${course.code}</strong><br>
        ${course.name}<br>
        Credits: ${course.credits}
      `;
    courseListContainer.appendChild(div);
    totalCredits += course.credits;
  });

  creditCount.textContent = `Total Credits: ${totalCredits}`;
}

const filterButtons = document.querySelectorAll(".filters button");

function setFilterState(filter) {
  localStorage.setItem("selectedFilter", filter);
}

function getFilterState() {
  return localStorage.getItem("selectedFilter") || "all";
}

function updateFilterButtons(activeFilter) {
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === activeFilter);
  });
}

function applyFilter(filter) {
  if (filter === "WDD") {
    renderCourses(courses.filter((c) => c.code.startsWith("WDD")));
  } else if (filter === "CSE") {
    renderCourses(courses.filter((c) => c.code.startsWith("CSE")));
  } else {
    renderCourses(courses);
  }
  updateFilterButtons(filter);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    setFilterState(filter);
    applyFilter(filter);
  });
});

applyFilter(getFilterState());
