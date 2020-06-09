
const data = [{
  id: "home",
  icon: "iconsminds-books",
  label: "menu.books",
  to: "/",
  subs: [{
    icon: "simple-icon-paper-plane",
    label: "All Books",
    to: "/mybooks/books/view-books"
  },
  {
    icon: "simple-icon-paper-plane",
    label: "Add Books",
    to: "/mybooks/books/add-books"
  }]
},
{
  id: "second-menu",
  icon: "simple-icon-people",
  label: "menu.groups",
  to: "/app/second-menu",
  subs: [{
    icon: "simple-icon-paper-plane",
    label: "menu.second",
    to: "/app/second-menu/second"
  },
  ]
},
// {
//   id: "pages",
//   icon: "iconsminds-digital-drawing",
//   label: "menu.pages",
//   to: "/user/login",
//   subs: [{
//     icon: "simple-icon-user-following",
//     label: "menu.login",
//     to: "/user/login",
//     newWindow: true
//   }, {
//     icon: "simple-icon-user-follow",
//     label: "menu.register",
//     to: "/user/register",
//     newWindow: true
//   }, {
//     icon: "simple-icon-user-unfollow",
//     label: "menu.forgot-password",
//     to: "/user/forgot-password",
//     newWindow: true
//   },
//   {
//     icon: "simple-icon-user-following",
//     label: "menu.reset-password",
//     to: "/user/reset-password",
//     newWindow: true
//   }
//   ]
// },
// {
//   id: "single",
//   icon: "iconsminds-three-arrow-fork",
//   label: "menu.single",
//   to: "/app/single"
// },
// {
//   id: "docs",
//   icon: "iconsminds-library",
//   label: "menu.docs",
//   to: "https://google.com/",
//   newWindow: true
// }
];
export default data;
