const payload = {
  name: "ATIF HASAN",
  email: "atifhasan000000@gmail.com",
  company: "",
  service: "Full digital project",
  budget: "Under $500",
  timeline: "As soon as possible",
  message: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  website: ""
};

fetch("http://localhost:3000/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
})
  .then(res => res.json().then(data => ({ status: res.status, data })))
  .then(console.log)
  .catch(console.error);
