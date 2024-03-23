import { createRouter, createWebHistory } from "vue-router"

function isValidDateStr(dateStr) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/

  if (!dateRegex.test(dateStr)) return false
  const [year, month, day] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day)

  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  )
}

const routes = [
  {
    path: "/",
    name: "manage",
    component: () => import("./Index.vue"),
  },
  {
    path: "/day/:date(\\d{4}-\\d{2}-\\d{2})",
    name: "day",
    component: () => import("./DayView.vue"),
    props: true,
    beforeEnter: (to, from, next) => {
      const { date } = to.params
      if (isValidDateStr(date)) {
        next()
      } else {
        next("/404")
      }
    },
  },
  {
    path: "/404",
    component: () => import("./404.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: () => {
      return `/404`
    },
  },
]

const routerBase =
  process.env.NODE_ENV === "production" ? "/habits-tracker/" : "/"

export default createRouter({
  history: createWebHistory(routerBase),
  routes,
})
