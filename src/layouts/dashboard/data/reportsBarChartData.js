//bar chart active users

const reportsBarChartData = {
  chart: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Sales", data: [450, 200, 100, 220, 500, 100, 400, 230, 500] },
  },
  items: [
    {
      icon: { color: "primary", component: "library_books" },
      label: "users",
      progress: { content: "36K", percentage: 60 },
    },
    {
      icon: { color: "info", component: "touch_app" },
      label: "clicks",
      progress: { content: "200", percentage: 90 },
    },
    {
      icon: { color: "warning", component: "payment" },
      label: "event",
      progress: { content: "344", percentage: 30 },
    },
    {
      icon: { color: "error", component: "extension" },
      label: "Itinerary",
      progress: { content: "43", percentage: 50 },
    },
  ],
};

export default reportsBarChartData;
